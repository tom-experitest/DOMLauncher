function applistCallback(appList){	
		//Parse the appList
		appListArray = JSON.parse(appList);
		//For each item in the JSON Array
			//@ appName - Application Name ('DOMLauncher')
			//@ appLaunch - Package class name ('com.awaa.domlauncher')
			//@ appActivity - Acivity Intent ('.DialtactsContactsEntryActivity')
			$appPanel = $('.appPanel_Content');
			$appPanel.empty();
		$.each(appListArray, function(e) {
			 appName = this.name
			 appLaunch = this.package
			 appActivity = this.intent
			
			if(this.package === "com.android.settings"){
				$appPanel.append('<div class="app" appLaunch="com.android.settings" appActivity=".Settings" appName="'+appName+'"><span>'+appName+'</span></div>');
				$appPanel.append('<a href="tel:" class="app dialer" appName="default_Dialer"><span>Dialer</span></a>');
			}else if(this.package === "com.android.contacts"){
				$appPanel.append('<div class="app" appLaunch="com.android.contacts" appActivity=".DialtactsContactsEntryActivity" appName="'+appName+'"><span>'+appName+'</span></div>');
			}else{
				$appPanel.append('<div class="app" appLaunch="'+appLaunch+'" appActivity="'+appActivity+'" appName="'+appName+'"><span>'+appName+'</span></div>');
			}
			 appName = null
			 appLaunch = null
			 appActivity = null
		});
		appListArray = null;
		$appPanel = null
}

/*Clock CSS
	http://css-tricks.com/css3-clock/
	PUBLISHED NOVEMBER 17, 2008
	Toby Pitman http://www.tobypitman.com/
	Modified by Aricwithana
*/

//@ clockTimer - Nulls the setInterval object.
//@ clockSec, clockHour, clockMin - Caches repeatedly Called DOM element.
	clockTimer = null;
	$clockSec = $("#sec");
	$clockHour = $("#hour");
	$clockMin = $("#min");
	
function clock() {
	date = new Date();
	mins = date.getMinutes();
	
	$clockSec.css({"-webkit-transform" : "rotate(" + date.getSeconds() * 6 + "deg)"});
	$clockHour.css({"-webkit-transform" : "rotate(" + date.getHours() * 30 + (mins / 2) + "deg)"});
	$clockMin.css({"-webkit-transform": "rotate(" + mins * 6 + "deg)"});
	
	date = null;
	mins = null;
}






/*Switches Widget Plugin
*	This plugin creates native-like switches.  Each element with the secified class
*		and correct DOM structure will create a working switch.  There is no 'universal'
*		Widget solution for every theme.  It should be customized.
*/
function switches(){
	$( ".switch>div:first-child" ).each(function(){
		$(this).draggable({containment: "parent",distance:0,
			create: function( event, ui ) {},
			stop: function( event, ui ) {
				handle = $(this); //Switch Handle
				switchID = $(handle).parent('.switch').attr('id');
				handlePOS =  parseInt($(handle).css('left'))
				
				//Controls the switch state response on touch end.  Animates and called the switchCallback function passing its state and switch ID.
				if(handlePOS >= 49){if(handlePOS != 100){$(handle).animate({left:'100px'}, 250).addClass('on');}  switchCallback({state:"on", id:switchID});}
				if(handlePOS <= 50){$(handle).animate({left:'0px'}, 250).removeClass('on'); switchCallback({state:"off", id:switchID});}	  
				
				handlePOS = null;
				switchID = null;
				handle = null;
				
			},
			drag: function( event, ui ) {  
				handle = $(this); //Switch Handle
				handlePOS = parseInt($(handle).css('left'));
				
				//Controls the switch state response while dragging.  
				if( handlePOS >= 49  && $(handle).hasClass('on') == false){$(handle).addClass('on'); }
				if(handlePOS <= 50 && $(handle).hasClass('on') == true){$(handle).removeClass('on');}  
				//Prevents the screen scroll while interacting with a switch.
				$('#slider>ul, #slider, #slider>ul>li').on('touchmove', function(e){e.stopPropagation();});   
				
				handlePOS = null;
				handle = null;
			}
		});
	});
}

//Switch Widget Callback
	//@ switchID - ID of the switch
	//@ state - Current end state of the switch
