module.exports = function(Client) {


	Client.afterRemote('create', function(context, user, next) {
	   console.log('> user.afterRemote triggered');

	   var options = {
	     type: 'email',
	     to: 'thilina@tratnayake.me',
	     from: 'noreply@clipboard.com',
	     subject: 'Thanks for registering.',
	     //template: path.resolve(__dirname, '../../server/views/verify.ejs'),
	     redirect: '/verified',
	     user: user
	   };

	   user.verify(options, function(err, response) {
	     if (err) return next(err);

	     console.log('> verification email sent:', response);

	     // context.res.render('response', {
	     //   title: 'Signed up successfully',
	     //   content: 'Please check your email and click on the verification link ' +
	     //       'before logging in.',
	     //   redirectTo: '/',
	     //   redirectToLinkText: 'Log in'
	     // }
	     context.res.send("SENT EMAIL!");
	 
	   });
	 });
};
