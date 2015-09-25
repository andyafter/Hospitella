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
.controller('AddCtrl', function($scope, $http) {
    $scope.name="andyafter";
    $scope.paramlist = paramlist;
    $scope.initadd = function () {
        console.log("blabla");
    }    

    $scope.register = function(formData){
        console.log(formData.name);
        $http.post(urlHead+'registration', formData).success(function(data) {
            if(data) {
                //alert(data);

                if('error' in data){
                    alert(data.error);

                }
                else{
                    data = data.success;
                    var card = document.getElementById("patientcard");
                    card.style.display="block";
                    var pname = document.getElementById('patientname');
                    var pic = document.getElementById('icnum');
                    var pphone= document.getElementById('phonenum');
                    var pdoctor = document.getElementById('doctor');
                    pname.innerHTML ="Name: " + data.name;
                    pic.innerHTML = "IC Number: " + data.ic_num;
                    if('phone_num' in data){
                        pphone.innerHTML = "Phone Number:" + data.phone_num;
                    }

                    pdoctor.innerHTML = "Doctor: " + data.doctor;

                }


            } else {
                deferred.reject(data);
            }
        }).error(function(error) {
            deferred.reject(error);
        });

    }



});