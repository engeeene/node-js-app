const assert = require("assert");
const random = require('./random');

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