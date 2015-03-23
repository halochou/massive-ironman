Meteor.methods({
    'enrollToCourse': function(courseId) {
        var usernameAndName = Meteor.users.findOne(this.userId).username + ' ' + Meteor.users.findOne(this.userId).profile.name;
        var course = Courses.findOne({_id:courseId});

        if (!course.members) {
            res = Courses.update(
                {_id: courseId},
                {$set: {avail: 1, members: [usernameAndName]}}
            );
            return "success";
        } else {
            var currentCount = course.members.length;
            if (_.contains(course.members,usernameAndName)){
                //console.log("ed.");
                return "success";
            } else if (currentCount >= course.amount) {
                return "full";
            } else {
                res = Courses.update(
                    {_id: courseId},
                    //{$set: {avail: currentCount + 1}},
                    {$push: {members: usernameAndName}}
                );
                return "success"
            }
        }
    },
    'unenrollToCourse': function(courseId) {
        var usernameAndName = Meteor.users.findOne(this.userId).username + ' ' + Meteor.users.findOne(this.userId).profile.name;
        var course = Courses.findOne({_id:courseId});

        if (!course.members) {
            return "success";
        } else {
            res = Courses.update(
                {_id: courseId},
                {$pull: {members: usernameAndName}}
            );
            return "success"
        }
    }
});
