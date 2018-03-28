'use strict';

angular.module('contactApp').controller('add-contact-controller', function ($scope, $state, contactsFactory) {

    $scope.contact = {
        contact_name: '',
        contact_email: '',
        contact_phone: '',
        contact_mailing_address: '',
        activity: ''
    };

    $scope.disabled = false;

    $scope.phonePattern = '[0-9]{3}[- ][0-9]{3}[- ][0-9]{4}';

    $scope.addContact = function() {

        contactsFactory.addContact($scope.contact).then(function(data) {
            $state.go('contacts');
        }, function() {
            console.log('error adding contact');
        });
    };

});
