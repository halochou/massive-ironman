Meteor.methods({
    'getUsername': function(_id) {
        console.log(Users.findOne({_id: _id},{}).username);
        return Users.findOne({_id: _id},{}).username;
    },
    'delUser': function(_id) {
    	Users.remove({ _id: _id });
    }
});
