const webpack = require('webpack');
const path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');


function getEntrySources(sources) {
    if (process.env.NODE_ENV !== 'production') {
        sources.push('webpack-dev-server/client?http://localhost:8080');
        sources.push('webpack/hot/only-dev-server');
    }

    return sources;
}


 module.exports = {
 	entry: './src/js/script.js',
 	module: {
 		loaders: [
	 		{
	 			test: /\.js$/,
	 			exclude: /node_modules|bower_components/,
	 			loader: 'babel-loader',
	 			query: {
	 				presets: ['es2015', 'stage-0'],
	 			}
	 		},
	 		{
	 			test: /\.scss$/,
	 			loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader!sass-loader'})
 			}
 		]
 	},
 	output: {
 		path: __dirname + '/bin',
 		filename: 'app.bundle.js',
 	},
 	plugins: [
 		new ExtractTextPlugin({ filename: '/style.css', disable: false,
			allChunks: true
		}),
	 	new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false,
			},
			output: {
				comments: false,
			},
	 	}),
 	],
}