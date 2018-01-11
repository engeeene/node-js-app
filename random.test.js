const assert = require("assert");
const random = require('./random');

it('should give random integer', () => {
	assert.ok(random.getRandomInt(5,10) >= 5);
	assert.ok(random.getRandomInt(5,10) <= 10);
});

const letters = ['A', 'B', 'D'];

it('should give random item from array', () => {
	var letter = random.getRandomFromArray(letters);
	assert.ok(letter == 'A' || 'B' || 'D');
});

it('should give random true or false', () => {
	var chanse = random.getRandomChance(50);
	assert.ok(chanse == true || chanse == false);
});