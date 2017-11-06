
function selectRandom(list) {
  var index = randomBetween(0, list.length);
  return list[index];
}

function randomBetween(min, max) {
  return Math.floor(Math.random() * max) + min;  
}

module.exports = {
  randomBetween : randomBetween,
  selectRandom : selectRandom
}