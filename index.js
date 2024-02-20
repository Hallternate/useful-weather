
var flag = localStorage.getItem('flag');
console.log("flag: " + flag);




document.addEventListener('DOMContentLoaded', function() {
    var globalHour;
    var globaltempSun = 5600;
    var globalCurrentTemp;
    var sunRise;
    var globalPunctTime;
    var globalTempInSuns;
    var F ;
    
    console.log(F);
    // Fetch current time from World Time API
    var worldTimeUrl = 'https://worldtimeapi.org/api/ip';

    fetch(worldTimeUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            var currentTime = new Date(data.datetime);
            globalHour = currentTime.getHours();
            console.log("Current hour:", globalHour);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });

    // Fetch weather data from Open Meteo API
    var weatherUrl = "https://api.open-meteo.com/v1/forecast?latitude=43.0731&longitude=-89.4012&hourly=temperature_2m,rain,weather_code&daily=sunrise,sunset&timezone=America%2FChicago&forecast_days=1";

    fetch(weatherUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            var hourlyTemperature = data.hourly.temperature_2m;
            var dailySunrise = data.daily.sunrise;
            var dailySunset = data.daily.sunset;
        console.log(hourlyTemperature)

            // Parse the string into a Date object
            dailySunrise = new Date(dailySunrise);
        dailySunset = new Date(dailySunset);

            // Extract the hour and minutes from the Date object
            var hour = dailySunrise.getHours();
            var minutes = dailySunrise.getMinutes();
        
        var hourrise = dailySunrise.getHours();
            var minutesrise = dailySunrise.getMinutes();
        
        
        var hourset = dailySunset.getHours();
            var minutesset = dailySunset.getMinutes();

            // Output the military time
            console.log("dailySunrise:", hour + ":" + minutes);

            // Calculate sunrise time in minutes
            sunRise = minutes + hour * 60;
            console.log("sunRise:", sunRise);

            // Calculate punctTime
            
            globalPunctTime = sunRise / 15;
            console.log("globalPunctTime:", globalPunctTime);

            // Retrieve the current temperature based on the global hour
            globalCurrentTemp = hourlyTemperature[globalHour - 2];
            console.log("Hourly temperature:", globalCurrentTemp);
        
            F =  globalCurrentTemp * 9 / 5 + 32;
        console.log("F", dailySunrise);
            console.log("Daily sunrise:", dailySunrise);
            console.log("Daily sunset:", dailySunset);

            // Calculate temperature in suns
        
            globalTempInSuns = (globalCurrentTemp / globaltempSun) * 100;
            console.log(globalTempInSuns);

            // Set the innerHTML of the temp element

if(flag==1){var temptemp = document.getElementById('TempTemp');
            temptemp.innerHTML =  'temp is ' +globalCurrentTemp + ' Celcius('+ F + ')';
           
           
           }
    
    
else{
            var temptemp = document.getElementById('TempTemp');
            temptemp.innerHTML = globalTempInSuns  ;}
            
            // Create a pie chart
        
            var ctx = document.getElementById('pieChart').getContext('2d');
            var pieChart = new Chart(ctx, {
                type: 'pie',
                data: {
                    labels: ['Heat of earth currently', 'Sun\'s Heat'],
                    datasets: [{
                        data: [globalTempInSuns, 100 - globalTempInSuns],
                        backgroundColor: [
                            '#d8fb51',
                            '#273a17',
                        ],
                    }]
                },
                options: {
                    plugins: {
                        legend: {
                            position: 'none',
                            labels: {
                                font: {
                                    size: 9,
                                    family: 'micro 5'
                                }
                            }
                        },
                        title: {
                            display: true,
                            text: '',
                            font: {
                                size: 16,
                                family: 'micro 5'
                            }
                        },
                        tooltip: {
                            bodyFont: {
                                size: 13,
                                family: 'micro 5'
                            }
                        }
                    }
                }
            });

            // Set the innerHTML of the time element
                          
if (flag == 1){
var timetime = document.getElementById('TimeTime');
            timetime.innerHTML = 'sunrise: '+ hourrise +':' +minutesrise;    }
else{                      
                          
                          
                          
                          
            var timetime = document.getElementById('TimeTime');
            timetime.innerHTML = '<span class ="type">sunset is ' + globalPunctTime + ' puncts after sunrise</span>';}
            
            // Set the innerHTML of the sunrise element
            
if (flag == 1){
var timerise = document.getElementById('Timerise');
            timerise.innerHTML = 'sunset: ' + hourset +':' +minutesset;
} else{


var timerise = document.getElementById('Timerise');
            timerise.innerHTML = 'sunrise is ' + globalPunctTime + ' puncts before sunset';}

            // Add class based on temperature range

            if (globalCurrentTemp < -18) {
                document.getElementById("whatWeather").classList.add("under0");
            } else if (globalCurrentTemp > -18) {
                document.getElementById("whatWeather").classList.add("e0-40");
            } else if (globalCurrentTemp > 4.5) {
                document.getElementById("whatWeather").classList.add("e40-50");
            } else if (globalCurrentTemp > 10) {
                document.getElementById("whatWeather").classList.add("e50-65");
            } else if (globalCurrentTemp > 18.5) {
                document.getElementById("whatWeather").classList.add("e65-90");
            } else if (globalCurrentTemp > 33) {
                document.getElementById("whatWeather").classList.add("e90plus");
            } else {
                document.getElementById("whatWeather").classList.add("e90plus");
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
});


// Get the modal
var modal = document.getElementById("myModal");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// Get the submit button and user input field
var submitBtn = document.getElementById("submitBtn");
var userInputField = document.getElementById("userInput");

// When the user clicks on the button, open the modal
document.getElementById("useful").addEventListener("click", function() {
  modal.style.display = "block";
});

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
};

// When the user clicks the submit button
submitBtn.onclick = function() {
  // Get the value from the input field
  var userInput = userInputField.value;
  // Do something with the input value (e.g., log it)
  console.log("User input:", userInput);
if (userInput == "1986" ){
localStorage.setItem('flag', '1');
} else {
    localStorage.setItem('flag', '0');
    
}
location.reload()
  
  // Close the modal
  modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};



if (flag == 1){document.getElementById("textBeforeTemp").classList.add("noDisplay");
               
               document.getElementById("textAfterTemp").classList.add("noDisplay");
    
    document.getElementById("pieChart").classList.add("noDisplay");
} else {
    
    document.getElementById("FHeight").classList.add("noDisplay");
    
}