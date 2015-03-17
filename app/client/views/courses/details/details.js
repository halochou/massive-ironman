var pageSession = new ReactiveDict();

Template.CoursesDetails.rendered = function() {
	
};

Template.CoursesDetails.events({
	"click #page-close-button": function(e, t) {
		e.preventDefault();
		Router.go("", {});
	},
	"click #page-back-button": function(e, t) {
		e.preventDefault();
		Router.go("", {});
	}

	
});

Template.CoursesDetails.helpers({
	
});

Template.CoursesDetailsDetailsForm.rendered = function() {
	

	pageSession.set("coursesDetailsDetailsFormInfoMessage", "");
	pageSession.set("coursesDetailsDetailsFormErrorMessage", "");

	$(".input-group.date").each(function() {
		var format = $(this).find("input[type='text']").attr("data-format");

		if(format) {
			format = format.toLowerCase();			
		}
		else {
			format = "mm/dd/yyyy";
		}

		$(this).datepicker({
			autoclose: true,
			todayHighlight: true,
			todayBtn: true,
			forceParse: false,
			keyboardNavigation: false,
			format: format
		});
	});

	$("input[autofocus]").focus();
};

Template.CoursesDetailsDetailsForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("coursesDetailsDetailsFormInfoMessage", "");
		pageSession.set("coursesDetailsDetailsFormErrorMessage", "");
		
		var self = this;

		function submitAction() {
			if(!t.find("#form-cancel-button")) {
				pageSession.set("coursesDetailsDetailsFormInfoMessage", "Saved.");
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			pageSession.set("coursesDetailsDetailsFormErrorMessage", "Error. " + msg);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		/*CANCEL_REDIRECT*/
	},
	"click #form-close-button": function(e, t) {
		e.preventDefault();

		Router.go("courses", {});
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		Router.go("courses", {});
	}

	
});

Template.CoursesDetailsDetailsForm.helpers({
	"infoMessage": function() {
		return pageSession.get("coursesDetailsDetailsFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("coursesDetailsDetailsFormErrorMessage");
	},
	"isAdminOrTutor": function() {
		var currentUser = Meteor.user();
		return _.contains(currentUser.roles, 'tutor')||_.contains(currentUser.roles, 'admin');
	},
	// "getProfileName": function(usernameInput) {
	// 	Meteor.call('getUsersNamelist', {}, function(error, result){
	// 		if(error){
	// 			console.log("network error");			
	// 		}
	// 		Session.set('usersNamelist',result);
	// 	});
	// 	return Session.get('usersNamelist').findOne({"username":usernameInput}).profile.name;
	// }
	"getProfileName": function(usernameInput) {
		// Meteor.call('getProfileNameByUsername', usernameInput, function(error, result) {
		// 	if(error){
		// 		console.log("network error");			
		// 	}
		// 	Session.set('profileName',result);
		// });
		// return Session.get('profileName');
		return "Function is not ready";
	}
});
