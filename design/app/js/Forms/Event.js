DrupalHub.controller('EventFormCtrl', function($scope, DrupalHubRequest, drupalMessagesService, $filter, language) {

  $scope.submitResults = false;

  $scope.editorOptions = {
    contentsLangDirection: language.direction,
    language: language.code
  };

  $scope.event = {
    label: '',
    latitude: '',
    longitude: '',
    start_date: {
      date: '',
      time: ''
    },
    end_date: {
      date: '',
      time: ''
    },
    start: {
      date: '',
      time: ''
    },
    text: ''
  };

  $scope.showEndDate = false;

  $scope.submit = function() {

    drupalMessagesService.reset();

    drupalMessagesService.checkRequired($scope.eventForm);

    if (!$scope.event.location && !$scope.event.latitude) {
      drupalMessagesService.danger($filter('translate')('empty field', {'name': $filter('translate')('location')}));
    }

    if (!$scope.event.start_date.date) {
      drupalMessagesService.danger($filter('translate')('empty field', {'name': $filter('translate')('date')}));
    }

    if (drupalMessagesService.valid()) {

      // Processing the date into a new date.
      if ($scope.event.start instanceof Object) {
        $scope.event.start.date = moment($scope.event.start_date.date).format("D/M/YYYY");

        if ($scope.event.start_date.time == "") {
          $scope.event.start.time = moment().format("H:mm");
        }

        $scope.event.start = $scope.event.start.date + ' ' + $scope.event.start.time;
      }

      var event = angular.copy($scope.event);

      delete(event.start_date);
      delete(event.end_date);

      DrupalHubRequest.localRequest('post', 'event', event)
        .success(function(data) {
          drupalMessagesService.reset();
          drupalMessagesService.success('The event has created successfully. You are now redirected.');
          window.location = data.data[0].url;
        })
        .error(function(data) {
        });
    }
  };

  // Date selector.
  $scope.today = function() {
    $scope.dt = new Date();
  };
  $scope.today();

  $scope.clear = function () {
    $scope.dt = null;
  };

  // Disable weekend selection
  $scope.disabled = function(date, mode) {
    return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
  };

  $scope.toggleMin = function() {
    $scope.minDate = $scope.minDate ? null : new Date();
  };
  $scope.toggleMin();

  $scope.open = function($event) {
    $event.preventDefault();
    $event.stopPropagation();

    $scope.opened = true;
  };

  $scope.dateOptions = {
    formatYear: 'yy',
    startingDay: 1,
    showWeeks:'false'
  };

  $scope.format = 'dd/MM/yyyy';


  // Time picker.
  $scope.mytime = new Date();

  $scope.hstep = 1;
  $scope.mstep = 1;

  $scope.ismeridian = true;
  $scope.toggleMode = function() {
    $scope.ismeridian = ! $scope.ismeridian;
  };

  $scope.update = function() {
    var d = new Date();
    d.setHours( 14 );
    d.setMinutes( 0 );
    $scope.mytime = d;
  };

  $scope.changed = function () {
    $log.log('Time changed to: ' + $scope.mytime);
  };

  $scope.clear = function() {
    $scope.mytime = null;
  };

});
