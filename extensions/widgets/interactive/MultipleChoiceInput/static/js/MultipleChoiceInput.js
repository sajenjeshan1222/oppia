var mc = angular.module('mc', []);

// Sets the AngularJS interpolators as <[ and ]>, to not conflict with Django.
mc.config(function($interpolateProvider) {
  $interpolateProvider.startSymbol('<[');
  $interpolateProvider.endSymbol(']>');
});

function MultipleChoiceInput($scope) {
  $scope.choices = GLOBALS.choices;

  window.onWidgetLoad = function() {
    window.parent.postMessage(
      {'widgetHeight': document.body.scrollHeight},
      window.location.protocol + '//' + window.location.host);
  };

  $scope.submitAnswer = function(answer) {
    if (!answer) {
      return;
    }
    if (parent.location.pathname.indexOf('/explore') === 0) {
      window.parent.postMessage(
          JSON.stringify({'submit': answer}),
          window.location.protocol + '//' + window.location.host
      );
    }
  };
}
