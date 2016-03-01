module.exports = function(User) {

User.observe('before save', function updateTimestamp(ctx, next) {
 	console.log("Before saving User, marshall data");
 	//console.log(ctx.instance);
 	//Generate the verification token;
 	ctx.instance.emailverified = false;
 	ctx.instance.created = new Date();
 	console.log(ctx.instance);

  next();

});

//Handle verification here.

User.verify = function(cb){
	cb(null,"ayyyy");
};

User.remoteMethod('verify',{
	http: {path: '/verify', verb: 'get'},
	returns: {arg: 'status', type: 'string'}
})

var excludedProperties = [
  'username',
  // 'emailVerified',
  // 'verificationToken',
  // 'credentials',
  	'realm',
  	'status',
   'challenges',
   'lastUpdated'
];

excludedProperties.forEach(function (p) {
  delete User.definition.rawProperties[p];
  delete User.definition.properties[p];
  delete User.prototype[p];
});

};
