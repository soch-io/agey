module.exports = function(app) {

	var mainController = require('../lib/controllers/main')

	app.get('/', mainController.index);
	app.post('/contact-submit' , mainController.contactSubmit);
	app.get('/:page', mainController.index);
}