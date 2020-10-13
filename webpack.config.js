const env = process.env.NODE_ENV;
const path = require('path');

module.exports = {
	entry: {
		main: './src/index.js'
	},
	output: {
		path: path.resolve(__dirname, './dist/'),
		pathinfo: false,
		publicPath: '/',
		// Set the filename of the bundle using the name of the entry property based on production or development modes
		filename: env === 'production' ? 'js/min/[name].bundle.min.js' : 'js/[name].bundle.js' 
	}
}