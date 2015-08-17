var express 	= require('express')
var path 		= require('path')
var bodyParser 	= require('body-parser')
var compress	= require('compression')

module.exports = function(app) {
	// nothing here move on
	app.use(compress());
	app.use(bodyParser.urlencoded({ extended: true }));
	app.use(bodyParser.json())
	app.use(express.static(path.join(__dirname, '../public'), { maxAge: 864000000}))

}