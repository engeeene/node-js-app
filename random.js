module.exports.getRandomInt = function(min, max) {
  return Math.round(Math.random() * (max - min)) + min;
}

module.exports.getRandomFromArray = function(array) {
  return array[module.exports.getRandomInt(0, array.length - 1)];
}

module.exports.getRandomChance = function(percent) {
  return Math.round(Math.random() * 100) <= percent;
}