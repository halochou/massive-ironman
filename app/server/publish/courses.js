Meteor.publish("courses", function() {
	return Courses.find({}, {});
});

Meteor.publish("courses_empty", function() {
	return Courses.find({_id:null}, {});
});

Meteor.publish("course", function(courseId) {
	return Courses.find({_id:courseId}, {});
});