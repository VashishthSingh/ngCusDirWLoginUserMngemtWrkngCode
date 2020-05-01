var app = angular.module("myApp", ["ngRoute","ngCookies"]);

app.config(function($routeProvider) {
    		$routeProvider
    		.when("/", {
        		templateUrl : "userOrAdmin.html",
        		controller: "userOrAdminCtrl"
    		})
    		.when("/userLogin", {
        		templateUrl : "login.html",
        		controller: "loginController"
    		})
    		.when("/adminLogin", {
    			resolve:{
    				"check":function($location,$cookies){
    					if($cookies.get('username')==2){
    						$location.path('/menu');
    					}
    				}
    			},
        		templateUrl : "adminLogin.html",
        		controller: "loginControllerForAdmin"
    		})
    		.when("/report", {
    			resolve:{
    				"check":function($location,$cookies){
    					if($cookies.get('username')==0){
    						$location.path('/');
    					}
    				}
    			},
        		templateUrl : "index101.html",
        		controller: "myCtrl"
    		})
    		.when("/admin", {
    			resolve:{
    				"check":function($location,$cookies){
    					if($cookies.get('username')==2){
    						$location.path('/menu');
    					}
    					else if($cookies.get('username')==0){
    						$location.path('/');
    					}
    				}
    			},
        		templateUrl : "index111.html",
        		controller: "myCtrl1"
    		})
    		.when("/report1", {
    			resolve:{
    				"check":function($location,$cookies){
    					if($cookies.get('username')==0){
    						$location.path('/');
    					}
    				}
    			},
    			templateUrl : "customDirective21.html",
    			controller:"MyCtrl2"
    		})
    		.when("/menu", {
    			resolve:{
    				"check":function($location,$cookies){
    					if($cookies.get('username')==0){
    						$location.path('/');
    					}
    				}
    			},
        		templateUrl : "index7CDirLogin.html",
        		controller:"menuController"
    		})
    		.when("/addUser", {
    			resolve:{
    				"check":function($location,$cookies){
    					if($cookies.get('username')==2){
    						$location.path('/menu');
    					}
    					else if($cookies.get('username')==0){
    						$location.path('/');
    					}
    				}
    			},
        		templateUrl : "userAdd.html",
        		controller:"addUserController"
        		
    		})
    		.when("/addAdmin", {
    			resolve:{
    				"check":function($location,$cookies){
    					if($cookies.get('username')==2){
    						$location.path('/menu');
    					}
    					else if($cookies.get('username')==0){
    						$location.path('/');
    					}
    				}
    			},
        		templateUrl : "adminAdd.html",
        		controller:"addAdminController"
        		
    		})
    		.otherwise({
        		redirectTo : "/"
    		})

});

app.controller('userOrAdminCtrl',['$cookies','$window','$http','$scope','$location',function($cookies,$window,$http,$scope,$location){
	$cookies.put("username", 0);
}]);

app.controller('menuController',['$cookies','$window','$http','$scope','$location',function($cookies,$window,$http,$scope,$location){
	$scope.setDecider=true;
	if($cookies.get('username')==2){
		$scope.setDecider=false;
	}
}]);

app.controller('addUserController',['$cookies','$window','$http','$scope','$location',function($cookies,$window,$http,$scope,$location){
	
	$scope.setDeciderForUserAdd=true;
	if($cookies.get('username')==2){
		$scope.setDeciderForUserAdd=false;
	}
	
	$scope.addUserFunction=function(){
		
		var uname=$scope.username;
		var pass=$scope.password;
		console.log(uname+" "+pass);
		
		$http({
			url:"http://localhost:8080/AngularCDWLUserManagement/AddUserServlet",
			   //http://localhost:8080/AngularCDWLUserManagement/AddUserServlet
			method:"GET",
			params:{
				"userName":uname,   //$scope.username,
				"passWord":pass      //$scope.password
			}
		}).then(function(response){
			$window.alert(response.data);
		},function(response){
			$window.alert("Error");
		});
		
	};
}]);

