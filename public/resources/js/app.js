var myApp = angular.module('MyApp', ['angular.circular.datetimepicker']);

var tempIp = 'http://172.17.214.24:3000';

myApp.controller('ClockController', ['$scope', '$http', function($scope, $http) {
	$scope.data = {};
	$scope.data.date = new Date();
  $scope.data.send = false;
  $scope.data.alarms = [];

  $http({
    method: 'GET',
    url: tempIp + '/schedule'
  }).then(function successCallback(response) {
      console.log(response.data);
      var data = response.data.reverse();
      $scope.data.alarms = data;
    }, function errorCallback(response) {
      console.log('Your mother is sick to get your alarms, try later');
    });


	$scope.add = function () {
    $scope.data.send = false;
		console.log($scope.data);
    var data = {
      'time': $scope.data.date.toISOString(),
      'text': $scope.data.text,
      'on': true
    }
		$http({
		  method: 'POST',
		  url: tempIp + '/schedule',
      data: JSON.stringify(data)
		}).then(function successCallback(response) {
        console.log(response);
        $scope.data.text = '';
        $scope.data.send = true;
		  }, function errorCallback(response) {
		    console.log('Your mother is sick, try later');
		  });
	}
}]);