// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('ionictodo', ['ionic'])

//define your factories for saving and loading projects from local storage, and save and load last active projects.
//define all, save, new, getactive, setlastactive functions for the factory

.factory('Projects', function() {
  return {
    all: function() {
      var projectString = window.localStorage['projects'];
      if(projectString) {
        return angular.fromJson(projectString);
      }
      return [];
    },
    save: function(projects) {
      window.localStorage['projects'] = angular.toJson(projects);
    },
    newProject: function(projectTitle) {
      //add a new project
      return {
        title: projectTitle,
        tasks: []
      };
    },
    getLastActiveIndex: function() {
      return parseInt(window.localStorage['lastActiveProject']) || 0;
    },
    setLastActiveIndex: function(index) {
      window.localStorage['lastActiveProject'] = index;
    }
  }
})





// add a controller "TodoCtrl" to tell the javascript what to do with the list element
// add timeout and ionicsidemenu references, and refer to projects in local storage
.controller('TodoCtrl', function($scope, $timeout, $ionicModal, Projects, $ionicSideMenuDelegate) {
  // create a new project with a given project title, push to scope
  // save to scope
  // select the last appended project (relies on order)
  var createProject = function(projectTitle) {
    var newProject = Projects.newProject(projectTitle);
    $scope.projects.push(newProject);
    Projects.save($scope.projects);
    $scope.selectProject(newProject, $scope.projects.length-1);
  }

  // load projects
  $scope.projects = Projects.all();

  // grab the last active or only project
  $scope.activeProject = $scope.projects[Projects.getLastActiveIndex];

  // create a new project
  $scope.newProject = function() {
    var projectTitle = prompt('Project name');
    if(projectTitle) {
      createProject(projectTitle);
    }
  };

  $scope.selectProject = function(project, index) {
    $scope.activeProject = project;
    Projects.setLastActiveIndex(index);
    $ionicSideMenuDelegate.toggleLeft(false);
  };

  //create the modal
  $ionicModal.fromTemplateUrl('new-task.html', function(modal) {
    $scope.taskModal = modal;
  }, {
    scope: $scope
  });

  $scope.createTask = function(task) {
    if(!$scope.activeProject || !task) {
      return;
    }
    $scope.activeProject.tasks.push({
      title: task.title
    });
    $scope.taskModal.hide();

    Projects.save($scope.project);
    task.title = "";
  };


  $scope.tasks = [];

// // create but do not show a modal using the template URL new-task.html, use the animation slide-in-up to animate and load the modal
//   $ionicModal.fromTemplateUrl('new-task.html', function(modal) {
//     $scope.taskModal = modal;
//   }, {
//     scope: $scope,
//     animation: 'slide-in-up'
//   });

// // upon submission of the form, push the task title to the scope, and hide the modal, reset the task title
//   $scope.createTask = function(task) {
//     $scope.tasks.push({
//       title: task.title
//     });
//     $scope.taskModal.hide();
//     task.title = "";
// };

// Show the task modal on the ng-click newTask() in the center element
  $scope.newTask = function() {
    $scope.taskModal.show();
  };

// Hide the task model on closeNewTask() called by the submit button's ng-click element
  $scope.closeNewTask = function() {
    $scope.taskModal.hide();
  };

  $scope.toggleProjects = function() {
    $ionicSideMenuDelegate.toggleLeft();
  };

  // Try to create the first project, make sure to defer
  // this by using $timeout so everything is initialized
  // properly
  $timeout(function() {
    if($scope.projects.length == 0) {
      while(true) {
        var projectTitle = prompt('Your first project title:');
        if(projectTitle) {
          createProject(projectTitle);
          break;
        }
      }
    }
  }, 1000);

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
