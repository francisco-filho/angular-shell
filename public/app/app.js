(function(){
    'use strict';

    angular.module('myApp', [])
        .controller('MainCtrl', function($scope){
            var model = this;
            model.order = 'name'
            model.reverse = false;
            model.items = [
                {id: 1, name: 'francisco'},
                {id: 2, name: 'julia'},
                {id: 3, name: 'vany'},
                {id: 4, name: 'fernandinho'}
            ]
        })
        .directive('ddOrdered', function($parse){
            return {
                restrict: 'A',
                scope: true, 
                controller: function($scope, $element, $attrs){
                    $scope.reverseAttr = $parse($attrs.modelReverse);
                    $scope.orderAttr = $parse($attrs.modelOrder);

                    this.reverseOrder = function(){
                        var r = $scope.reverseAttr($scope);
                        $scope.reverseAttr.assign($scope, !r);
                    }
                    this.orderBy = function(name){
                        var r = $scope.orderAttr($scope);
                        $scope.orderAttr.assign($scope,name);
                        if (name != $scope.reverseAttr($scope)){
                            this.reverseOrder();
                        }
                        $scope.$apply();
                    }
                    this.getCssClass = function(){
                        return $scope.reverseAttr($scope) ? 'desc' : 'asc';
                    }
                }
            }
        })
        .directive('ddOrderBy', function($timeout){
            return {
                restrict: 'A',
                require: '^ddOrdered',
                link: function(scope, el, attr, ctrl){
                    updateClasses();

                    el.on('click', function(){
                        ctrl.orderBy(attr.ddOrderBy);
                        updateClasses();
                    });

                    function updateClasses(){
                        el.closest('thead').find('th')
                            .removeClass('order')
                            .removeClass('asc')
                            .removeClass('desc');
                        el
                            .addClass('order')
                            .addClass(ctrl.getCssClass());
                    }
                }
            }
        });
})();
