// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('ionictodo', ['ionic'])

// add a controller "TodoCtrl" to tell the javascript what to do with the list element
.controller('TodoCtrl', function($scope, $ionicModal) {
  $scope.tasks = [
  { title: 'test task' }
  ];

// create but do not show a modal using the template URL new-task.html, use the animation slide-in-up to animate and load the modal
  $ionicModal.fromTemplateUrl('new-task.html', function(modal) {
    $scope.taskModal = modal;
  }, {
    scope: $scope,
    animation: 'slide-in-up'
  });

// upon submission of the form, push the task title to the scope, and hide the modal, reset the task title
  $scope.createTask = function(task) {
    $scope.tasks.push({
      title: task.title
    });
    $scope.taskModal.hide();
    task.title = "";
};

// Show the task modal on the ng-click newTask() in the center element
  $scope.newTask = function() {
    $scope.taskModal.show();
  };

// Hide the task model on closeNewTask() called by the submit button's ng-click element
  $scope.closeNewTask = function() {
    $scope.taskModal.hide();
  };
})

// .run(function($ionicPlatform) {
//   $ionicPlatform.ready(function() {
//     if(window.cordova && window.cordova.plugins.Keyboard) {
//       // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
//       // for form inputs)
//       cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

//       // Don't remove this line unless you know what you are doing. It stops the viewport
//       // from snapping when text inputs are focused. Ionic handles this internally for
//       // a much nicer keyboard experience.
//       cordova.plugins.Keyboard.disableScroll(true);
//     }
//     if(window.StatusBar) {
//       StatusBar.styleDefault();
//     }
//   });
// })
