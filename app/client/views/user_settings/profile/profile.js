var pageSession = new ReactiveDict();

Template.UserSettingsProfile.rendered = function() {
	
};

Template.UserSettingsProfile.events({
	"click #page-close-button": function(e, t) {
		e.preventDefault();
		Router.go("", {});
	},
	"click #page-back-button": function(e, t) {
		e.preventDefault();
		Router.go("", {});
	}

	
});

Template.UserSettingsProfile.helpers({
	
});

Template.UserSettingsProfileEditForm.rendered = function() {
	

	pageSession.set("userSettingsProfileEditFormInfoMessage", "");
	pageSession.set("userSettingsProfileEditFormErrorMessage", "");

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

Template.UserSettingsProfileEditForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("userSettingsProfileEditFormInfoMessage", "");
		pageSession.set("userSettingsProfileEditFormErrorMessage", "");
		
		var self = this;

		function submitAction() {
			if(!t.find("#form-cancel-button")) {
				pageSession.set("userSettingsProfileEditFormInfoMessage", "Saved.");
			}

			Router.go("user_settings.profile", {});
		}

		function errorAction(msg) {
			pageSession.set("userSettingsProfileEditFormErrorMessage", "Error. " + msg);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				Meteor.call("updateUserAccount", t.data.current_user_data._id, values, function(e) { if(e) errorAction(e.message); else submitAction(); });
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

		/*CLOSE_REDIRECT*/
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		/*BACK_REDIRECT*/
	}

	
});

Template.UserSettingsProfileEditForm.helpers({
	"infoMessage": function() {
		return pageSession.get("userSettingsProfileEditFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("userSettingsProfileEditFormErrorMessage");
	},
	"isAdminOrTutor": function() {
		var currentUser = Meteor.user();
		return _.contains(currentUser.roles, 'tutor')||_.contains(currentUser.roles, 'admin');
	}	
});
