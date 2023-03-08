var APIkey = 'f65595b77e670ba90372906e45ebf28b'
var forecastArray = []
var cities = JSON.parse(localStorage.getItem('cities'))||[]
dayjs.extend(window.dayjs_plugin_utc)
dayjs.extend(window.dayjs_plugin_timezone)

function searchWeather(city) {
    // searches weather based on user city input or button click
    var geoURL = "https://api.openweathermap.org/geo/1.0/direct?q="+city+"&limit=1&appid="+APIkey;
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
    fetchFiveDay(lat,lon);
    })
   
}
for (var i = 0; i<cities.length; i++) {
    var button = document.createElement('button')
    button.setAttribute('value',cities[i])
    button.textContent=cities[i]
    button.onclick=function(){
        searchWeather(this.value)
    }
    document.querySelector('.city-search-history').append(button)
}
function showWeather(data) {
    // displays the weather user city search or button click
    if (!cities.includes(data.name)) {
        cities.push(data.name)
        localStorage.setItem('cities', JSON.stringify(cities))
    }
    document.querySelector('.current-forecast').innerHTML=''
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
    tempEl.textContent="temperature:"+data.main.temp
    var humidityEl = document.createElement("p")
    humidityEl.classList.add("card-text")
    humidityEl.textContent="humidity:"+data.main.humidity+"%"
    var windEl = document.createElement("p")
    windEl.classList.add("card-text")
    windEl.textContent="wind-speed:"+Math.round(data.wind.speed)+"mph"
    var icon = document.createElement("img")
    icon.setAttribute("src",`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`)
    cardTitle.append(icon)
    cardBody.append(cardTitle, tempEl,humidityEl,windEl)
    document.querySelector(".current-forecast").appendChild(mainCard);
}

function showForecast(data) {
    // displays the weather user city search or button click
    console.log(data);
    document.getElementById("forecastContainer").innerHTML=""
    for (var i = 0; i < data.length; i++) {
        var mainCard = document.createElement("div")
        mainCard.classList.add("card")
        var cardBody = document.createElement("div")
        var cardTitle = document.createElement('h5')
        cardTitle.classList.add('card-title')
        cardTitle.textContent=dayjs(data[i].dt_txt).format('M/D')
        cardBody.classList.add("card-body")
        var tempEl = document.createElement("p")
        tempEl.classList.add("card-text")
        tempEl.textContent="temperature:"+data[i].main.temp
        var humidityEl = document.createElement("p")
        humidityEl.classList.add("card-text")
        humidityEl.textContent="humidity:"+data[i].main.humidity+"%"
        var windEl = document.createElement("p")
        windEl.classList.add("card-text")
        windEl.textContent="wind-speed:"+Math.round(data[i].wind.speed)+"mph"
        var icon = document.createElement("img")
        icon.setAttribute("src",`http://openweathermap.org/img/wn/${data[i].weather[0].icon}.png`)
        cardTitle.appendChild(icon)
        cardBody.appendChild(cardTitle)
        cardBody.appendChild(tempEl)
        cardBody.appendChild(humidityEl)
        cardBody.appendChild(windEl)
        mainCard.appendChild(cardBody)
        document.getElementById("forecastContainer").appendChild(mainCard)     
    }
}

function fetchFiveDay(lat,lon) {
    var URL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${APIkey}`
    fetch(URL).then(function(response){
        return response.json();
        }).then(function(data){
            for (var i = 0; i < data.list.length; i++){
                var timeOfDay = data.list[i].dt_txt.split(" ")[1]
            if (timeOfDay === "12:00:00") {
                console.log(data.list[i])
                forecastArray.push(data.list[i])
                showForecast(forecastArray)
            }    
            }
        })
} 

document.getElementById("btnSearch").addEventListener("click", function(){
    var city = document.getElementById('cityChoice').value;
    searchWeather(city);
})