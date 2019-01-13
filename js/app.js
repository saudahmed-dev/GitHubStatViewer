(function(){

    //ngRoute is another module this this module needs
    var app = angular.module("githubViewer", ["ngRoute"])

    app.config(function($routeProvider){
        $routeProvider
            .when("/main",{
                templateUrl: "main.html",
                controller: "MainController"
            })
            .otherwise({redirectTo:"/main"});

    });
})();