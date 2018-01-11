const path = require('path');
const express = require('express');
const bodyParser = require("body-parser");
const { Client } = require('pg');

const app = express();
const client = new Client({
	host: '127.0.0.1',
	port: 5432,
	user: 'Engeeene',
	database: 'components',
	password: '1234'
});
const jsonParser = bodyParser.json();
app.set("view engine", "hbs");

const sockets = ['LGA771', 'LGA775', 'LGA1567', 'LGA1366', 'LGA1156', 'LGA1155', 'LGA2011', 'LGA1356', 'LGA1150', 'LGA2011-3', 'LGA1151', 'LGA2066', 'AM2', 'AM2+', 'AM3', 'AM3+', 'AM4', 'AM4+', 'AM1', 'FM1', 'FM2', 'FM2+', 'TR4', 'F', 'F+', 'SP3'];
const memory_types = ['DDR1', 'DDR2', 'DDR3', 'DDR4'];
const efficiency_type = ['bad', 'normal', 'good', 'excellent'];
const chips = ['Intel', 'AMD'];

const mb_manufacturer = ['Asus', 'ASRock', 'EVGA', 'GIGABYTE', 'MSI', 'Supermicro'];
const cpu_manufacturer = ['AMD', 'Intel'];
const cpu_cooler_manufacturer = ['Zalman', 'Titan', 'Arctic', 'Cooler Master', 'MSI'];
const gpu_manufacturer = ['Asus', 'Inno3D', 'EVGA', 'GIGABYTE', 'MSI', 'Zotac'];
const ram_manufacturer = ['Kingston', 'GOODRAM', 'Corsair', 'Crucial', 'Apacer', 'ADATA'];
const hdd_manufacturer = ['Silicon Power', 'Transcend', 'Toshiba', 'Dell', 'WD', 'ADATA'];
const ps_manufacturer = ['XFX', 'Aerocool', 'Corsair', 'SeaSonic', 'EVGA', 'LogicPower'];
const model_array = 'QWERRTYUIOPASDFGHJKLZXCVBNM';

function getRandomInt(min, max) {
  return Math.round(Math.random() * (max - min)) + min;
}

function getRandomFromArray(array) {
  return array[getRandomInt(0, array.length - 1)];
}

function getSeveralRandomFromArray(array, n) {
  return array[getRandomInt(0, array.length - 1)];
}

function getRandomChance(percent) {
  return Math.round(Math.random() * 100) <= percent;
}

client.connect()
	.then(() => console.log('Connectied to postgresql server'))
	.catch(e => console.error('error during connecting', err.stack));

app.use(express.static(path.join(__dirname, 'public')));
	
app.get("/", function(request, response){
	response.render('home.hbs',{
		title: 'test'
	});
});

//generate(10);

