/* eslint-env node */
'use strict'

module.exports = {
	entry: { app: './client/index.js' },
	output: {
		filename: 'index.js',
		path: '/',
		publicPath: '/dist',
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: 'babel-loader',
			},
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader'],
			},
		],
	},
	performance: {
		hints: false,
	},
}
