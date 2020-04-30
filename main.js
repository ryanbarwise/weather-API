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
 var queryUrl = "https://api.openweathermap.org/data/2.5/weather?q=" +
 cityName + "&appid" + apiKey;
 var cityName = $('#city').val();
 var cityArray = [];

$('#search').on('click', function(event) {
    event.preventDefault();
    
    var cityName = $('#city').val();
    if(cityName === "") {
        return;
    }
    
    cityArray.push(cityName);
    cityName.value = ('');
     
    

    localStorage.setItem('city', JSON.stringify(cityArray[0]));
    renderLastSearch();
    createList();
});

function renderLastSearch() {
    var cityName = $('#city').val();
    localStorage.getItem('city');
   ////jsonparse?
}
   
    function createList() {
        $('#cities-list').empty();
    for(var i = 0; i < cityArray.length; i++){
        //$('#cities-list').empty();
     var listThings = $('<li>');
        listThings.text(cityArray[i]);
        listThings.attr('data-city', i);
        $('#cities-list').prepend(listThings);

    }

};

function getCurrentWeather(cityName){
    $.ajax({
    url: queryUrl,
    method: "GET"
}).then(function(response) {

console.log(response);
}
)};


  
 
    
    
    
    
//function renderLastSearch() {
   // var cityName = $('#city').val();
   // localStorage.getItem('city');
   ////jsonparse?
//}