async function generate(amount) {
	
	async function generateTable(table_name, array, mean_price, mean_r_power, inner_f, amount){
		for (var i = 0; i < amount; i++) {
			var name = getRandomFromArray(array)
			var model = getRandomFromArray(model_array) + getRandomFromArray(model_array) + getRandomFromArray(model_array) + '-' + getRandomInt(20, 99);
			var price = mean_price * getRandomInt(3,20) / 10;
			var r_pover = mean_r_power * getRandomInt(5,17) / 10;
			var line = `'${name}', '${model}', ${price}, ${r_pover}, ` + inner_f();
			await client.query(`INSERT INTO ${table_name} VALUES (nextval('${table_name + '_id_seq'}'), ${line});`)
			//.then(console.log(res))
			.catch(e => console.error('query error', e.stack));
		}
	}
	
	await generateTable('motherboard', mb_manufacturer, 120, 20, () => {
		return `${getRandomChance(30)}, ${getRandomChance(70)}, '${getRandomFromArray(sockets)}', '${getRandomFromArray(memory_types)}', ${getRandomInt(2,6)}, ${getRandomInt(20,110)*10}`;
	}, amount);
	await generateTable('cpu', cpu_manufacturer, 280, 60, () => {
		return `'${getRandomFromArray(sockets)}', ${getRandomInt(10,40)/10}, ${getRandomInt(1,4)*2}, '${getRandomFromArray(efficiency_type)}', '${getRandomFromArray(chips)}'`;
	}, amount*2);
	await generateTable('cpu_cooler', cpu_cooler_manufacturer, 15, 10, () => {
		return `${getRandomInt(20,110)*10}, ${getRandomChance(30)}, '${getRandomFromArray(efficiency_type)}'`;
	}, amount);	
	await generateTable('gpu', gpu_manufacturer, 400, 120, () => {
		return `${getRandomInt(800,1500)}, ${getRandomInt(1,8)}, ${getRandomInt(40,60)*100}, ${getRandomChance(30)}, '${getRandomFromArray(chips)}'`;
	}, amount*5);
	await generateTable('ram', ram_manufacturer, 80, 20, () => {
		return `'${getRandomFromArray(memory_types)}', ${Math.pow(2,getRandomInt(1,8))}, ${getRandomInt(8,21)*100}`;
	}, amount*2);
	await generateTable('hdd', hdd_manufacturer, 25, 15, () => {
		return `${getRandomInt(1,8)*500}, ${getRandomInt(10,32)*10}, 1`;
	}, amount);
	await generateTable('hdd', hdd_manufacturer, 50, 30, () => {
		return `${getRandomInt(8,16)*500}, ${getRandomInt(10,32)*10}, 2`;
	}, amount);
	await generateTable('hdd', hdd_manufacturer, 75, 45, () => {
		return `${getRandomInt(16,24)*500}, ${getRandomInt(10,32)*10}, 4`;
	}, amount);
	await generateTable('hdd', hdd_manufacturer, 100, 60, () => {
		return `${getRandomInt(24,32)*500}, ${getRandomInt(10,32)*10}, 6`;
	}, amount);
	
	for (var i = 0; i < amount; i++) {
		var name = getRandomFromArray(ps_manufacturer)
		var model = getRandomFromArray(model_array) + getRandomFromArray(model_array) + getRandomFromArray(model_array) + '-' + getRandomInt(20, 99);
		var price = 100 * getRandomInt(5,20) / 10;
		var pover = getRandomInt(20,60) * 10;
		var line = `'${name}', '${model}', ${price}, ${pover}, ${getRandomChance(50)}, ${getRandomChance(50)}`;
		await client.query(`INSERT INTO power_supply VALUES (nextval('power_supply_id_seq'), ${line});`)
		//.then(console.log(res))
		.catch(e => console.error('query error', e.stack));
	}
		
	await client.query('SELECT cooler FROM (SELECT cpu_cooler.id AS cooler, motherboard_cpu_cooler.id_cpu_cooler AS socket FROM cpu_cooler LEFT JOIN motherboard_cpu_cooler ON cpu_cooler.id = motherboard_cpu_cooler.id_cpu_cooler) AS cpu_cooler_socket WHERE socket IS NULL;')
		.then(async function (req) {
			req.rows.forEach(async function (row) {
				var n = getRandomInt(1,7);
				async function insert(array) {
					array.forEach(async function (item) {
						await client.query(`INSERT INTO motherboard_cpu_cooler VALUES (nextval('motherboard_cpu_cooler_id_seq'), '${item}', ${row.cooler})`)
						.catch(e => console.error('insetr error', e.stack))
					});
				}
				switch(n) {
					case 1:
						insert(['AM2', 'AM2+', 'AM3', 'AM3+', 'AM4', 'AM4+']);
						break;
					case 2:
						insert(['AM1', 'FM1', 'FM2', 'FM2+']);
						break;
					case 3:
						insert(['TR4', 'F', 'F+', 'SP3']);
						break;
					case 4:
						insert(['LGA771', 'LGA775', 'LGA1567']);
						break;
					case 5:
						insert(['LGA1366', 'LGA1156', 'LGA1155']);
						break;
					case 6:
						insert(['LGA2011', 'LGA1356', 'LGA1150', 'LGA2011-3']);
						break;
					case 7:
						insert(['LGA1151', 'LGA2066']);
						break;
					default:
						console.log('error socket');
						break;
				}
			})
		})
		.catch(e => console.error('select error', e.stack));
}

