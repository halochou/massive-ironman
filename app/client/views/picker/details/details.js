var pageSession = new ReactiveDict();

Template.PickerDetails.rendered = function() {
	
};

Template.PickerDetails.events({
	"click #page-close-button": function(e, t) {
		e.preventDefault();
		Router.go("", {});
	},
	"click #page-back-button": function(e, t) {
		e.preventDefault();
		Router.go("", {});
	}

	
});

Template.PickerDetails.helpers({
	
});

Template.PickerDetailsDetailsForm.rendered = function() {
	

	pageSession.set("pickerDetailsDetailsFormInfoMessage", "");
	pageSession.set("pickerDetailsDetailsFormErrorMessage", "");

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

Template.PickerDetailsDetailsForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("pickerDetailsDetailsFormInfoMessage", "");
		pageSession.set("pickerDetailsDetailsFormErrorMessage", "");
		
		var self = this;

		function submitAction() {
			if(!t.find("#form-cancel-button")) {
				pageSession.set("pickerDetailsDetailsFormInfoMessage", "Saved.");
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			pageSession.set("pickerDetailsDetailsFormErrorMessage", "Error. " + msg);
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

Template.PickerDetailsDetailsForm.helpers({
	"infoMessage": function() {
		return pageSession.get("pickerDetailsDetailsFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("pickerDetailsDetailsFormErrorMessage");
	}
	
});
