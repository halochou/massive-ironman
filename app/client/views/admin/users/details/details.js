var pageSession = new ReactiveDict();

Template.AdminUsersDetails.rendered = function() {
	
};

Template.AdminUsersDetails.events({
	"click #page-close-button": function(e, t) {
		e.preventDefault();
		Router.go("", {});
	},
	"click #page-back-button": function(e, t) {
		e.preventDefault();
		Router.go("", {});
	}

	
});

Template.AdminUsersDetails.helpers({
	
});

Template.AdminUsersDetailsDetailsForm.rendered = function() {
	

	pageSession.set("adminUsersDetailsDetailsFormInfoMessage", "");
	pageSession.set("adminUsersDetailsDetailsFormErrorMessage", "");

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

Template.AdminUsersDetailsDetailsForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("adminUsersDetailsDetailsFormInfoMessage", "");
		pageSession.set("adminUsersDetailsDetailsFormErrorMessage", "");
		
		var self = this;

		function submitAction() {
			if(!t.find("#form-cancel-button")) {
				pageSession.set("adminUsersDetailsDetailsFormInfoMessage", "Saved.");
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			pageSession.set("adminUsersDetailsDetailsFormErrorMessage", "Error. " + msg);
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

		Router.go("admin.users", {});
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		Router.go("admin.users", {});
	}

	
});

Template.AdminUsersDetailsDetailsForm.helpers({
	"infoMessage": function() {
		return pageSession.get("adminUsersDetailsDetailsFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("adminUsersDetailsDetailsFormErrorMessage");
	}
	
});
