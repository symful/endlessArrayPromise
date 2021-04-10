const EndlessArray = require(`${__dirname}/index.js`);

module.exports = function fromCallback(func, args = []) {
	const endlessArray = new EndlessArray;
	
	func(...args, (...args) => {
		endlessArray.add(args);
	});
	
	return endlessArray;
};