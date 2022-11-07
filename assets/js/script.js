var APIkey = 'f65595b77e670ba90372906e45ebf28b'

function searchWeather(city) {
    // searches weather based on user city input or button click
    var geoURL = "http://api.openweathermap.org/geo/1.0/direct?q="+city+"&limit=1&appid="+APIkey;
    fetch(geoURL).then(function(response){
    return response.json();
    }).then(function(data){
        console.log(data);
    var lat = data[0].lat;
    var lon = data[0].lon;
    console.log(lat, lon);
    var url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${APIkey}`;
    fetch(url).then(function(response){
        return response.json()
    }).then(function(data){
        showWeather(data);
    })
    })
   
}

function showWeather(data) {
    // displays the weather user city search or button click
    console.log(data);
    var mainCard = document.createElement("div")
    mainCard.classList.add("card")
    var cardBody = document.createElement("div")
    cardBody.classList.add("card-body")
    mainCard.appendChild(cardBody)
    var cardTitle = document.createElement("h3")
    cardTitle.classList.add("card-title")
    cardTitle.textContent=data.name
    var tempEl = document.createElement("p")
    tempEl.classList.add("card-text")
    tempEl.textContent=data.main.temp
    cardBody.append(cardTitle, tempEl)
    document.querySelector(".current-forecast").appendChild(mainCard);
}

document.getElementById("btnSearch").addEventListener("click", function(){
    var city = document.getElementById('cityChoice').value;
    searchWeather(city);
})