const request = require("supertest");
const assert = require("assert");
const app_module = require("./app");
const app = require("./app").app;

app_module.connectToDB({
			host: '127.0.0.1',
			port: 5432,
			user: 'Engeeene',
			database: 'test',
			password: '1234'
	});

it('should return home page', function(done){
	request(app)
		.get("/")
		.expect(`<!DOCTYPE html>\r\n<html>\r\n<head>\r\n    <title>test</title>\r\n\t<link rel="stylesheet" type="text/css" href="css/index.css" />\r\n    <meta charset="utf-8" />\r\n\t<script src="js/jquery-3.2.1.js"></script>\r\n\t<script src="js/core.js"></script>\r\n\t<style>\r\n\r\n\t</style>\r\n</head>\r\n<body class="column center">\r\n\t<form action="/find" class="row center wrap">\r\n\t\t<div class="column center box">\r\n\t\t\tCPU\r\n\t\t\t<div class="row center">\r\n\t\t\t\t<div class="text">Frequency</div>\r\n\t\t\t\t<input type="text" name="cpu_frequency" placeholder="4" value="3.5"/>\r\n\t\t\t</div>\r\n\t\t\t<div class="row center">\r\n\t\t\t\t<div class="text">Cores</div>\r\n\t\t\t\t<input type="text" name="cpu_cores" placeholder="4" value="4"/>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t\t<div class="column center box">\r\n\t\t\tCPU cooler\r\n\t\t\t<div class="row center">\r\n\t\t\t\t<div class="text">Silent mode</div>\r\n\t\t\t\t<input type="checkbox" name="cooler_silent"/>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t\t<div class="column center box">\r\n\t\t\tGPU\r\n\t\t\t<div class="row center">\r\n\t\t\t\t<div class="text">Memory amount</div>\r\n\t\t\t\t<input type="text" name="gpu_memory_amount" placeholder="2" value="2"/>\r\n\t\t\t</div>\r\n\t\t\t<div class="row center">\r\n\t\t\t\t<div class="text">Core frequency</div>\r\n\t\t\t\t<input type="text" name="gpu_core_frequency" placeholder="1100" value="1000"/>\r\n\t\t\t</div>\r\n\t\t\t<div class="row center">\r\n\t\t\t\t<div class="text">Memory frequency</div>\r\n\t\t\t\t<input type="text" name="gpu_memory_frequency" placeholder="5900" value="5900"/>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t\t<div class="column center box">\r\n\t\t\tRAM\r\n\t\t\t<div class="row center">\r\n\t\t\t\t<div class="text">Memory amount</div>\r\n\t\t\t\t<input type="text" name="ram_amount" placeholder="2^n" value="16"/>\r\n\t\t\t</div>\r\n\t\t\t<div class="row center">\r\n\t\t\t\t<div class="text">Memory frequency</div>\r\n\t\t\t\t<input type="text" name="ram_frequency" placeholder="1333" value="1333"/>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t\t<div class="column center box">\r\n\t\t\tHDD\r\n\t\t\t<div class="row center">\r\n\t\t\t\t<div class="text">Memory amount</div>\r\n\t\t\t\t<input type="text" name="hdd_memory_amount" placeholder="1000" value="1000"/>\r\n\t\t\t</div>\r\n\t\t\t<div class="row center">\r\n\t\t\t\t<div class="text">Read/Write speed</div>\r\n\t\t\t\t<input type="text" name="hdd_speed" placeholder="160" value="180"/>\r\n\t\t\t</div>\r\n\t\t\t<div class="row center">\r\n\t\t\t\t<div class="text">Amount of disks</div>\r\n\t\t\t\t<input type="text" name="hdd_amount" placeholder="2" value="2"/>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t\t<div class="column center box">\r\n\t\t\tMotherboard\r\n\t\t\t<div class="row center">\r\n\t\t\t\t<div class="text">North bridge</div>\r\n\t\t\t\t<input type="checkbox" name="mb_north"/>\r\n\t\t\t</div>\r\n\t\t\t<div class="row center">\r\n\t\t\t\t<div class="text">South bridge</div>\r\n\t\t\t\t<input type="checkbox" name="mb_south"/>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t\t<div class="column center box">\r\n\t\t\tPower Supply\r\n\t\t\t<div class="row center">\r\n\t\t\t\t<div class="text">Modular</div>\r\n\t\t\t\t<input type="checkbox" name="ps_modular"/>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t\t<div class="column center box">\r\n\t\t\t<div class="row center">\r\n\t\t\t\t<div class="text">Price</div>\r\n\t\t\t\t<input type="text" name="price" placeholder="800-1200" value="1000"/>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t\t<input type="submit" value="Find">\r\n\t</form>\r\n\t<div class="column center">\r\n\t\t<div id="head" class="column center">\r\n\t\t\t<b class="row center">\r\n\t\t\t\t<div>Motherboard</div>\r\n\t\t\t\t<div></div>\r\n\t\t\t\t<div>CPU</div>\r\n\t\t\t\t<div></div>\r\n\t\t\t\t<div>CPU Cooler</div>\r\n\t\t\t\t<div></div>\r\n\t\t\t\t<div>GPU</div>\r\n\t\t\t\t<div></div>\r\n\t\t\t\t<div>RAM</div>\r\n\t\t\t\t<div></div>\r\n\t\t\t\t<div>HDD</div>\r\n\t\t\t\t<div></div>\r\n\t\t\t\t<div>Power Supply</div>\r\n\t\t\t\t<div></div>\r\n\t\t\t\t<div>Price</div>\t\t\t\t\t\r\n\t\t\t\t</div>\r\n\t\t\t</b>\r\n\t\t<div id="root" class="column center">\r\n\t\t\t\r\n\t\t</div>\r\n\t</div>\r\n</body>\r\n<html>`)
		.end(done);
});


it('should generate rows withoth errors',() => {
	assert.ok(app_module.generateDB(1));
});

it('should return row', function(done){
	request(app)
		.post("/")
		.type('json')
		.send({
			cooler_silent: false,
			cpu_cores:"1",
			cpu_frequency:"1",
			gpu_core_frequency:"1",
			gpu_memory_amount:"1",
			gpu_memory_frequency:"1",
			hdd_amount:"1",
			hdd_memory_amount:"1",
			hdd_speed:"1",
			mb_north:false,
			mb_south:false,
			price:"7",
			ps_modular:false,
			ram_amount:"1",
			ram_frequency:"1"
		})
		.expect('Content-Type', 'text/html; charset=utf-8')
		.end(done);
});

function closeDB() {
	app_module.disconnect();
}

process.on('SIGINT', closeDB);
process.on('SIGTERM', closeDB);