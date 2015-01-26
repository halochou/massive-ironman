var pageSession = new ReactiveDict();

Template.Courses.rendered = function() {
	
};

Template.Courses.events({
	"click #page-close-button": function(e, t) {
		e.preventDefault();
		Router.go("", {});
	},
	"click #page-back-button": function(e, t) {
		e.preventDefault();
		Router.go("", {});
	}

	
});

Template.Courses.helpers({
	
});

var CoursesViewItems = function(cursor) {
	if(!cursor) {
		return [];
	}

	var searchString = pageSession.get("CoursesViewSearchString");
	var sortBy = pageSession.get("CoursesViewSortBy");
	var sortAscending = pageSession.get("CoursesViewSortAscending");
	if(typeof(sortAscending) == "undefined") sortAscending = true;

	var raw = cursor.fetch();

	// filter
	var filtered = [];
	if(!searchString || searchString == "") {
		filtered = raw;
	} else {
		searchString = searchString.replace(".", "\\.");
		var regEx = new RegExp(searchString, "i");
		var searchFields = ["name", "tutor", "date", "avail", "amount", "desc", "members"];
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

var CoursesViewExport = function(cursor, fileType) {
	var data = CoursesViewItems(cursor);
	var exportFields = ["name", "tutor", "date", "amount", "members"];

	var str = convertArrayOfObjects(data, exportFields, fileType);

	var filename = "export." + fileType;

	downloadLocalResource(str, filename, "application/octet-stream");
}


Template.CoursesView.rendered = function() {
	pageSession.set("CoursesViewStyle", "table");
	
};

Template.CoursesView.events({
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
				pageSession.set("CoursesViewSearchString", searchString);
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
					pageSession.set("CoursesViewSearchString", searchString);
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
					pageSession.set("CoursesViewSearchString", "");
				}

			}
			return false;
		}

		return true;
	},

	"click #dataview-insert-button": function(e, t) {
		e.preventDefault();
		Router.go("courses.insert", {});
	},

	"click #dataview-export-default": function(e, t) {
		e.preventDefault();
		CoursesViewExport(this.courses, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		CoursesViewExport(this.courses, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		CoursesViewExport(this.courses, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		CoursesViewExport(this.courses, "json");
	}

	
});

Template.CoursesView.helpers({
	"isEmpty": function() {
		return !this.courses || this.courses.count() == 0;
	},
	"isNotEmpty": function() {
		return this.courses && this.courses.count() > 0;
	},
	"isNotFound": function() {
		return this.courses && pageSession.get("CoursesViewSearchString") && CoursesViewItems(this.courses).length == 0;
	},
	"searchString": function() {
		return pageSession.get("CoursesViewSearchString");
	},
	"viewAsTable": function() {
		return pageSession.get("CoursesViewStyle") == "table";
	},
	"viewAsList": function() {
		return pageSession.get("CoursesViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return pageSession.get("CoursesViewStyle") == "gallery";
	}

	
});


Template.CoursesViewTable.rendered = function() {
	
};

Template.CoursesViewTable.events({
	"click .th-sortable": function(e, t) {
		e.preventDefault();
		var oldSortBy = pageSession.get("CoursesViewSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		pageSession.set("CoursesViewSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = pageSession.get("CoursesViewSortAscending") || false;
			pageSession.set("CoursesViewSortAscending", !sortAscending);
		} else {
			pageSession.set("CoursesViewSortAscending", true);
		}
	}
});

Template.CoursesViewTable.helpers({
	"tableItems": function() {
		return CoursesViewItems(this.courses);
	}
});


Template.CoursesViewTableItems.rendered = function() {
	
};

Template.CoursesViewTableItems.events({
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

Template.CoursesViewTableItems.helpers({

});
