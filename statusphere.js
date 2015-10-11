if (Meteor.isClient) {
	Meteor.call("Weather");

  
  Router.route('/', function () {
	this.render('home');
	});
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    var everyMinute = new Cron(function() {
	    Meteor.call("Weather");
        console.log("another minute has passed!");
    }, {});
    
  });
  
  Meteor.methods({
	Weather: function () {
	var temp = 0
		Meteor.call("getTemperature", function(error, results) {
		       temp = JSON.parse(results.content).list[0].temp.day;
		});
		console.log(temp);
		Meteor.call("changeForecast", getTempColor(temp));
		
	},
	
	getTemperature: function () {
	var city = Meteor.settings.city;
  		this.unblock();
  		try {
    		var result = HTTP.call("GET", "http://api.openweathermap.org/data/2.5/forecast/daily",
                           {params: {
	                           q: city + ',us',
	                           APPID: Meteor.settings.openWeatherAPIkey,
	                           units: 'imperial'
	                           }});
			return result;
  		} catch (e) {
			return false;
  		}
	},
	
	changeForecast: function (color) {
  		this.unblock();
  		try {
    		var result = HTTP.call("POST", "https://api.particle.io/v1/devices/"+Meteor.settings.particleDeviceID+"/setColor",
                           {params: {
	                           arg: color,
	                           access_token: Meteor.settings.particleAccessToken
	                           }});
			return true;
  		} catch (e) {
			return false;
  		}
	}
  });
}

function getTempColor(temp){
	red = 255;
	blue = 255;
	
	
	temp = Math.round(temp);
	if(temp > 50){
		blue -= (temp - 50) * 5;
	}
	else if(temp < 50){
		blue -= (50 - temp) * 5; 
	}
	
	return red +',0,'+blue;
}

