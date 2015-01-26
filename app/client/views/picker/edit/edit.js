var pageSession = new ReactiveDict();

Template.PickerEdit.rendered = function() {
	
};

Template.PickerEdit.events({
	"click #page-close-button": function(e, t) {
		e.preventDefault();
		Router.go("", {});
	},
	"click #page-back-button": function(e, t) {
		e.preventDefault();
		Router.go("", {});
	}

	
});

Template.PickerEdit.helpers({
	
});

Template.PickerEditEditForm.rendered = function() {
	

	pageSession.set("pickerEditEditFormInfoMessage", "");
	pageSession.set("pickerEditEditFormErrorMessage", "");

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

Template.PickerEditEditForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("pickerEditEditFormInfoMessage", "");
		pageSession.set("pickerEditEditFormErrorMessage", "");
		
		var self = this;

		function submitAction() {
			if(!t.find("#form-cancel-button")) {
				pageSession.set("pickerEditEditFormInfoMessage", "Saved.");
			}

			Router.go("courses", {});
		}

		function errorAction(msg) {
			pageSession.set("pickerEditEditFormErrorMessage", "Error. " + msg);
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

Template.PickerEditEditForm.helpers({
	"infoMessage": function() {
		return pageSession.get("pickerEditEditFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("pickerEditEditFormErrorMessage");
	}
	
});
