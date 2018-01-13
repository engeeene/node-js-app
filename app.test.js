const assert = require("assert");
const random = require('./random');
const request = require("supertest");
const app_module = require("./app");
const app = require("./app").app;

describe('random testing', function(){
	it('should give random integer', function(done) {
		assert.ok(random.getRandomInt(5,10) >= 5);
		assert.ok(random.getRandomInt(5,10) <= 10);
		done();
	});

	const letters = ['A', 'B', 'D'];

	it('should give random item from array', function(done){
		var letter = random.getRandomFromArray(letters);
		assert.ok(letter == 'A' || 'B' || 'D');
		done();
	});

	it('should give random true or false',  function(done){
		var chanse = random.getRandomChance(50);
		assert.ok(chanse == true || chanse == false);
		done();
	});
});


describe('app testing', function(){
	before(function() {
		app_module.connectToDB({
			host: '127.0.0.1',
			port: 5432,
			user: 'postgres',
			database: 'test'
		});
	});
		
	it('should return home page', function(done){
		request(app)
			.get("/")
			.expect('Content-Type', 'text/html; charset=utf-8')
			.end(done);
	});

	it('should generate rows withoth errors', function(done){
		assert.doesNotThrow(() => {app_module.generateDB(1)});
		done();
	});

	it('should return row', function(done){
		request(app)
			.post("/find")
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
				price:"1",
				ps_modular:false,
				ram_amount:"1",
				ram_frequency:"1"
			})
			.expect('Content-Type', 'application/json; charset=utf-8')
			.end(() => {done();app_module.disconnect(); process.exit();});
	});
});

// function closeDB() {
	// app_module.disconnect();
// }

//process.on('SIGINT', closeDB);
//process.on('SIGTERM', closeDB);
