DrupalHub.controller('videosCtrl', function($scope, DrupalHubRequest) {

  $scope.videos = {};
  $scope.playlists = {};
  $scope.page = 1;
  $scope.show_more = false;

  DrupalHubRequest.localRequest('get', 'video?range=12').success(function(data) {
    $scope.videos = data.data;
    $scope.show_more = true;
    $scope.page++;
  });

  DrupalHubRequest.localRequest('get', 'playlist').success(function(data) {
    $scope.playlists = data.data;
  });

  $scope.loadMoreVideos = function() {

    DrupalHubRequest.localRequest('get', 'video?range=12&page=' + $scope.page).success(function(data) {
      var heap_videos = $scope.videos;

      angular.forEach(data.data, function(value, key) {
        heap_videos.push(value);
      });

      $scope.videos = heap_videos;
      $scope.show_more = !($scope.videos.length == data.count);
      $scope.page++;
    });
  };
});