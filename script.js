//search bar that enables the user to search a city for its weather
    //searches the weather API

var key = "aac31909c55fc28e89694017c83fb268"; 

//displays current city (date) and image of current condition near top of card
    //enable to populate with each new city selected
    //displays current temp, humidity (%), wind speed, and UV index
function getWeather(city) {
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + key; 

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(response);
        $("#city-name").text("Current Weather: " + response.name);
        var weatherImg = response.weather[0].icon;
        var dailyIcon =
        "https://openweathermap.org/img/wn/" + weatherImg + "@2x.png";
        var imgtwo = $("<img>").attr("src", dailyIcon);
        $("#city-name").append(imgtwo);
        JSON.stringify($("#city-weather").text("Temperature: " + response.main.temp + " F"));
        JSON.stringify($("#city-weather2").text("Humidity: " + response.main.humidity + "%"));
        JSON.stringify($("#city-weather3").text("Wind speed: " + response.wind.speed + " mph"));
        // return(lat, lon);
        fiveDayWeather(response);
    });
};

var cityName = $("#city-name");

$("#search-btn").on("click", function(){
    var city = $("#search-input").val().trim();
    
    getWeather(city);
    
    // fiveDayWeather();
});

//displays 5 day forecast for the selected city 
    //date, icon, temp, humidity
function fiveDayWeather(apiResponse) {

   
    var lat = JSON.stringify(apiResponse.coord.lat);
    var lon = JSON.stringify(apiResponse.coord.lon);
    var oneCallApi = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&exclude=current,minutely,hourly&appid=${key}`;

$.ajax({
    url: oneCallApi,
    method: "Get"
    }).then(function(response) {
        console.log(response);
        JSON.stringify($("#city-weather4").text("UV index: " + response.daily[0].uvi));

        for(var i = 1; i < 6; i++) {
        var date = response.daily[i].dt
        var dailyDate = new Date(date * 1000).toLocaleDateString("en-US");
        $("#date-" + i).text(dailyDate);

        $("#forecast-" + i).empty();
        
        var weatherImg = response.daily[i].weather[0].icon;
        var dailyIcon =
        "https://openweathermap.org/img/wn/" + weatherImg + "@2x.png";
        var img = $("<img>").attr("src", dailyIcon);
        $("#forecast-" + i).append(img);

        JSON.stringify($("#temp-" + i).text("Min Temp: " + response.daily[i].temp.min + " F"));
        JSON.stringify($("#tempmax-" + i).text("Max Temp: " + response.daily[i].temp.max + " F"));
        JSON.stringify($("#humid-" + i).text("Humidity: " + response.daily[i].humidity + " %"));
    }
    });
};


//displays previous searches below the search bar