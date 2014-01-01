var set = angular.module('set', []);

// Sets the AngularJS interpolators as <[ and ]>, to not conflict with Django.
set.config(function($interpolateProvider) {
  $interpolateProvider.startSymbol('<[');
  $interpolateProvider.endSymbol(']>');
});

window.onWidgetLoad = function() {
  window.parent.postMessage(
    {'widgetHeight': document.body.scrollHeight},
    window.location.protocol + '//' + window.location.host);
};

function SetInput($scope) {
  $scope.answer = [];

  $scope.addElement = function(newElement) {
    if (newElement !== 0 && !newElement) {
      return;
    }
    $scope.answer.push(newElement);
    $scope.newElement = '';
    window.parent.postMessage(
      {'widgetHeight': document.body.scrollHeight + 30},
      window.location.protocol + '//' + window.location.host);
  };

  $scope.deleteElement = function(index) {
    $scope.answer.splice(index, 1);
  };

  $scope.submitAnswer = function(answer) {
    // Send a JSON version of $scope.answer to the backend.
    if (parent.location.pathname.indexOf('/explore') === 0) {
      window.parent.postMessage(
          JSON.stringify({'submit': answer}),
          window.location.protocol + '//' + window.location.host
      );
    }
  };
}
