DrupalHub.controller('questionCtrl', function($scope, DrupalHubRequest, $location) {
  
  DrupalHubRequest.localRequest('get', $location.path() != '/questions' ? 'question?range=5' : 'question').
    success(function(data, status) {
      $scope.questions = data.data;
    });
});
