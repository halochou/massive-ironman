var pageSession = new ReactiveDict();

Template.AdminUsersInsert.rendered = function() {
	
};

Template.AdminUsersInsert.events({
	"click #page-close-button": function(e, t) {
		e.preventDefault();
		Router.go("", {});
	},
	"click #page-back-button": function(e, t) {
		e.preventDefault();
		Router.go("", {});
	}

	
});

Template.AdminUsersInsert.helpers({
	
});

Template.AdminUsersInsertInsertForm.rendered = function() {
	

	pageSession.set("adminUsersInsertInsertFormInfoMessage", "");
	pageSession.set("adminUsersInsertInsertFormErrorMessage", "");

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

Template.AdminUsersInsertInsertForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("adminUsersInsertInsertFormInfoMessage", "");
		pageSession.set("adminUsersInsertInsertFormErrorMessage", "");
		
		var self = this;

		function submitAction() {
			if(!t.find("#form-cancel-button")) {
				pageSession.set("adminUsersInsertInsertFormInfoMessage", "Saved.");
			}

			Router.go("admin.users", {});
		}

		function errorAction(msg) {
			pageSession.set("adminUsersInsertInsertFormErrorMessage", "Error. " + msg);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				Meteor.call("createUserAccount", values, function(e) { if(e) errorAction(e.message); else submitAction(); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("admin.users", {});
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

Template.AdminUsersInsertInsertForm.helpers({
	"infoMessage": function() {
		return pageSession.get("adminUsersInsertInsertFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("adminUsersInsertInsertFormErrorMessage");
	}
	
});
