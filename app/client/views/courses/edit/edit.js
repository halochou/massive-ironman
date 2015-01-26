var pageSession = new ReactiveDict();

Template.CoursesEdit.rendered = function() {
	
};

Template.CoursesEdit.events({
	"click #page-close-button": function(e, t) {
		e.preventDefault();
		Router.go("", {});
	},
	"click #page-back-button": function(e, t) {
		e.preventDefault();
		Router.go("", {});
	}

	
});

Template.CoursesEdit.helpers({
	
});

Template.CoursesEditEditForm.rendered = function() {
	

	pageSession.set("coursesEditEditFormInfoMessage", "");
	pageSession.set("coursesEditEditFormErrorMessage", "");

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

Template.CoursesEditEditForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("coursesEditEditFormInfoMessage", "");
		pageSession.set("coursesEditEditFormErrorMessage", "");
		
		var self = this;

		function submitAction() {
			if(!t.find("#form-cancel-button")) {
				pageSession.set("coursesEditEditFormInfoMessage", "Saved.");
			}

			Router.go("courses", {});
		}

		function errorAction(msg) {
			pageSession.set("coursesEditEditFormErrorMessage", "Error. " + msg);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				Courses.update({ _id: t.data.course._id }, { $set: values }, function(e) { if(e) errorAction(e.message); else submitAction(); });
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

Template.CoursesEditEditForm.helpers({
	"infoMessage": function() {
		return pageSession.get("coursesEditEditFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("coursesEditEditFormErrorMessage");
	}
	
});