app.controller('addAdminController',['$cookies','$window','$http','$scope','$location',function($cookies,$window,$http,$scope,$location){
	
	$scope.setDeciderForAdminAdd=true;
	if($cookies.get('username')==2){
		$scope.setDeciderForAdminAdd=false;
	}
	
	$scope.addAdminFunction=function(){
		
		var uname=$scope.username;
		var pass=$scope.password;
		console.log(uname+" "+pass);
		
		$http({
			url:"http://localhost:8080/AngularCDWLUserManagement/AddAdminServlet",
			method:"GET",
			params:{
				"userName":uname,   //$scope.username,
				"passWord":pass      //$scope.password
			}
		}).then(function(response){
			$window.alert(response.data);
		},function(response){
			$window.alert("Error");
		});
		
	};
}]);

app.controller('loginControllerForAdmin',['$cookies','$window','$http','$scope','$location',function($cookies,$window,$http,$scope,$location){
	$scope.loginForAdmin=function(){
		var uname=$scope.username;
		var pass=$scope.password;
//		var loggedInOrNot=null;

		$http({
			url:"http://localhost:8080/AngularCDWLUserManagement/AdminLoginServlet",
			method:"GET",
			params:{
				"userName":uname,   //$scope.username,
				"passWord":pass      //$scope.password
			}
		}).then(function(response){
			$scope.loggedInOrNot=response.data;
			
			console.log(response.data);
			console.log($scope.loggedInOrNot.found);
			
			//$cookies.put("username", 0);
			if($scope.loggedInOrNot.found=="yes"){
				$cookies.put("username", 1);
				$location.path('/menu');
			}
			else{
				$window.alert("Invalid Credential");
			}
		},function(response){
			$window.alert("Connection Failed");
		});
	};
}]);

app.controller('loginController',['$cookies','$window','$http','$scope','$location',function($cookies,$window,$http,$scope,$location){
	$scope.submit=function(){
		var uname=$scope.username;
		var pass=$scope.password;
//		var loggedInOrNot=null;

		$http({
			url:"http://localhost:8080/AngularCDWLUserManagement/AngularJsServlet2",
			   //http://localhost:8080/AngularCDWLUserManagement/AngularJsServlet2
			method:"GET",
			params:{
				"userName":uname,   //$scope.username,
				"passWord":pass      //$scope.password
			}
		}).then(function(response){
			$scope.loggedInOrNot=response.data;
			
			console.log(response.data);
			console.log($scope.loggedInOrNot.found);
			
			//$cookies.put("username", 0);
			if($scope.loggedInOrNot.found=="yes"){
				$cookies.put("username", 2);
				$location.path('/menu');
			}
			else{
				$window.alert("Invalid Credential");
			}
		},function(response){
			$window.alert("Connection Failed");
		});
	};
}]);		
		
