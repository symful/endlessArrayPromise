const EndlessArray = require(`${__dirname}/index.js`);

module.exports = function fromCallback(func, startArgs = [], endArgs = []) {
	const endlessArray = new EndlessArray;
	
	func(...startArrgs, (...args) => {
		endlessArray.add(args);
	}, ...endArgs);
	
	return endlessArray;
};