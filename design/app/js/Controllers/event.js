DrupalHub.controller('eventCtrl', function($scope, DrupalHubRequest, $routeParams, $rootScope, $filter) {

  DrupalHubRequest.localRequest('get', 'event/' + $routeParams.id + '?add_view=add')
    .then(function(data) {
      $scope.event = data.data.data[0];
      $rootScope.$emit('titleAlter', $scope.event.label);
    });

  $scope.rsvpStatus = $filter('translate')('Unknown');
  $scope.rsvpID = 0;

  $scope.tablLalbes = {
    'Status:': $filter('translate')('Status'),
    'Not': $filter('translate')('Not'),
    'Maybe': $filter('translate')('Maybe'),
    'Coming': $filter('translate')('Coming')
  };

  DrupalHubRequest.localRequest('get', 'rsvp').then(function (data) {
    if (data.data.count != 0) {
      var rsvp = data.data.data[0];

      $scope.rsvpID = rsvp.id;
      $scope.rsvpStatus = $filter('translate')(rsvp.rsvp_status);
    }
  });

  $scope.rsvp = function(status) {

    var method, path;

    if ($scope.rsvpID) {
      method = 'patch';
      path = 'rsvp/' + $scope.rsvpID;

    }
    else {
      method = 'post';
      path = 'rsvp';
    }

    DrupalHubRequest.localRequest(method, path, {
      'rsvp_status': status,
      'event': $scope.event.id
    }).then(function (data) {
      $scope.rsvpStatus = $filter('translate')(status);

      DrupalHubRequest.localRequest('get', 'event/' + $routeParams.id).then(function(data) {
        var new_event = data.data.data[0];

        // Updating the rsvp with the new data.
        $scope.event.rsvp = new_event.rsvp;
      });

    });
  };
});
