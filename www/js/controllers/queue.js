/**
 * Created by andypan on 21/8/15.
 */
var posturl = "http://10.10.2.174:5000/";
angular.module('starter.queue', [])

.controller('QueueCtrl', function($scope,$ionicHistory,$compile,$http,AllClinicsService, ClinicNameService, URLService, LocationService) {
    //console.log(device.uuid);     //// this can be used to get device uuid
    $scope.snippet="";

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

        serverurl = URLService.getURL();
        var postData = {
            id: ClinicNameService.clinicId.toString(),
        };



        $http.get(posturl+'doctors/'+postData.id).
        then(function(response) {
            data = response.data;
            ClinicNameService.doctors = data;
        }, function(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            console.log("error");
        });

    };
    $scope.create = function() {
        /* $location.path('/tab/newpost'); */   /* this variant doesn't work */
        $state.go("/tab/queue");


    };

    $scope.queue = function(){
        var icnum = document.getElementById("icnum");
        var doctor = document.getElementById("doctor");
        dname = doctor.value;
        var flag = false;
        for(i in ClinicNameService.doctors){
            if (ClinicNameService.doctors[i] == dname){
                flag=true;
            }
        } 
        for(i in ClinicNameService.queues){
            q = ClinicNameService.queues[i];
            if(q.doctor==dname && q.icnum == icnum.value && q.clinic == ClinicNameService.clinicName){
                flag=false;
            }
        }
        if(flag){   
            var card = document.getElementById("queuecard");
            card.style.display = "block";
            var header = document.getElementById("queueheader");
            var text = document.getElementById("queuetext");
            var footer = document.getElementById("queuefooter");
            header.innerHTML = "Doctor "+dname;
            text.innerHTML = "IC Number: " + icnum.value;
            footer.innerHTML = ClinicNameService.clinicName;

            var temp = {};
            temp.doctor=dname;
            temp.icnum =icnum.value;
            temp.clinic = ClinicNameService.clinicName;
            /*$scope.snippet += '<div class="card" id="queuecard">
            <div class="item item-divider" >
               
            </div>
            <div class="item item-text-wrap" >
            </div>
            <div class="item item-divider" >
            </div>
        </div>';*/
            ClinicNameService.queues.push(temp);

        } else{
            alert("No Doctor Named Like This! Or Already Queued");
        }

    }
    $scope.backToMap = function() {
        $ionicHistory.goBack();
    };

})