app.controller('myCtrl',['$cookies','$scope','$window','$http',function($cookies,$scope,$window,$http){  // $scope , $window , $http
	
	
	$scope.setDeciderForReport=true;
	if($cookies.get('username')==2){
		$scope.setDeciderForReport=false;
	}
	
	$scope.dataArrayList=function(){

				var ramData = [];
				var diskData = [];
				var cpuData = [];
				var readDTData = [];

				var data1=$('#datetimepicker1').val();
				var data2=$('#datetimepicker2').val();
				//alert("Checking "+data1+" "+data2);

				$http({
					url:"http://localhost:8080/AngularCDWLUserManagement/AngularJsServlet1",
					method:"GET",
					params:{
						"startRange":data1,   //$scope.startRange,
						"endRange":data2      //$scope.endRange
					}
				}).then(function(response){
					$scope.JSONData=response.data.myArrayList;
					$scope.statusCode=response.status;

// 					console.log($scope.JSONData.length);
// 					console.log($scope.JSONData[0]);
// 					console.log($scope.JSONData[0].map.cpuUsed);
// 					console.log($scope.JSONData[0].map.diskUsed);
// 					console.log($scope.JSONData[0].map.ramUsed);

					var i;
					for (i = 0; i <$scope.JSONData.length; i++) {
						// Inserting values to Array
					  ramData.push($scope.JSONData[i].map.ramUsed);
					  diskData.push($scope.JSONData[i].map.diskUsed);
					  cpuData.push($scope.JSONData[i].map.cpuUsed);
					  readDTData.push($scope.JSONData[i].map.readDateAndTime);
					  //console.log($scope.JSONData[i].map.ramUsed +" "+$scope.JSONData[i].map.diskUsed);
					}

					//$window.alert(JSONData);
				},function(response){
					$window.alert("Connection Failed");
				});
				
	//--------------------------------------------------------------
		var ctx = document.getElementById("myChartRam"); 
		
		Chart.defaults.global.defaultFontFamily='Lato';
		Chart.defaults.global.defaultFontSize=18;
		Chart.defaults.global.defaultFontColor='black';	
			
		var myChart = new Chart(ctx, { 
			type: 'line',  
			data: { 
				labels: readDTData, 
				datasets: [{ 
					label: '# RAM Utilization', 
					data: ramData, 
					backgroundColor :"green", 
					borderColor: "green", 
					borderWidth : 4,
					fill: false
				},
				{
					label: '# DISK Utilization',
					data: diskData,
					backgroundColor: 'blue',
					borderColor: 'blue',
					borderWidth : 4,
					fill: false
				},
				{
					label: '# CPU Utilization',
					data: cpuData,
					backgroundColor: 'red',
					borderColor: 'red',
					borderWidth : 4,
					fill: false
				}] 
			}, 
			
			plugins: [{
				beforeLayout: function (chart) {
					chart.width = chart.canvas.width * 1.0;
					chart.options.layout.padding.left = 0;
				},
			}],
			
			options: { 
				responsive: true,
				title:{
					display:true,
					text:"RAM , DISK AND CPU UTILIZATION IN % ",
					fontSize:25
				},
				tooltips:{
					enabled:true,
					backgroundColor:"black",
					fontColor:"white"
				},
				scales: { 
					xAxes: [{
						display: true,
						ticks: { 
							beginAtZero:false 
						},
						scaleLabel: {
							display: true,
							labelString: 'DATE_AND_TIME'
						}
					}],
					yAxes: [{
						display: true,
						ticks: { 
							beginAtZero:false 
						},
						scaleLabel: {
							display: true,
							labelString: 'READINGS'
						}
					}] 
				} 
			} 
		});
	//--------------------------------------------------------------
		    
				
			}//end of function
		
			$('#datetimepicker1').datetimepicker({
				format: 'Y-m-d H:i:i',
				formatTime: 'H:i:i',
				formatDate: 'Y-m-d',
				step: 30
			});
			$('#datetimepicker2').datetimepicker({
				format: 'Y-m-d H:i:i',
				formatTime: 'H:i:i',
				formatDate: 'Y-m-d',
				step: 30
			});
				
}]);

app.controller('myCtrl1',['$cookies','$scope','$window','$http',function($cookies,$scope,$window,$http){  // $scope , $window , $http
			
	$scope.setDeciderForAdmin=true;
	if($cookies.get('username')==2){
		$scope.setDeciderForAdmin=false;
	}
	
	$scope.startBtn=function(){
				$http({
					url:"http://localhost:8080/AngularCDWLUserManagement/StartFetchingData",
					method:"GET",
				}).then(function(response){
					$scope.statusCode=response.status;
				},function(response){
					$window.alert("Connection Failed");
				});
			}

			$scope.stopBtn=function(){
				$http({
					url:"http://localhost:8080/AngularCDWLUserManagement/StopFetchingData",
					method:"GET",
				}).then(function(response){
					$scope.statusCode=response.status;
				},function(response){
					$window.alert("Connection Failed");
				});
			}
}]);

