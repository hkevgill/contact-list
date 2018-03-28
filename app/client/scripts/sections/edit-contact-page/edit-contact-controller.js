'use strict';

angular.module('contactApp').controller('edit-contact-controller', function ($scope, $state, $stateParams, $timeout, contactsFactory) {

    // variables
    var i;
    var offset;

    $scope.contactId = $stateParams.contactId;

    $scope.phonePattern = '[0-9]{3}[- ][0-9]{3}[- ][0-9]{4}';

    $scope.saved = false;
    $scope.rightnow = moment();
    $scope.selections = {
        selectedStudent: null
    };

    // load info when page loads
    contactsFactory.getContact($scope.contactId).then(function(data) {

        $scope.contact = data.rows[0];

    }, function() {
        console.log('error loading contact');
    });

    // save contact info
    $scope.saveContact = function() {

        contactsFactory.updateContactInfo($scope.contact).then(function(data) {

            $scope.saved = true;

            // show saved for 3 seconds
            $timeout(function () {
                $scope.saved = false;
            }, 2000);
        }, function() {
            console.log('error updating contact');
        });
    };

    // delete the contact
    $scope.deleteContact = function() {

        contactsFactory.deleteContact($scope.contact.id).then(function(data) {
            $state.go('contacts');
        }, function() {
            console.log('error deleting contact');
        });
    };

});
