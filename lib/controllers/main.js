var nodemailer 	= require('nodemailer')
var path 		= require('path')

var smtpTransport = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: "",
        pass: ""
    }
});

exports.index = function (req, res) {
	var indexFile = path.join(__dirname, '../views/build/index.html')
	res.sendFile(indexFile)
}
exports.contactSubmit = function (req, res) {
	req.body.my_name
	req.body.my_email
	req.body.my_message


	var mailOptions = {
	    from: "Test Subject <raj@shaadi.com>", // sender address
	    to: "pratham@sochtechnologies.com, simrin@sochtechnologies.com", // list of receivers
	    subject: "", // Subject line
	    html:""
	}


	smtpTransport.sendMail(mailOptions, function(error, response){
	    if(error){
	        console.log(error);
	    } else {
	        console.log("Message sent: " + response.message);
	    }

	    // if you don't want to use this transport object anymore, uncomment following line
	    smtpTransport.close(); // shut down the connection pool, no more messages
	});
	res.write('post received');
	res.end();
}