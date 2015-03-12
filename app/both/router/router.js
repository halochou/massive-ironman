Router.configure({
	templateNameConverter: "upperCamelCase",
	routeControllerNameConverter: "upperCamelCase",
	layoutTemplate: "layout",
	notFoundTemplate: "notFound",
	loadingTemplate: "loading"
});

if(Meteor.isClient) {
	var publicRoutes = ["login", "register", "forgot_password", "reset_password", "home_public"];
	var privateRoutes = ["courses", "home_private", "courses.insert", "courses.details", "courses.edit", "admin", "admin.users", "admin.users.details", "admin.users.insert", "admin.users.edit", "user_settings", "user_settings.profile", "user_settings.change_pass", "logout"];
	var zonelessRoutes = [];

	var roleMap = [
		{ route: "courses", roles: ["admin","tutor","user"] },
		{ route: "courses.insert", roles: ["admin","tutor"] },
		{ route: "courses.details", roles: ["admin","tutor","user"] },
		{ route: "courses.edit", roles: ["admin","tutor"] },
		{ route: "admin", roles: ["admin"] },
		{ route: "admin.users", roles: ["admin"] },
		{ route: "admin.users.details", roles: ["admin"] },
		{ route: "admin.users.insert", roles: ["admin"] },
		{ route: "admin.users.edit", roles: ["admin"] },
		{ route: "user_settings", roles: ["user","tutor","admin"] },
		{ route: "user_settings.profile", roles: ["user","tutor","admin"] },
		{ route: "user_settings.change_pass", roles: ["user","tutor","admin"] }
	];

	this.firstGrantedRoute = function() {
		var grantedRoute = "";
		_.every(privateRoutes, function(route) {
			if(routeGranted(route)) {
				grantedRoute = route;
				return false;
			}
			return true;
		});

		if(grantedRoute == "") {
			if(routeGranted("home_private")) {
				return "home_private";
			} else {
				return "home_public";
			}
		}

		return grantedRoute;
	}

	// this function returns true if user is in role allowed to access given route
	this.routeGranted = function(routeName) {
		if(!routeName) {
			// route without name - enable access (?)
			return true;
		}

		if(!roleMap || roleMap.length === 0) {
			// this app don't have role map - enable access
			return true;
		}

		var roleMapItem = _.find(roleMap, function(roleItem) { return roleItem.route == routeName; });
		if(!roleMapItem) {
			// page is not restricted
			return true;
		}

		if(!Meteor.user() || !Meteor.user().roles) {
			// user is not logged in
			return false;
		}

		// this page is restricted to some role(s), check if user is in one of allowedRoles
		var allowedRoles = roleMapItem.roles;
		var granted = _.intersection(allowedRoles, Meteor.user().roles);
		if(!granted || granted.length === 0) {
			return false;
		}

		return true;
	};

	Meteor.subscribe("current_user_data");

	Router.ensureLogged = function() {
		if(!Meteor.user()) {
			// user is not logged in - redirect to public home
			this.redirect("login");
			return;
		} else {
			// user is logged in - check role
			if(!routeGranted(this.route.getName())) {
				// user is not in allowedRoles - redirect to private home
				var redirectRoute = firstGrantedRoute();
				this.redirect(redirectRoute);
				return;
			}
			this.next();
		}
	};

	Router.ensureNotLogged = function() {
		if(Meteor.user()) {
			var redirectRoute = firstGrantedRoute();
			this.redirect(redirectRoute);
		}
		else
			this.next();
	};

	Router.onBeforeAction(function() {
		// loading indicator here
		if(!this.ready()) {
			$("body").addClass("wait");
		} else {
			$("body").removeClass("wait");
			this.next();
		}
	});

	Router.onBeforeAction(Router.ensureNotLogged, {only: publicRoutes});
	Router.onBeforeAction(Router.ensureLogged, {only: privateRoutes});
}

Router.map(function () {

	// this.route("home_public", {path: "/", controller: "HomePublicController"});
	this.route("login", {path: "/login", controller: "LoginController"});
	this.route("register", {path: "/register", controller: "RegisterController"});
	this.route("forgot_password", {path: "/forgot_password", controller: "ForgotPasswordController"});
	this.route("reset_password", {path: "/reset_password/:resetPasswordToken", controller: "ResetPasswordController"});
	// this.route("home_private", {path: "/home_private", controller: "HomePrivateController"});
	this.route("courses", {path: "/courses", controller: "CoursesController"});
	this.route("courses.insert", {path: "/courses/insert", controller: "CoursesInsertController"});
	this.route("courses.details", {path: "/courses/details/:courseId", controller: "CoursesDetailsController"});
	this.route("courses.edit", {path: "/courses/edit/:courseId", controller: "CoursesEditController"});
	this.route("admin", {path: "/admin", controller: "AdminController"});
	this.route("admin.users", {path: "/admin/users", controller: "AdminUsersController"});
	this.route("admin.users.details", {path: "/admin/users/details/:userId", controller: "AdminUsersDetailsController"});
	this.route("admin.users.insert", {path: "/admin/users/insert", controller: "AdminUsersInsertController"});
	this.route("admin.users.edit", {path: "/admin/users/edit/:userId", controller: "AdminUsersEditController"});
	this.route("user_settings", {path: "/user_settings", controller: "UserSettingsController"});
	this.route("user_settings.profile", {path: "/user_settings/profile", controller: "UserSettingsProfileController"});
	this.route("user_settings.change_pass", {path: "/user_settings/change_pass", controller: "UserSettingsChangePassController"});
	this.route("logout", {path: "/logout", controller: "LogoutController"});/*ROUTER_MAP*/
});
