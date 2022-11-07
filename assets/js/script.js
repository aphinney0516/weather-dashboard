function runningHomepage() {
    // upon opening the web document displays the weather for current location
}

function searchWeather(city) {
    // searches weather based on user city input or button click
    var city = document.getElementById('cityChoice').value;
    var APIkey = 'f65595b77e670ba90372906e45ebf28b'
    var url = 'https://api.openweathermap.org/data/2.5/weather?q={city}&appid={APIKey}';
    var search = document.addEventListener('click', app.getLocation);
}

function showWeather() {
    // displays the weather user city search or button click
}