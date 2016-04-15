angular.module('app', [])

.config('$ocLazyLoadProvider', function($ocLazyLoadProvider) {
    $ocLazyLoadProvider.config({
        debug: true,
        events: true,
        modules: [{
            name: 'foods',
            files: ['scripts/controllers/foods.js', 'scripts/services/item.js']
        }]
    });
});