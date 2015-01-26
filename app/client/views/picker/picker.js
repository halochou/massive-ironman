var pageSession = new ReactiveDict();

Template.Picker.rendered = function() {
	
};

Template.Picker.events({
	"click #page-close-button": function(e, t) {
		e.preventDefault();
		Router.go("", {});
	},
	"click #page-back-button": function(e, t) {
		e.preventDefault();
		Router.go("", {});
	}

	
});

Template.Picker.helpers({
	
});

var PickerViewItems = function(cursor) {
	if(!cursor) {
		return [];
	}

	var searchString = pageSession.get("PickerViewSearchString");
	var sortBy = pageSession.get("PickerViewSortBy");
	var sortAscending = pageSession.get("PickerViewSortAscending");
	if(typeof(sortAscending) == "undefined") sortAscending = true;

	var raw = cursor.fetch();

	// filter
	var filtered = [];
	if(!searchString || searchString == "") {
		filtered = raw;
	} else {
		searchString = searchString.replace(".", "\\.");
		var regEx = new RegExp(searchString, "i");
		var searchFields = ["name", "tutor", "amount", "date", "members"];
		filtered = _.filter(raw, function(item) {
			var match = false;
			_.each(searchFields, function(field) {
				var value = (getPropertyValue(field, item) || "") + "";

				match = match || (value && value.match(regEx));
				if(match) {
					return false;
				}
			})
			return match;
		});
	}

	// sort
	if(sortBy) {
		filtered = _.sortBy(filtered, sortBy);

		// descending?
		if(!sortAscending) {
			filtered = filtered.reverse();
		}
	}

	return filtered;
};

var PickerViewExport = function(cursor, fileType) {
	var data = PickerViewItems(cursor);
	var exportFields = ["name", "tutor", "amount", "date", "members"];

	var str = convertArrayOfObjects(data, exportFields, fileType);

	var filename = "export." + fileType;

	downloadLocalResource(str, filename, "application/octet-stream");
}


Template.PickerView.rendered = function() {
	pageSession.set("PickerViewStyle", "table");
	
};

Template.PickerView.events({
	"submit #dataview-controls": function(e, t) {
		return false;
	},

	"click #dataview-search-button": function(e, t) {
		e.preventDefault();
		var form = $(e.currentTarget).parent();
		if(form) {
			var searchInput = form.find("#dataview-search-input");
			if(searchInput) {
				searchInput.focus();
				var searchString = searchInput.val();
				pageSession.set("PickerViewSearchString", searchString);
			}

		}
		return false;
	},

	"keydown #dataview-search-input": function(e, t) {
		if(e.which === 13)
		{
			e.preventDefault();
			var form = $(e.currentTarget).parent();
			if(form) {
				var searchInput = form.find("#dataview-search-input");
				if(searchInput) {
					var searchString = searchInput.val();
					pageSession.set("PickerViewSearchString", searchString);
				}

			}
			return false;
		}

		if(e.which === 27)
		{
			e.preventDefault();
			var form = $(e.currentTarget).parent();
			if(form) {
				var searchInput = form.find("#dataview-search-input");
				if(searchInput) {
					searchInput.val("");
					pageSession.set("PickerViewSearchString", "");
				}

			}
			return false;
		}

		return true;
	},

	"click #dataview-insert-button": function(e, t) {
		e.preventDefault();
		/**/
	},

	"click #dataview-export-default": function(e, t) {
		e.preventDefault();
		PickerViewExport(this.courses, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		PickerViewExport(this.courses, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		PickerViewExport(this.courses, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		PickerViewExport(this.courses, "json");
	}

	
});

Template.PickerView.helpers({
	"isEmpty": function() {
		return !this.courses || this.courses.count() == 0;
	},
	"isNotEmpty": function() {
		return this.courses && this.courses.count() > 0;
	},
	"isNotFound": function() {
		return this.courses && pageSession.get("PickerViewSearchString") && PickerViewItems(this.courses).length == 0;
	},
	"searchString": function() {
		return pageSession.get("PickerViewSearchString");
	},
	"viewAsTable": function() {
		return pageSession.get("PickerViewStyle") == "table";
	},
	"viewAsList": function() {
		return pageSession.get("PickerViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return pageSession.get("PickerViewStyle") == "gallery";
	}

	
});


Template.PickerViewTable.rendered = function() {
	
};

Template.PickerViewTable.events({
	"click .th-sortable": function(e, t) {
		e.preventDefault();
		var oldSortBy = pageSession.get("PickerViewSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		pageSession.set("PickerViewSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = pageSession.get("PickerViewSortAscending") || false;
			pageSession.set("PickerViewSortAscending", !sortAscending);
		} else {
			pageSession.set("PickerViewSortAscending", true);
		}
	}
});

Template.PickerViewTable.helpers({
	"tableItems": function() {
		return PickerViewItems(this.courses);
	}
});


Template.PickerViewTableItems.rendered = function() {
	
};

Template.PickerViewTableItems.events({
	"click td": function(e, t) {
		e.preventDefault();
		Router.go("courses.details", {courseId: this._id});
		return false;
	},

	"click #delete-button": function(e, t) {
		e.preventDefault();
		var me = this;
		bootbox.dialog({
			message: "Delete? Are you sure?",
			title: "Delete",
			animate: false,
			buttons: {
				success: {
					label: "Yes",
					className: "btn-success",
					callback: function() {
						Courses.remove({ _id: me._id });
					}
				},
				danger: {
					label: "No",
					className: "btn-default"
				}
			}
		});
		return false;
	},
	"click #edit-button": function(e, t) {
		e.preventDefault();
		Router.go("courses.edit", {courseId: this._id});
		return false;
	}
});

Template.PickerViewTableItems.helpers({

});
