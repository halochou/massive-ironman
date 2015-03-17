Meteor.publish("all_users", function() {
	return Users.find({},{fields:{services:0,roles:0}});
});
