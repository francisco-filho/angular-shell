(function(){
    'use strict';

    angular.module('myApp', ['ngAnimate'])
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

            model.micropolo = {
                nome: 'BA1',
                logado: false
            };

            model.toggle = function(){
                model.micropolo.logado = !model.micropolo.logado;
            }
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
                        if (name == r){
                            this.reverseOrder();
                        }
                        $scope.$apply();
                    }
                    this.getCssClass = function(){
                        return $scope.reverseAttr($scope) ? 'desc' : 'asc';
                    }
                    this.getOrder = function(){
                        return $scope.orderAttr($scope);
                    }
                }
            }
        })
        .directive('ddOrderBy', function($parse, $timeout){
            return {
                restrict: 'A',
                require: '^ddOrdered',
                link: function(scope, el, attr, ctrl){
                    updateClasses(true);
                    el.on('click', function(){
                        ctrl.orderBy(attr.ddOrderBy);
                        updateClasses();
                    });

                    function updateClasses(test){
                        if (test && ctrl.getOrder() != attr.ddOrderBy ) return; 
                        el.closest('tr').find('th')
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
