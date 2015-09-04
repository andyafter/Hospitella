/**
 * Created by andypan on 19/8/15.
 */
// here is the controller simply for add hospital stuff
var urlHead = "http://10.10.2.174:5000/";

/*
var paramlist = ["id","name","aviva_code","zone",
    "estate", "address1","address2",
    "postal","telephone","fax","weekday",
    "saturday","sunday","public_holiday","remarks"];
*/
var paramlist = ['name','ic_num','queue_num','phone_num']
angular.module('starter.registration', [])
/// for add tab
.controller('AddCtrl', function($scope,$http) {
    $scope.name="andyafter";
    $scope.paramlist = paramlist;
});