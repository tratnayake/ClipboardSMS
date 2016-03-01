var fs = require('fs');
var apiKey = fs.readFileSync('./sendgrid_API.txt');
var sendgrid = require('sendgrid')(apiKey);

//This is what sends the verification email once a user signs in.
exports.sendVerificationEmail = function(User) {
	//The text we want to tinclude in the email.
	var verificationUrl = "http://localhost:3000/api/clients/verify/"
	var text = "Hello " + TempUs		"\n Thank-you for registering with Clipboard SMS." + er.firstName +
"\n Please verify your email account by clicking the following URL: " + "\n" + verificationUrl + User.verificationToken;

	var email = new sendgrid.Email({
			to: User.emailAddress,
			from: 'thilina@tratnayake.me',
			subject: 'Clipboard - New User Verification',
			text: text
		})
		//Send the email
	sendgrid.send(email, function(err, json) {
		if (err) {
			return console.error(err);
		}
		console.log(json);
	});
}