(function() {
    "use strict";
    var app = angular.module('watgRichtextModule');
    app.config(['$httpProvider', '$routeProvider', appConfig]);
    app.run(appRun);

    function appConfig($httpProvider, $routeProvider) {

        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
        if (!$httpProvider.defaults.headers.get) {
            $httpProvider.defaults.headers.get = {};
        }

        $httpProvider.defaults.headers.common['If-Modified-Since'] = 'Mon, 26 Jul 1997 05:00:00 GMT';
        $httpProvider.defaults.headers.common['Cache-Control'] = 'no-cache';
        $httpProvider.defaults.headers.common['Pragma'] = 'no-cache';

        $routeProvider.when('/test', {
            templateUrl: 'src/app/tests/test.html',
            controller: 'testController'
        }).otherwise({
            redirectTo: '/test'
        });
    }

    function appRun() {}
})();