
(function () {

  var app = angular.module("githubViewer", [])

  var MainController = function ($scope, http, $interval, $log, $anchorScroll, $location) {



    var onError = function () {
      $scope.error = "something went wrong"
    }

    var notError = function () {
      $scope.error = "";
    }

    var onUserComplete = function (data) {
      $scope.user = data;
      notError()
      http.getRepos($scope.user).then(onRepos, onError)
    };

    var onRepos = function (data) {
      $scope.repos = data;
      $location.hash($scope.username)
      $anchorScroll();
    };

    $scope.repoSort = function () {
      return $scope.repoSortOrder + $scope.repoSortField
    };

    // var decrementCountdown = function(){
    //   $scope.countdown -= 1
    //   if ($scope.countdown< 1){
    //     $scope.search($scope.username)
    //     $scope.countdown = null;
    //   };
    // };

    // var startCountdown = function(){
    //   $interval(decrementCountdown, 1000, $scope.countdown)
    // }

    var reloadSearch = function () {
      let lastUsername = null
      $interval(function() {
        if (lastUsername != $scope.username){
          $scope.search($scope.username)
          $log.log("new search: " + $scope.username)
          $location.hash($scope.username)
        }
        
        lastUsername = $scope.username;
      }, 3000 );
    };



    $scope.search = function (username) {
      http.getUser(username).then(onUserComplete, onError);
    };

    $scope.username = ""
    $scope.countdown = 5;
    $scope.username = "python"
    // startCountdown()
    reloadSearch()

  };

  app.controller("MainController", ["$scope", "http", "$interval", "$log", "$anchorScroll", "$location", MainController])
})();

