'use strict';

angular.module('contactApp').factory('contactsFactory', function(utilsFactory) {
    var factory = {};

    // get request for all contacts
    factory.getContactsList = function(){
        var url = 'api/contacts';

        return utilsFactory.getRequest(url);
    };

    // get request for a contact
    factory.getContact = function(contactId) {
        var url = 'api/contacts/' + contactId;

        return utilsFactory.getRequest(url);
    };

    // save new contact info
    factory.updateContactInfo = function(body) {
        var url = 'api/contacts';

        return utilsFactory.putRequest(url, body);
    };

    // delete contact
    factory.deleteContact = function(contactId) {
        var url = 'api/contacts/' + contactId;

        return utilsFactory.deleteRequest(url);
    };

    // add contact
    factory.addContact = function(body) {
        var url = 'api/contacts/';

        return utilsFactory.postRequest(url, body);
    };

    return factory;
});