app.post("/find", jsonParser, function(request, response){
	if(!request.body) return response.sendStatus(400);
    console.log(request.body);
	client.query(`
	SELECT mb_name, mb_model, cpu_name, cpu_model, cooler_name, cooler_model, gpu_name, gpu_model, ram_name, ram_model, hdd_name, hdd_model, ps_name, ps_model, price FROM
		(SELECT mb_name, mb_model, cpu_name, cpu_model, cooler_name, cooler_model, gpu_name, gpu_model, ram_name, ram_model, hdd_name, hdd_model, ps_name, ps_model, (info.mb_price + info.cpu_price + info.cooler_price + info.gpu_price + info.ram_price + info.hdd_price + info.ps_price) AS price FROM 
			((SELECT manufacturer AS mb_name, model AS mb_model, socket, max_cooler_weigth, memory_type, sata, required_power AS mb_r_power, price AS mb_price FROM motherboard AS mb WHERE mb.north_bridge = ${request.body.mb_north} AND mb.south_bridge = ${request.body.mb_south}) AS mb_info
			INNER JOIN 
			(SELECT manufacturer AS cpu_name, model AS cpu_model, socket, min_cooler_efficiency, chip, required_power AS cpu_r_power, price AS cpu_price FROM cpu WHERE cpu.core_frequency >= ${+request.body.cpu_frequency-0.2} AND cpu.core_frequency <= ${+request.body.cpu_frequency+0.2} AND cpu.cores = ${request.body.cpu_cores}) AS cpu_info
			ON mb_info.socket = cpu_info.socket
			INNER JOIN 
			(SELECT cooler_name, cooler_model, socket, weigth, efficiency, cooler_r_power, cooler_price FROM
				(SELECT id, manufacturer AS cooler_name, model AS cooler_model, weigth, efficiency, required_power AS cooler_r_power, price AS cooler_price FROM cpu_cooler WHERE cpu_cooler.silent = ${request.body.cooler_silent}) AS cooler_info
				INNER JOIN
				(SELECT socket, id_cpu_cooler FROM motherboard_cpu_cooler) AS cooler_sockets
				ON cooler_info.id = cooler_sockets.id_cpu_cooler) AS cooler_socket_info
			ON cpu_info.socket = cooler_socket_info.socket AND mb_info.max_cooler_weigth >= cooler_socket_info.weigth AND cpu_info.min_cooler_efficiency <= cooler_socket_info.efficiency
			INNER JOIN 
			(SELECT manufacturer AS gpu_name, model AS gpu_model, additional_pin, chip, required_power AS gpu_r_power, price AS gpu_price FROM gpu WHERE gpu.core_frequency >= ${+request.body.gpu_core_frequency-100} AND gpu.core_frequency <= ${+request.body.gpu_core_frequency+100} AND gpu.memory_amount = ${request.body.gpu_memory_amount} AND gpu.memory_frequency >= ${+request.body.gpu_memory_frequency-100} AND gpu.memory_frequency <= ${+request.body.gpu_memory_frequency+100}) AS gpu_info
			ON cpu_info.chip = gpu_info.chip
			INNER JOIN 
			(SELECT manufacturer AS ram_name, model AS ram_model, memory_type, required_power AS ram_r_power, price AS ram_price FROM ram WHERE ram.memory_frequency >= ${+request.body.ram_frequency-100} AND ram.memory_frequency <= ${+request.body.ram_frequency+100} AND ram.memory_amount = ${request.body.ram_amount}) AS ram_info
			ON mb_info.memory_type = ram_info.memory_type
			INNER JOIN
			(SELECT manufacturer AS hdd_name, model AS hdd_model, amount, required_power AS hdd_r_power, price AS hdd_price FROM hdd WHERE hdd.memory_amount >= ${+request.body.hdd_memory_amount-500} AND hdd.memory_amount <= ${+request.body.hdd_memory_amount+500} AND hdd.speed >= ${+request.body.hdd_speed-20} AND hdd.speed <= ${+request.body.hdd_speed+20}) AS hdd_info
			ON mb_info.sata >= hdd_info.amount
			INNER JOIN
			(SELECT manufacturer AS ps_name, model AS ps_model, power, additional_pin, price AS ps_price FROM power_supply AS ps WHERE ps.modular = ${request.body.ps_modular}) AS ps_info
			ON gpu_info.additional_pin = ps_info.additional_pin AND ps_info.power > (mb_r_power + cpu_r_power + cooler_r_power + gpu_r_power + ram_r_power + hdd_r_power)) AS info
		ORDER BY price) AS sets
	WHERE price >= ${+request.body.price-0.5} AND price <= ${+request.body.price+0.5}
	;`)
	//.then(query => response.json(query))
	.then((req) => {response.json(req.rows);})
	.catch(e => console.error('select components error', e.stack))
});

var server = app.listen(3000);

async function exit() {
	server.close(async function() {
		await client.end()
			.then(() => console.log('Disconnected from postgresql server'))
			.catch(err => console.error('error during disconnection', err.stack));
		console.log('shutting down...');
		process.exit();
	});
}
process.on('SIGINT', exit);
process.on ('SIGTERM', exit);
