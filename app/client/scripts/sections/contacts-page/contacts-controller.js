'use strict';

angular.module('contactApp').controller('contacts-controller', function ($scope, contactsFactory) {

    var i;
    var offset;
    $scope.propertyName = 'contact_name';
    $scope.reverse = true;

    // get all contacts on page load
    contactsFactory.getContactsList().then(function(data) {
        $scope.contacts = data.rows;
    }, function() {
        console.log('error getting contacts');
    });

    $scope.sortBy = function(propertyName) {
        $scope.reverse = ($scope.propertyName === propertyName) ? !$scope.reverse : false;
        $scope.propertyName = propertyName;
    };

});
