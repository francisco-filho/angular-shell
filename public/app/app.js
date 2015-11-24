(function(){
    'use strict';

    angular.module('myApp', [])
    .controller('signupController', signupController)
    .directive('ensureUnique', function($timeout){
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function(scope, el, attrs, ctrl){
                if (!ctrl) return;
                scope.$watch(attrs.ngModel, function(value){
                    $timeout(function(){
                        if (value == 'chico'){
                            ctrl.$setValidity('unique',true);
                        } else {
                            ctrl.$setValidity('unique', false);
                        }
                    },0);
                });
            }
        }
    });

    function signupController($scope){
        $scope.submitted = false;

        $scope.signupForm = function(){
            console.log('submitting...')
            if ($scope.signup_form.$valid){
                console.info('Form valid')
            } else {
                $scope.submitted = true;
            }
        }
    }
})();
