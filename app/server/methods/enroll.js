Meteor.methods({
    'enrollToCourse': function(courseId) {
        var username = Meteor.users.findOne(this.userId).username;
        var course = Courses.findOne({_id:courseId});

        if (!course.members) {
            res = Courses.update(
                {_id: courseId},
                {$set: {avail: 1, members: [username]}}
            );
            return "success";
        } else {
            var currentCount = course.members.length;
            if (_.contains(course.members,username)){
                //console.log("ed.");
                return "success";
            } else if (currentCount >= course.amount) {
                return "full";
            } else {
                res = Courses.update(
                    {_id: courseId},
                    //{$set: {avail: currentCount + 1}},
                    {$push: {members: username}}
                );
                return "success"
            }
        }
    },
    'unenrollToCourse': function(courseId) {
        var username = Meteor.users.findOne(this.userId).username;
        var course = Courses.findOne({_id:courseId});

        if (!course.members) {
            return "success";
        } else {
            res = Courses.update(
                {_id: courseId},
                {$pull: {members: username}}
            );
            return "success";
        }
    },
    'getProfileNameByUsername': function(usernameInput){
        var user = Meteor.users.findOne({"username":usernameInput});
        if (user){
            return user.profile.name;
        }
        else{
            return "user profile doesn't exist";
        }
    },
    // 'getUsersNamelist': function(){
    //     var usersNamelist = Meteor.users;
    //     if (usersNamelist){
    //         return usersNamelist;
    //     }
    //     else{
    //         return "user profile doesn't exist";
    //     }
    // }
    // ,
    // 'getUsernameByID': function(IDInput){
    //     var user = Meteor.users.findOne(IDInput);
    //     if (user){
    //         return user.username;
    //     }
    //     else{
    //         return "user profile doesn't exist";
    //     }
    // }
});
