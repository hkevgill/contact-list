'use strict'

var contactApp = angular.module('contactApp', ['ui.router', 'moment-picker']);

contactApp.config(function ($stateProvider, $urlRouterProvider, $locationProvider) {

    $urlRouterProvider.otherwise('/');

    $stateProvider
        .state('contacts', {
            url: '/',
            controller: 'contacts-controller',
            templateUrl: 'scripts/sections/contacts-page/contacts.html'
        })
        .state('edit', {
            url: '/edit/:contactId',
            controller: 'edit-contact-controller',
            templateUrl: 'scripts/sections/edit-contact-page/edit-contact.html'
        })
        .state('add', {
            url: '/add',
            controller: 'add-contact-controller',
            templateUrl: 'scripts/sections/add-contact-page/add-contact.html'
        });

    $locationProvider.html5Mode(true);
});