function switchCallback(args){
	switchID = args.id || null;
	state = args.state || null;
	
	/*Begin Theme Specific Editible Code*/
		if(switchID === "toggle_fullScreen"){ 
			//Toggle Full Screen Call Function
				// @ toggleStatusbar({}) - Just call it, the app restarts with full screen toggled on or off.
				//Also accepts {check:"true"} to just check the if the app is fullscreen or not.
			toggleStatusbar({}); 
		}
		
		//Toggle Wifi Call Function
			// @ toggleWifi({}) - Call Function
			// @ {check:"on/off"} - Sets the state of the Wifi Connection.
				//Also accepts {check:"true"} to just check the current wifi connection state.
				//Also accepts {state:"toggle"} to just toggle the connection.
			//The plugin automatically creates a listener for the signal value which requires a callback function provided below.
		if(switchID === "toggle_wifi" && state === "on"){
			toggleWifi({state:"on"});
		}
		if(switchID === "toggle_wifi" && state === "off"){
			toggleWifi({state:"off"});
		}
		
		//Toggle Data Call Function
			// @ toggleData({}) - Call Function
			// @ state - Sets the state of the Data Connection.
				//Also accepts {check:"true"} to just check the current Data connection state.
				//Also accepts {state:"toggle"} to just toggle the connection.
		if(switchID === "toggle_data" && state === "off"){
			toggleData({state:"off"});
		}
		if(switchID === "toggle_data" && state === "on"){
			toggleData({state:"on"});
		}
	/*End Theme Specific Editible Code*/
}	
	

//Fullscreen Toggle Callback
	// @ returnVal - returns boolean true/false depending on if the app is full screen or not.
function fullscreentoggleCallback(args){
	returnVal = args.returnVal
	/*Begin Theme Specific Editible Code*/
		if(returnVal != true){
			$('#toggle_fullScreen>div:first-child').css('left', '0px').removeClass('on');
		}else{
			$('#toggle_fullScreen>div:first-child').css('left', '100px').addClass('on');
		}
	/*End Theme Specific Editible Code*/
}



//Wifi Toggle Callback
	// @ check - returns the boolean true/false if the function is just being used to check information.
	// @ returnVal - returns boolean true/false depending on if the data connection is on or off.
	// @ state - returns the state on/off/toggle that was supplied in the original call.
function togglewifiCallback(args){
	 check = args.check
	 returnVal = args.returnVal
	 state = args.state
	
	/*Begin Theme Specific Editible Code*/
		if(returnVal === true && $('#toggle_wifi>div:first-child').hasClass('on') === false){
			$('#toggle_wifi>div:first-child').animate({left: '100px'}, 250).addClass('on');
		}
		if(returnVal === false && $('#toggle_wifi>div:first-child').hasClass('on') === true){
			$('#toggle_wifi>div:first-child').animate({left: '0px'}, 250).removeClass('on');
		}
		//Until there is a 'state listener' for when connections turn on and off, this timeout is needed to correctly respond to if the data connecton is active or not.
		setTimeout(function(){toggleData({check:"true"});}, 10000);
	/*End Theme Specific Editible Code*/
}



//Data Toggle Callback
	// @ check - returns the boolean true/false if the function is just being used to check information.
	// @ returnVal - returns boolean true/false depending on if the data connection is on or off.
function toggledataCallback(args){
	 returnVal = args.returnVal
	 check = args.check
	 state = args.state 
	 
	/*Begin Theme Specific Editible Code*/
		if(returnVal === true && $('#toggle_data>div:first-child').hasClass('on') === false){
			$('#toggle_data>div:first-child').animate({left: '100px'}, 250).addClass('on');
		}
		if(returnVal === false && $('#toggle_data>div:first-child').hasClass('on') === true){
			$('#toggle_data>div:first-child').animate({left: '0px'}, 250).removeClass('on');
		}
	/*End Theme Specific Editible Code*/
}








//Wifi Signal Callback - A REQUIRED FUNCTION IF WIFI CONTROLS PLUGIN IS USED.
	// @ returnVal - returns a negative integer, -dBm
	// Since people in the past have bickered about the correctness
	// 		of the displayed signal value, any user can decide for 
	//		themselves to remove any chance of complaint.
	// @ wifiChange() - Sends the converted number (conversion is based 
	// 		on desired users wants) to the function that changes the UI.
	//		This was done to simply the code, not a neccessary thing.
	//	This function is called directly from within the Cordova API Java Plugin.
	//		DO NOT CHANGE THE FUNCTION CALL BACK NAMESPACE!
	// @ meterwifiBar - Caches repeatedly Called DOM element.
	// @ meterwifiLabel - Caches repeatedly Called DOM element.
		$meterwifiBar = $('#meter_Wifi').children('div');
		$meterwifiLabel = $('#meter_Wifi').siblings('div');
