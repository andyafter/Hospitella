/**
 * Created by andypan on 21/8/15.
 */
var posturl = "http://10.10.2.174:5000/";
angular.module('starter.queue', [])

.controller('QueueCtrl', function($scope,$ionicHistory,$compile,$http) {
    //console.log(device.uuid);     //// this can be used to get device uuid
    $scope.initialize = function(){
        //document.getElementById("testpage").innerHTML = device.uuid;
        // now everything is okay
        //var a = localStorage.getItem("firstname");
        //localStorage.setItem("firstname", "Andy");
        //var d = new Date();
        //console.log(Date.now());   time stamp
        //a = Date.now().toString();
        //console.log(a);
        //console.log(parseInt(a));
        // you can now add something here for the creation part
        //var content = '<div class="card"> <div class="item item-text-wrap">This is a basic Card.</div> </div>';
        //var compiled =


        var postData = {
            'clinic_name':'RIDGEWOOD MEDICAL CLINIC',
            'uuid':device.uuid
        };
        $http.post(posturl+'queue', postData).success(function(data) {
            if(data) {
                //alert(data);
                var cardcont = "";
                var header = document.getElementById("queueheader");
                var text = document.getElementById("queuetext");
                var footer = document.getElementById("queuefooter");
                cardcont = "Queue Number: " + data['queue_num'];
                header.innerHTML = cardcont;
                cardcont = "Your Doctor is: " + data['doctor'];
                text.innerHTML = cardcont;
                cardcont = "Your Key: " + data['key'];
                footer.innerHTML = cardcont;

                deferred.resolve(data);
            } else {
                deferred.reject(data);
            }
        }).error(function(error) {
            deferred.reject(error);
        });
        var card = document.getElementById("queuecard");
        card.style.display = "block";
        // this part is the dirty code.
    };
    $scope.create = function() {
        /* $location.path('/tab/newpost'); */   /* this variant doesn't work */
        $state.go("/tab/queue");


    };
    $scope.backToMap = function() {
        $ionicHistory.goBack();
    };

})
