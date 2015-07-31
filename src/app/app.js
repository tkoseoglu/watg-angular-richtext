/**
 * Created by Kemal on 07/31/15.
 */
var watgRichtext = angular.module('watgRichtext', ['ngRoute', 'ngSanitize', 'watgRichtext.templates'])
    .config(function ($routeProvider, $httpProvider) {

        $routeProvider
            .when('/',
            {
                templateUrl: 'app/views/test.html',
                controller: 'testController'
            })
            .otherwise({redirectTo: '/'});
    });