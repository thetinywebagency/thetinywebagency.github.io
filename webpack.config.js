const env = process.env.NODE_ENV;
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
	entry: {
		main: './src/index.js'
	},
	optimization: {
		// Allow shared and vendor dependencies to be split into separate bundles
		splitChunks: {
			chunks: 'all',
			cacheGroups: {
				vendors: {
					test: /[\\/]node_modules[\\/]/i,
					chunks: 'all',
					name: 'vendorbundle'
				}
			}
		},
		// Generate a runtime bundle
		runtimeChunk: {
			name: 'runtime'
		}
	},
	performance: {
		hints: 'warning'
	},
	module: {
		rules: [
			{
				test: /\.s[ac]ss$/i,
				exclude: /node_modules/,
				use: [
					'style-loader',
					{
						loader: MiniCssExtractPlugin.loader,
						options: {
							sourceMap: true
						}
					},
					{
						loader: 'css-loader',
						options: {
							sourceMap: true
						}
					},
					{
						loader: 'postcss-loader',
						options: {
							sourceMap: true
						}
					},
					{
						loader: 'sass-loader',
						options: {
							sourceMap: true
						}
					}
				]
			},
			{
				test: /\.css$/,
				use: [
					'style-loader',
					MiniCssExtractPlugin.loader,
					'css-loader'
				]
			}
		]
	},
	plugins: [
		new MiniCssExtractPlugin({
			// Set the filename of the CSS stylesheet if production or development mode is used
			filename: env === 'production' ? 'style/min/[name].min.css' : 'style/[name].css' 
		})
    ],
	output: {
		path: path.resolve(__dirname, './dist/'),
		pathinfo: false,
		publicPath: '/',
		// Set the filename of the bundle using the name of the entry property based on production or development modes
		filename: env === 'production' ? 'js/min/[name].bundle.min.js' : 'js/[name].bundle.js' 
	}
}