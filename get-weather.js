var jon = { weather: {} };

jon.weather.handleAllWeatherResults = function (json) {
    var weatherResults = json.query.results;
    
    var currentConditions = weatherResults.channel.item.condition;
    jon.weather.didReceiveCurrentConditions(currentConditions);
    
    var currentLocation = weatherResults.channel.location;
    jon.weather.didReceiveCurrentLocationCity(currentLocation);
    
    var currentLocation = weatherResults.channel.location;
    jon.weather.didReceiveCurrentLocationRegion(currentLocation);

    var firstForecast = weatherResults.channel.item.forecast;
    jon.weather.didReceiveForecast(firstForecast);
};



jon.weather.didReceiveCurrentConditions = function(condition) {
    jon.weather.updateCurrentTempOnPage(condition.temp);
};
jon.weather.updateCurrentTempOnPage = function(temp) {
    $("#data-temperature").text(temp);
};


jon.weather.didReceiveCurrentLocationRegion = function(location) {
    jon.weather.updateCurrentLocationRegionOnPage(location.region);
};
jon.weather.updateCurrentLocationRegionOnPage = function(region) {
    $("#data-location-region").text(region);
};


jon.weather.didReceiveCurrentLocationCity = function(location) {
    jon.weather.updateCurrentLocationCityOnPage(location.city);
};
jon.weather.updateCurrentLocationCityOnPage = function(city) {
    $("#data-location-city").text(city);
};




jon.weather.didReceiveForecast = function(forecast) {
    $(".forecast-container").empty();
    $(forecast).each(function(index, obj) {
        jon.weather.didReceiveIndividualForecastItem(index, obj);
    });
};
jon.weather.didReceiveIndividualForecastItem = function(index, item) {
    var container = $(".forecast-container"),
        newDay =  jon.weather.createNewForecastDayContainerWithIndex(index);
    
    jon.weather.populateForecastDayContainerWithItem(newDay, item);
    container.append(newDay);
};

jon.weather.createNewForecastDayContainerWithIndex = function(index) {
    var html = ['<div id="forecast-day-container-',index,'" class="forecast-day-container"><div class="forecast-day"></div><div class="forecast-temp"><span class="forecast-temp-high"></span> / <span class="forecast-temp-low"></span></div></div>'].join('');
    return $(html);
};

jon.weather.populateForecastDayContainerWithItem = function(dayContainer, item) {
    $(".forecast-day", dayContainer).text(item.day);
    $(".forecast-temp-high", dayContainer).text(item.high);
    $(".forecast-temp-low", dayContainer).text(item.low);
};


jon.weather.loadWeather = function (){
    var url = "http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%3D12796670&format=json&";
    $.ajax( {   type: 'GET',
        url: url,
        async: false,
        jsonpCallback: 'jsonCallback',
        contentType: "application/json",
        dataType: 'jsonp',
        success: function(json) {
           jon.weather.handleAllWeatherResults(json);
        }
    });
};                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                