function wifisignalCallback(strengthDbm){
	
	/*Begin Theme Specific Editible Code*/
		if (strengthDbm <= -97.75) { wifiChange(0); 
		} else if (strengthDbm > -97.75 && strengthDbm <= -95.5) { wifiChange(5);  
		} else if (strengthDbm > -95.5 && strengthDbm <= -93.25) { wifiChange(10);
		} else if (strengthDbm > -93.25 && strengthDbm <= -91) { wifiChange(15);
		} else if (strengthDbm > -91 && strengthDbm <= -88.75) { wifiChange(20);
		} else if (strengthDbm > -88.75 && strengthDbm <= -86.5) { wifiChange(25);
		} else if (strengthDbm > -86.5 && strengthDbm <= -84.25) { wifiChange(30);
		} else if (strengthDbm > -84.25 && strengthDbm <= -82) { wifiChange(35);
		} else if (strengthDbm > -82 && strengthDbm <= -79.75) { wifiChange(40);
		} else if (strengthDbm > -79.75 && strengthDbm <= -77.5) { wifiChange(45);
		} else if (strengthDbm > -77.5 && strengthDbm <= -75.25) { wifiChange(50);
		} else if (strengthDbm > -75.25 && strengthDbm <= -73) { wifiChange(55);
		} else if (strengthDbm > -73 && strengthDbm <= -70.75) { wifiChange(60);
		} else if (strengthDbm > -70.75 && strengthDbm <= -68.5) { wifiChange(65);
		} else if (strengthDbm > -68.5 && strengthDbm <= -66.25) { wifiChange(70);
		} else if (strengthDbm > -66.25 && strengthDbm <= -64) { wifiChange(75);
		} else if (strengthDbm > -64 && strengthDbm <= -61.75) { wifiChange(80);
		} else if (strengthDbm > -61.75 && strengthDbm <= -59.5) { wifiChange(85);
		} else if (strengthDbm > -59.5 && strengthDbm <= -57.25) { wifiChange(90);
		} else if (strengthDbm > -57.25 && strengthDbm <= -55) { wifiChange(95);
		} else if (strengthDbm > -55) { wifiChange(100);
		}	
	/*End Theme Specific Editible Code*/
}
	//Used with the Wifi Signal Callback Function.
	function wifiChange(percentage){
		$meterwifiLabel.text('Wifi Signal: ' + percentage + '%');
		$meterwifiBar.css('width', percentage + '%');
	}



//Cellular Signal Callback
	// @ strengthDbm - returns a negative integer, -dBm
	// Since people in the past have bickered about the correctness
	// 		of the displayed signal value, any user can decide for 
	//		themselves to remove any chance of complaint.
	// @ cellsignalChange() - Sends the converted number (conversion is based 
	// 		on desired users wants) to the function that changes the UI.
	//		This was done to simply the code, not a neccessary thing.
	//
	//	This function is called directly from within the Cordova API Java Plugin.
	//		DO NOT CHANGE THE FUNCTION CALL BACK NAMESPACE!
		// @ object_datawifiSignal 
	$metercellularBar = $('#meter_Cellular').children('div');
	$metercellularLabel = $('#meter_Cellular').siblings('div');
	
function cellsignalCallback(strengthDbm){
	/*Begin Theme Specific Editible Code*/
		if (strengthDbm <= -97.75) { cellsignalChange(0); 
		} else if (strengthDbm > -97.75 && strengthDbm <= -95.5) { cellsignalChange(10);  
		} else if (strengthDbm > -95.5 && strengthDbm <= -93.25) { cellsignalChange(20);
		} else if (strengthDbm > -93.25 && strengthDbm <= -91) { cellsignalChange(30);
		} else if (strengthDbm > -91 && strengthDbm <= -88.75) { cellsignalChange(40);
		} else if (strengthDbm > -88.75 && strengthDbm <= -86.5) { cellsignalChange(50);
		} else if (strengthDbm > -86.5 && strengthDbm <= -84.25) { cellsignalChange(60);
		} else if (strengthDbm > -84.25 && strengthDbm <= -82) { cellsignalChange(70);
		} else if (strengthDbm > -82 && strengthDbm <= -79.75) { cellsignalChange(80);
		} else if (strengthDbm > -79.75 && strengthDbm <= -77.5) { cellsignalChange(90);
		} else if (strengthDbm > -77.5 && strengthDbm <= -75.25) { cellsignalChange(100);
		}
	/*End Theme Specific Editible Code*/
}
	//Used with the Cellular Signal Callback Function.
	function cellsignalChange(percentage){
		$metercellularLabel.text('Cellular Signal: ' + percentage + '%');
		$metercellularBar.css('width', percentage + '%');
	}



//Battery Level Receiver 
	// @.isPlugged - boolean true/false if the device is plugged in.
	// @ .level - integer 0-100, battery level value
	// @ info  - MUST be used as the callback Variable!  This is a Cordova requirement, not mine.
	$meterbatteryBar = $('#meter_Battery').children('div');
	$meterbatteryLabel = $('#meter_Battery').siblings('div');
	
function batterylevelCallback(info){ 
	/*Begin Theme Specific Editible Code*/
		if(info.isPlugged != false){
			$meterbatteryLabel.text('Battery Charging:  '+info.level+'%');  
			$meterbatteryBar.css('width', info.level + '%');
		}else{
			$meterbatteryLabel.text('Battery Level:  '+info.level+'%'); 
			$meterbatteryBar.css('width', info.level + '%');
		}
	/*End Theme Specific Editible Code*/
}





    // Handle the pause event
    function onPause() {
		clearInterval(clockTimer);
	}

	
	// Handle the resume event
	function onResume() {
		clockTimer = setInterval(clock, 1000);
	}