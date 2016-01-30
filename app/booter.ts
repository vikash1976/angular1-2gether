/// <reference path="../typings/typescript/typescript.d.ts" />
/// <reference path="../typings/angularjs/angular.d.ts" />

//import * as angular from 'angular';
//import {UpgradeAdapter} from 'angular2/upgrade';

import {HeroDetailComponent} from './components/hero-detail.component';
import {bootstrap}    from 'angular2/platform/browser'
import {Adder} from './components/adder';
import {adapter} from './adapter';
import {NameServiceA2} from './components/name.service';

console.log(adapter['yuhi']);
export let appModule = angular
    .module('app', []);
    
    appModule.controller('MainController', function(nameService, NameServiceA2){
        this.message = "AngularJS 1 and 2 co-existing, consuming each others features, Typscript and SystemJs";
        this.hero = {name: 'VP', id: 707};
        this.simple = "A Message from Angular1 to "; // a simple text to A2 component
        this.operands = {
            operand1: 10,
            operand2: 20
        }; //// an object to A2 component
        this.increment = function(){
            //this changes the model on A1's side which changes the model of the property of 
            //A2 component and triggers change at A2 side.
            this.operands.operand1 += 2;
            this.operands.operand1 += 1;
        };
        //its own A1 directive data
        this.price = 121.89;
        this.tick = 'TCS';
        this.prevClosePrice = 156.7;
        
        this.myFullName = nameService.getFullName(); // consuming A1 service
        this.myFullNameFromA2 = NameServiceA2.getFormalFullName(); //consuming A2 service
    });
    
//downgraded A2's components as directive
appModule.directive('myHeroDetail', adapter.downgradeNg2Component(HeroDetailComponent));
appModule.directive('adder', adapter.downgradeNg2Component(Adder));

//added and downgraded A2's service
adapter.addProvider(NameServiceA2);
appModule.factory('NameServiceA2', adapter.downgradeNg2Provider(NameServiceA2));

//A1's directive
appModule.directive('priceRecord', PriceRecord);
function PriceRecord(){
    return {
        restrict: 'E',
        templateUrl: './app/simpleDirective.html',
        //replace: true,
        scope: {
            price: "=",
            stock: "@",
            lastPrice: "@"
        },
        transclude: true,
        controller: SimpleDirectiveCtrl
    }
};
//Directive's controller
appModule.controller('SimpleDirectiveCtrl', SimpleDirectiveCtrl);
SimpleDirectiveCtrl.$inject = ['$scope', '$log']; 
function SimpleDirectiveCtrl($scope, $log){
                              
           $log.info('Price for: '+ $scope.stock + ' is: '+ $scope.last);                   
}

//A1's service
appModule.service('nameService', function(){
    this.fname = "Vikash";
    this.lname = "Pandey";
    
    this.getFullName = function(){
        return this.fname + ' ' + this.lname;
    }
});
//A1's service upgraded to be consumed by A2's component
adapter.upgradeNg1Provider('nameService');

//boot strap the app
adapter
    .bootstrap(document.documentElement, ['app']);