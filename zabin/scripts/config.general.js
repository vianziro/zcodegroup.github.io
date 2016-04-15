var app = angular.module('app')

.run(function($rootScope, $state, $stateParams, $localStorage) {
    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
        var wonav = ["starter", "login", "register", "forgotpass", "useractivation"];
        $rootScope.state = toState.name;
        $rootScope.isStarter = wonav.indexOf(toState.name) > -1;
		$rootScope.fromState = fromState;
		if ($localStorage.token === undefined && wonav.indexOf(toState.name) === -1){
			event.preventDefault();
			$state.go('login');	
		}
    });

	$rootScope.asyncLoop = function (arr, func, callback){
		var index = 0;
		var done = false;
		arr = arr || [];
		var loop = {
			next: function (){
				if (done) return;
				if (index < arr.length){
					index++;
					func(loop);
				}else{
					done = true;
					callback();
				}
			},
			obj: function (){
				return arr[index - 1];
			},
			break: function (){
				done = true;
				callback();
			}
		}
		loop.next();
		return loop;
	};

})

.constant('config', {
    url: 'http://zcodeapi.herokuapp.com/api'
    //url: 'http://localhost:3002/api'
})

.controller('ctrl', function($scope, $rootScope, $state, $http, $localStorage, config) {
    var o = $scope,
        x = $rootScope;
    x.img = "https://dl.dropboxusercontent.com/s";
    x.now = new Date();
    x.appname = "Zabin";
    x.brand = $localStorage.company ? $localStorage.company.name : x.appname;
    x.title = "Zabin";
    x.subtitle = "";
    x.url = "http://crm.com";

    o.getUser = function() {
        return $localStorage.user;
    };

    o.logout = function() {
        $http.post(config.url + '/users/logout').then(function() {
            delete $localStorage.user;
            delete $localStorage.token;
            delete $localStorage.company;
            $state.go('login');
        });
    };

    o.isAdmin = function() {
        var x = $localStorage.user;
        if (x)
            return x.type === 0;
        else return false;
    };

    o.isLoged = function() {
        return $localStorage.token !== undefined;
    };
})

.config(['$controllerProvider', '$compileProvider', '$filterProvider', '$provide',
    function($controllerProvider, $compileProvider, $filterProvider, $provide) {
        app.controller = $controllerProvider.register;
        app.directive = $compileProvider.directive;
        app.filter = $filterProvider.register;
        app.factory = $provide.factory;
        app.service = $provide.service;
        app.constant = $provide.constant;
        app.value = $provide.value;
    }
])

.config(function($httpProvider) {
    $httpProvider.interceptors.push(function($q, $location, $localStorage) {
        return {
            'request': function(config) {
                if (config.url.indexOf('.html') > -1 ||
                    config.url.indexOf('.js') > -1) {
                    return config;
                }
                config.headers = config.headers || {};
                var token = $localStorage.token;
                if (token) {
                    var xd = config.url.indexOf('?') == -1 ? '?' : '&';
                    config.url += xd + 'access_token=' + token;
                }
                return config;
            },
            'responseError': function(response) {
                console.log("respone", response);
                if (response.status === 401 || response.status === 403) {
                    $location.path('/login');
                }
                return $q.reject(response);
            }
        };
    });
});
