
// -- GIVEN a weather dashboard with form inputs
// -- WHEN I search for a city
// THEN I am presented with current and future conditions for that city and that city is added to the search history
// WHEN I view current weather conditions for that city
//THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
//WHEN I view the UV index
//THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
//WHEN I view future weather conditions for that city
//THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, and the humidity
// -- WHEN I click on a city in the search history
// -- THEN I am again presented with current and future conditions for that city
// -- WHEN I open the weather dashboard
// -- THEN I am presented with the last searched city forecast







// on the form, I need to get the user's submission
// event.preventDefault()
// jquery to grab the field value
// array to store the list of values
// localstorage for that list of values
// stringify the array
// loop through the array and make buttons - reusable function
// maybe some sort of data value to represent the city
// put those buttons on the page
// initial API call for the submission

var apiKey = "eabeeba621cf3fcced68195ecef7292d";
var cityName = '';//$('#city').val();
var cityArray = [];
var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=";

$('#search').on('click', function (event) {
    event.preventDefault();

    cityName = $('#city').val();
    if (cityName === "") {

    } else if (cityName) {
        getCurrentWeather(cityName)
    };

});



function renderSavedCities() {
    $('#cities-list').empty();
    for (var i = 0; i < cityArray.length; i++) {
        //$('#cities-list').empty();
        var listThings = $('<li>');
        listThings.text(cityArray[i]);
        listThings.attr('data-city', i);
        listThings.on('click', function () {
            var value = $(this).attr('data-city');
            getCurrentWeather(cityArray[value]);
        })
        $('#cities-list').prepend(listThings);

    }

};

function getCurrentWeather(name) {
    //cityName = cityArray[cityIndex];
    $.ajax({
        url: queryURL + name + "&appid=" + apiKey,
        method: "GET"
    }).then(function (response) {
        if (cityArray.indexOf(name) < 0) {

            cityArray.push(name)
            localStorage.setItem('cities', cityArray);

            renderSavedCities();
        }
        console.log(response);
        // render weather
        // get 5day forecast
        get5DayForecast(response.id);

        //get uv index
        getUVIndex(response.coord.lat, lon)
    })
};

function get5DayForecast(id){
    // ajax call    
    $.ajax({
        url: queryURL + name + "&appid=" + apiKey,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        // render 5-day weather
    })
}

function getUVIndex(lat, lon){
    //ajax call
    $.ajax({
        url: 'api.openweathermap.org/data/2.5/uvi?lat=' + lat + '&lon=' + lon,
        method: "GET"
    }).then(function (response) {
        console.log('UV INDEX')
        console.log(response);
        //render uv index
    })
}
cityArray = localStorage.getItem('cities').split(',');
renderSavedCities();