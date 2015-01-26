var pageSession = new ReactiveDict();

Template.CoursesInsert.rendered = function() {
	
};

Template.CoursesInsert.events({
	"click #page-close-button": function(e, t) {
		e.preventDefault();
		Router.go("", {});
	},
	"click #page-back-button": function(e, t) {
		e.preventDefault();
		Router.go("", {});
	}

	
});

Template.CoursesInsert.helpers({
	
});

Template.CoursesInsertInsertForm.rendered = function() {
	

	pageSession.set("coursesInsertInsertFormInfoMessage", "");
	pageSession.set("coursesInsertInsertFormErrorMessage", "");

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

Template.CoursesInsertInsertForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("coursesInsertInsertFormInfoMessage", "");
		pageSession.set("coursesInsertInsertFormErrorMessage", "");
		
		var self = this;

		function submitAction() {
			if(!t.find("#form-cancel-button")) {
				pageSession.set("coursesInsertInsertFormInfoMessage", "Saved.");
			}

			Router.go("courses", {});
		}

		function errorAction(msg) {
			pageSession.set("coursesInsertInsertFormErrorMessage", "Error. " + msg);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				newId = Courses.insert(values, function(e) { if(e) errorAction(e.message); else submitAction(); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("courses", {});
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

Template.CoursesInsertInsertForm.helpers({
	"infoMessage": function() {
		return pageSession.get("coursesInsertInsertFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("coursesInsertInsertFormErrorMessage");
	}
	
});
