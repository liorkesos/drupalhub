DrupalHub.controller('VideoFormCtrl', function($scope, DrupalHubRequest, $http) {

  $scope.video = {
    embed: '',
    label: '',
    text: ''
  };

  $scope.getVideoDetails = function() {
    var split = $scope.video.embed.split('v=');
    $http({
      url: "https://www.googleapis.com/youtube/v3/videos",
      params: {
        id: split[1],
        key: "AIzaSyB9GaMYWcFitmreglsphxlBIm1WO5IXUeM",
        part: "snippet,contentDetails,statistics,status"
      }
    }).then(function(data) {
      $scope.showResults = true;
      var result = data.data.items[0];

      $scope.video.label = result.snippet.title;
      $scope.video.text = result.snippet.description.replace(/(\r\n|\n|\r)/gm, "<br>");

      $scope.image = result.snippet.thumbnails.high.url;
    });
  };

  $scope.toggleLabel = function() {
    $scope.showLabel = true;
  };

  $scope.post = function() {
    $scope.errors = [];
    DrupalHubRequest.localRequest('post', 'video', $scope.video)
      .success(function(data) {
        window.location = '#/video/' + data.data[0].id;
      })
      .error(function(data) {
        if (data.detail == 'Bad Request.') {
          $scope.errors.push(data.errors.embed[0]);
        }
        else {
          $scope.errors.push(data.title);
        }

      });
  }

});