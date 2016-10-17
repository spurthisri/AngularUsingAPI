var MainController = function ($scope, $http, $interval, $log) {
    
    var onUserComplete = function (response) {
        $scope.user = response.data;
        $http.get($scope.user.repos_url).then(onRepos, onError);
    };
    var onRepos = function (response) {
        $scope.repos = response.data;
    };
    var onError = function (reason) {
        $scope.error = "Could not fetch the data.";
    };
    
    var decrementCountDown = function(){
      $scope.countdown--;
        if($scope.countdown < 1){
            $scope.search($scope.username);
        }
    };
    
    var countDownInterval = null;
    
    var startCountDown = function(){
      countDownInterval = $interval(decrementCountDown, 1000, $scope.countdown)  
    };
    
    $scope.search = function (username) {
        $log.info("Searching for : " +username);
        $http.get("https://api.github.com/users/" + username).then(onUserComplete, onError);
        if(countDownInterval){
            $interval.cancel(countDownInterval);
        }
    };
    
    $scope.username = "angular";
    $scope.message = "GITHUB Viewer";
    $scope.repoSortOrder = "+stargazers_count";
    $scope.countdown = 5;
    startCountDown();
    
};
var module = angular.module("gitHubViewer", []).controller("MainController", MainController);