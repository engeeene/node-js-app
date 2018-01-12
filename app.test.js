const request = require("supertest");
const assert = require("assert");
const app_module = require("./app");
const app = require("./app").app;

app_module.connectToDB({
			host: '127.0.0.1',
			port: 5432,
			user: 'postgres',
			database: 'test'
	});

it('should return home page', function(done){
	request(app)
		.get("/")
		.expect('Content-Type', 'text/html; charset=utf-8')
		.end(done);
});


it('should generate rows withoth errors', function(done){
	assert.doesNotThrow(app_module.generateDB(1));
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
		.end(done);
});

function closeDB() {
	app_module.disconnect();
}

//process.on('SIGINT', closeDB);
//process.on('SIGTERM', closeDB);
