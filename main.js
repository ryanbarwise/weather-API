
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




//http://maps.openweathermap.org/maps/2.0/weather/TA2/{z}/{x}/{y}?date=1527811200&



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
var cityName = ''///$('#city').val();
var cityArray = [];
var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=";
var queryURL2 = "https://api.openweathermap.org/data/2.5/forecast?id=";
var queryURL3 = "https://api.openweathermap.org/data/2.5/uvi?lat="
//var tempF = (response.main.temp - 273.15) * 1.80 + 32;
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
        var today = moment().format("(M/ D/ YYYY)");
        $('#date').text(today);
        //$('#date').moment().format("M","D","GGGG");
        $('#cityName').text(response.name);
        var tempF = (response.main.temp - 273.15) * 1.80 + 32;
        $('#temperature').text(Math.floor(tempF));
        $('#humidity').text(response.main.humidity);
        $('#wind-speed').text(response.wind.speed);


        // render weather
        // get 5day forecast
        get5DayForecast(response.id);
        //console.log(response.id);

        // getUVIndex(response.coord.lat, lon)
    })
};

function get5DayForecast(id) {

    $.ajax({
        url: queryURL2 + id + "&appid=" + apiKey,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        console.log(response.list[1].main.temp);
        console.log(response.list[1].main.humidity);

        //for (var i = 1; i<6; i++) {
        //var fiveDayForecast =  $('<div>');
        //fivaDayForecast.attr('data-temp', i);
        //var temp = (response.list[i].main.temp - 273.15) * 1.80 + 32;
        //fiveDayForecast.text("Temp: " + temp.toFixed(2));
        //$('#fiveDay').append(fiveDayForecast);

        $('.oneDate').text(moment().add(1, 'days').format("M/D/YYYY"));
        $('.oneTemp').html("Temp: " + Math.floor((response.list[1].main.temp - 273.15) * 1.80 + 32));
        $('.oneHum').html("Humidity: " + response.list[1].main.humidity);

        $('.twoDate').text(moment().add(2, 'days').format("M/D/YYYY"));
        $('.twoTemp').html("Temp: " + Math.floor((response.list[2].main.temp - 273.15) * 1.80 + 32));
        $('.twoHum').html("Humidity: " + response.list[2].main.humidity);

        $('.threeDate').text(moment().add(3, 'days').format("M/D/YYYY"));
        $('.threeTemp').html("Temp: " + Math.floor((response.list[3].main.temp - 273.15) * 1.80 + 32));
        $('.threeHum').html("Humidity: " + response.list[3].main.humidity);

        $('.fourDate').text(moment().add(4, 'days').format("M/D/YYYY"));
        $('.fourTemp').html("Temp: " + Math.floor((response.list[4].main.temp - 273.15) * 1.80 + 32));
        $('.fourHum').html("Humidity: " + response.list[4].main.humidity);

        $('.fiveDate').text(moment().add(5, 'days').format("M/D/YYYY"));
        $('.fiveTemp').html("Temp: " + Math.floor((response.list[5].main.temp - 273.15) * 1.80 + 32));
        $('.fiveHum').html("Humidity: " + response.list[5].main.humidity);

        //console.log(response.city.coord.lat, response.city.coord.lon);
        //console.log(response.coord);
        getUVIndex(response.city.coord.lat, response.city.coord.lon);







    })

};







function getUVIndex(lat, lon) {
    //ajax call
    $.ajax({
        url: queryURL3 + lat + '&lon=' + lon + "&appid=" + apiKey,
        method: "GET"
    }).then(function (response) {
        //console.log('UV INDEX');
        console.log(response);
        // //render uv index
        var uvInd = (Math.floor(response.value));
        if (uvInd === 8 || uvInd === 9 || uvInd === 10) {
            $('#uv-index').text(uvInd).css("background-color", "red");
        } else if (uvInd === 6 || uvInd === 7) {
            $('#uv-index').text(uvInd).css("background-color", "orange");
        } else if (uvInd === 3 || uvINd === 4 || uvInd === 5) {
            $('#uv-index').text(uvInd).css("background-color", "yellow");
        } else {
            $('#uv-index').text(uvInd).css("background-color", "lightblue");
        }

    })
       
    }


cityArray = localStorage.getItem('cities').split(',');
renderSavedCities();