app.directive('mydirc',['$http','$window',function($http,$window) {
    return {
        restrict: 'EAC',
        scope: false,  // false , true , {}
        link: function($scope) {
            $scope.clickMe= function() {
                //alert('inside click');

              //---------- Plotting Graph ----------------------------------------------------
                var ctx = document.getElementById("myChartRam"); 

                Chart.defaults.global.defaultFontFamily='Lato';
                Chart.defaults.global.defaultFontSize=18;
                Chart.defaults.global.defaultFontColor='black';	
                	
                var myChart = new Chart(ctx, { 
                	type: 'line',  
                	data: { 
                		labels: $scope.readDTData, 
                		datasets: [{ 
                			label: '# RAM Utilization', 
                			data: $scope.ramData, 
                			backgroundColor :"green", 
                			borderColor: "green", 
                			borderWidth : 4,
                			fill: false
                		},
                		{
                			label: '# DISK Utilization',
                			data: $scope.diskData,
                			backgroundColor: 'blue',
                			borderColor: 'blue',
                			borderWidth : 4,
                			fill: false
                		},
                		{
                			label: '# CPU Utilization',
                			data: $scope.cpuData,
                			backgroundColor: 'red',
                			borderColor: 'red',
                			borderWidth : 4,
                			fill: false
                		}] 
                	}, 
                	
                	plugins: [{
                		beforeLayout: function (chart) {
                			chart.width = chart.canvas.width * 1.0;
                			chart.options.layout.padding.left = 0;
                		},
                	}],
                	
                	options: { 
                		responsive: true,
                		title:{
                			display:true,
                			text:"RAM , DISK AND CPU UTILIZATION IN % ",
                			fontSize:25
                		},
                		tooltips:{
                			enabled:true,
                			backgroundColor:"black",
                			fontColor:"white"
                		},
                		scales: { 
                			xAxes: [{
                				display: true,
                				ticks: { 
                					beginAtZero:false 
                				},
                				scaleLabel: {
                					display: true,
                					labelString: 'DATE_AND_TIME'
                				}
                			}],
                			yAxes: [{
                				display: true,
                				ticks: { 
                					beginAtZero:false 
                				},
                				scaleLabel: {
                					display: true,
                					labelString: 'READINGS'
                				}
                			}] 
                		} 
                	} 
                });
                //-----------End Of Plotting Graph---------------------------------------------------

            }//end of clickMe()

        }//end of link function

    };//end of return

}]);//end of directive


app.controller('MyCtrl2',['$cookies','$scope','$window','$http',function($cookies,$scope,$window,$http){  
	
	$scope.setDeciderForReport1=true;
	if($cookies.get('username')==2){
		$scope.setDeciderForReport1=false;
	}
	
	$scope.getRangeAndData=function(){
		$scope.data11=$('#datetimepicker11').val();
		$scope.data22=$('#datetimepicker22').val();
		//Printing Ranges On Console
	    console.log($scope.data11+" "+$scope.data22);
	    
		$scope.ramData = [];
		$scope.diskData = [];
		$scope.cpuData = [];
		$scope.readDTData = []; 
		
		$http({
			url:"http://localhost:8080/AngularCDWLUserManagement/AngularJsServlet1",
			   //http://localhost:8080/AngularFirst/AngularJsServlet1
			method:"GET",
			params:{
				"startRange":$scope.data11,   //$scope.startRange,
				"endRange":$scope.data22     //$scope.endRange
			}
		}).then(function(response){
			$scope.JSONData=response.data.myArrayList;
			$scope.statusCode=response.status;

			var i;
			for (i = 0; i <$scope.JSONData.length; i++) {
				// Inserting values to Array
				$scope.ramData.push($scope.JSONData[i].map.ramUsed);
				$scope.diskData.push($scope.JSONData[i].map.diskUsed);
				$scope.cpuData.push($scope.JSONData[i].map.cpuUsed);
				$scope.readDTData.push($scope.JSONData[i].map.readDateAndTime);
			}
		},function(response){
			$window.alert("Connection Failed");
		});
		
		// Printing data on console
		console.log($scope.ramData);
		console.log($scope.diskData);
		console.log($scope.cpuData);
		console.log($scope.readDTData);
	    
	}//end of function
	
	$('#datetimepicker11').datetimepicker({
		format: 'Y-m-d H:i:i',
		formatTime: 'H:i:i',
		formatDate: 'Y-m-d',
		step: 30
	});
	
	$('#datetimepicker22').datetimepicker({
		format: 'Y-m-d H:i:i',
		formatTime: 'H:i:i',
		formatDate: 'Y-m-d',
		step: 30
	});	
	
}]);

		