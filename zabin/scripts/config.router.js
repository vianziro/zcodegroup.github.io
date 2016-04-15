'use strict';

angular.module('app')

.run(['$rootScope', '$state', '$stateParams',
    function($rootScope, $state, $stateParams) {
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
    }
])

.config(function($stateProvider, $urlRouterProvider, $httpProvider) {
    $urlRouterProvider.otherwise('/');
    $stateProvider.state('home', {
            url: '/',
            templateUrl: 'tpl/home.html',
            controller: 'HomeCtrl',
            resolve: {
                deps: ['$ocLazyLoad',
                    function($ocLazyLoad) {
                        return $ocLazyLoad.load(['scripts/controllers/home.js', 
							'scripts/services/fields.js',
							'scripts/services/customer.js',
							'scripts/services/config.js'
							]);
                    }
                ]
            }
        })
        .state('starter', {
            url: '/starter',
            templateUrl: 'tpl/starter.html',
            controller: 'StarterCtrl',
            resolve: {
                deps: ['$ocLazyLoad',
                    function($ocLazyLoad) {
                        return $ocLazyLoad.load(['scripts/controllers/starter.js',
                            'scripts/services/fields.js',
                            'scripts/services/company.js'
                        ]);
                    }
                ]
            }
        })
        .state('field', {
            url: '/field',
            templateUrl: 'tpl/field.html',
            controller: 'FieldCtrl',
            resolve: {
                deps: ['$ocLazyLoad',
                    function($ocLazyLoad) {
                        return $ocLazyLoad.load(['scripts/controllers/field.js',
                            'scripts/services/fields.js',
                            'scripts/services/company.js'
                        ]);
                    }
                ]
            }
        })
		.state('settingchart', {
            url: '/settingchart',
            templateUrl: 'tpl/setting.chart.html',
            controller: 'SettingChartCtrl',
            resolve: {
                deps: ['$ocLazyLoad',
                    function($ocLazyLoad) {
                        return $ocLazyLoad.load(['scripts/controllers/setting.chart.js',
							'scripts/services/fields.js',
							'scripts/services/config.js'
							]);
                    }
                ]
            }
        })
        .state('user', {
            url: '/user',
            templateUrl: 'tpl/user.html',
            controller: 'UserCtrl',
            resolve: {
                deps: ['$ocLazyLoad',
                    function($ocLazyLoad) {
                        return $ocLazyLoad.load(['scripts/controllers/user.js',
                            'scripts/services/user.js',
                            'scripts/services/workspace.js'
                        ]);
                    }
                ]
            }
        })
        .state('customer', {
            url: '/customer',
            templateUrl: 'tpl/customer.html',
            controller: 'CustomerCtrl',
            resolve: {
                deps: ['$ocLazyLoad',
                    function($ocLazyLoad) {
                        return $ocLazyLoad.load(['scripts/controllers/customer.js',
                            'scripts/services/customer.js',
                            'scripts/services/fields.js'
                        ]);
                    }
                ]
            }
        })
        .state('customerform', {
            url: '/customerform/:id',
            templateUrl: 'tpl/customer.form.html',
            controller: 'CustomerFormCtrl',
            resolve: {
                deps: ['$ocLazyLoad',
                    function($ocLazyLoad) {
                        return $ocLazyLoad.load(['scripts/controllers/customer.form.js',
                            'scripts/services/customer.js',
                            'scripts/services/fields.js'
                        ]);
                    }
                ]
            }
        })
        .state('customerimport', {
            url: '/customerimport',
            templateUrl: 'tpl/customer.import.html',
            controller: 'CustomerImportCtrl',
            resolve: {
                deps: ['$ocLazyLoad',
                    function($ocLazyLoad) {
                        return $ocLazyLoad.load(['scripts/controllers/customer.import.js',
                            'scripts/services/customer.js',
                            'scripts/services/fields.js'
                        ]);
                    }
                ]
            }
        })
        .state('customersearch', {
            url: '/customersearch',
            templateUrl: 'tpl/customer.search.html',
            controller: 'CustomerSearchCtrl',
            resolve: {
                deps: ['$ocLazyLoad',
                    function($ocLazyLoad) {
                        return $ocLazyLoad.load(['scripts/controllers/customer.search.js',
                            'scripts/services/customer.js',
                            'scripts/services/fields.js'
                        ]);
                    }
                ]
            }
        })
        .state('customergroup', {
            url: '/customergroup',
            templateUrl: 'tpl/customer.group.html',
            controller: 'CustomerGroupCtrl',
            resolve: {
                deps: ['$ocLazyLoad',
                    function($ocLazyLoad) {
                        return $ocLazyLoad.load(['scripts/controllers/customer.group.js',
                            'scripts/services/customer.js',
                            'scripts/services/group.js',
                            'scripts/services/fields.js'
                        ]);
                    }
                ]
            }
        })
        .state('surveyform', {
            url: '/surveyform',
            templateUrl: 'tpl/survey.form.html',
            controller: 'SurveyFormCtrl',
            resolve: {
                deps: ['$ocLazyLoad',
                    function($ocLazyLoad) {
                        return $ocLazyLoad.load(['scripts/controllers/survey.js', 'scripts/services/survey.js']);
                    }
                ]
            }
        })
        .state('aboutzfarm', {
            url: '/aboutzfarm',
            templateUrl: 'tpl/about.zfarm.html'
        })
        .state('aboutsejarah', {
            url: '/aboutsejarah',
            templateUrl: 'tpl/about.sejarah.html'
        })
        .state('aboutvisi', {
            url: '/aboutvisi',
            templateUrl: 'tpl/about.visi.html'
        })
        .state('infoinvestasi', {
            url: '/infoinvestasi',
            templateUrl: 'tpl/infoinvestasi.html'
        })
        .state('simulasiayam', {
            url: '/simulasiayam',
            templateUrl: 'tpl/simulasi.ayam.html',
            controller: 'SimulasiAyamCtrl',
            resolve: {
                deps: ['$ocLazyLoad',
                    function($ocLazyLoad) {
                        return $ocLazyLoad.load(['scripts/controllers/simulasi.ayam.js']);
                    }
                ]
            }
        })
        .state('simulasilele', {
            url: '/simulasilele',
            templateUrl: 'tpl/simulasi.lele.html',
            controller: 'SimulasiLeleCtrl',
            resolve: {
                deps: ['$ocLazyLoad',
                    function($ocLazyLoad) {
                        return $ocLazyLoad.load(['scripts/controllers/simulasi.lele.js']);
                    }
                ]
            }
        })
        .state('simulasidomba', {
            url: '/simulasidomba',
            templateUrl: 'tpl/simulasi.domba.html',
            controller: 'SimulasiDombaCtrl',
            resolve: {
                deps: ['$ocLazyLoad',
                    function($ocLazyLoad) {
                        return $ocLazyLoad.load(['scripts/controllers/simulasi.domba.js']);
                    }
                ]
            }
        })
        .state('simulasisapi', {
            url: '/simulasisapi',
            templateUrl: 'tpl/simulasi.sapi.html',
            controller: 'SimulasiSapiCtrl',
            resolve: {
                deps: ['$ocLazyLoad',
                    function($ocLazyLoad) {
                        return $ocLazyLoad.load(['scripts/controllers/simulasi.sapi.js']);
                    }
                ]
            }
        })
        .state('gallery', {
            url: '/gallery',
            templateUrl: 'tpl/gallery.html'
        })
        .state('contact', {
            url: '/contact',
            templateUrl: 'tpl/contact.html'
        })
        .state('discuss', {
            url: '/discuss',
            templateUrl: 'tpl/discuss.html'
        })
        .state('category', {
            url: '/category',
            templateUrl: 'tpl/account.category.html',
            controller: 'AccountCategoryCtrl',
            resolve: {
                deps: ['$ocLazyLoad',
                    function($ocLazyLoad) {
                        return $ocLazyLoad.load(['scripts/controllers/account.category.js', 'scripts/services/account.category.js']);
                    }
                ]
            }
        })
        .state('account', {
            url: '/account',
            templateUrl: 'tpl/account.html',
            controller: 'AccountCtrl',
            resolve: {
                deps: ['$ocLazyLoad',
                    function($ocLazyLoad) {
                        return $ocLazyLoad.load(['scripts/controllers/account.js',
                            'scripts/services/account.js',
                            'scripts/services/account.category.js',
                            'scripts/services/workspace.js'
                        ]);
                    }
                ]
            }
        })
        .state('journal', {
            url: '/journal',
            templateUrl: 'tpl/journal.html',
            controller: 'JournalCtrl',
            resolve: {
                deps: ['$ocLazyLoad',
                    function($ocLazyLoad) {
                        return $ocLazyLoad.load(['scripts/controllers/journal.js',
                            'scripts/services/journal.js',
                            'scripts/services/account.js',
                            'scripts/services/workspace.js'
                        ]);
                    }
                ]
            }
        })
        .state('journalview', {
            url: '/journalview',
            templateUrl: 'tpl/journal.view.html',
            controller: 'JournalViewCtrl',
            resolve: {
                deps: ['$ocLazyLoad',
                    function($ocLazyLoad) {
                        return $ocLazyLoad.load(['scripts/controllers/journal.view.js',
                            'scripts/services/journal.js',
                            'scripts/services/workspace.js'
                        ]);
                    }
                ]
            }
        })
        .state('ledger', {
            url: '/ledger',
            templateUrl: 'tpl/ledger.html',
            controller: 'LedgerCtrl',
            resolve: {
                deps: ['$ocLazyLoad',
                    function($ocLazyLoad) {
                        return $ocLazyLoad.load(['scripts/controllers/ledger.js',
                            'scripts/services/journal.js',
                            'scripts/services/account.js',
                            'scripts/services/workspace.js'
                        ]);
                    }
                ]
            }
        })
        .state('profile', {
            url: '/profile',
            templateUrl: 'tpl/profile.html',
            controller: 'ProfileCtrl',
            resolve: {
                deps: ['$ocLazyLoad',
                    function($ocLazyLoad) {
                        return $ocLazyLoad.load(['scripts/controllers/profile.js', 
							'scripts/services/user.js', 
							'scripts/services/company.js'
						]);
                    }
                ]
            }
        })
		.state('help', {
            url: '/help',
            templateUrl: 'tpl/help.html',
            controller: 'HelpCtrl',
            resolve: {
                deps: ['$ocLazyLoad',
                    function($ocLazyLoad) {
                        return $ocLazyLoad.load(['scripts/controllers/help.js']);
                    }
                ]
            }
        })
        .state('profilebank', {
            url: '/profilebank',
            templateUrl: 'tpl/profile.bank.html',
            controller: 'ProfileBankCtrl',
            resolve: {
                deps: ['$ocLazyLoad',
                    function($ocLazyLoad) {

                        return $ocLazyLoad.load(['scripts/controllers/profile.bank.js',
                            'scripts/services/user.js'
                        ]);
                    }
                ]
            }
        })
        .state('login', {
            url: '/login',
            templateUrl: 'tpl/login.html',
            controller: 'LoginCtrl',
            resolve: {
                deps: ['$ocLazyLoad',
                    function($ocLazyLoad) {
                        return $ocLazyLoad.load(['scripts/controllers/login.js',
                            'scripts/services/user.js',
                            'scripts/services/company.js'
                        ]);
                    }
                ]
            }
        })
        .state('register', {
            url: '/register',
            templateUrl: 'tpl/register.html',
            controller: 'RegisterCtrl',
            resolve: {
                deps: ['$ocLazyLoad',
                    function($ocLazyLoad) {
                        return $ocLazyLoad.load(['scripts/controllers/register.js', 'scripts/services/user.js']);
                    }
                ]
            }
        })
        .state('useractivation', {
            url: '/useractivation',
            templateUrl: 'tpl/useractivation.html',
            controller: 'UserActivationCtrl',
            resolve: {
                deps: ['$ocLazyLoad',
                    function($ocLazyLoad) {
                        return $ocLazyLoad.load(['scripts/controllers/useractivation.js', 'scripts/services/user.js']);
                    }
                ]
            }
        })
        .state('changepass', {
            url: '/changepass',
            templateUrl: 'tpl/changepass.html',
            controller: 'ChangepassCtrl',
            resolve: {
                deps: ['$ocLazyLoad',
                    function($ocLazyLoad) {
                        return $ocLazyLoad.load(['scripts/controllers/changepass.js', 'scripts/services/user.js']);
                    }
                ]
            }
        })
        .state('forgotpass', {
            url: '/forgotpass',
            templateUrl: 'tpl/forgotpass.html',
            controller: 'ForgotpassCtrl',
            resolve: {
                deps: ['$ocLazyLoad',
                    function($ocLazyLoad) {
                        return $ocLazyLoad.load(['scripts/controllers/forgotpass.js', 'scripts/services/user.js']);
                    }
                ]
            }
        })
});
