var key = '2f23027a9f86d417da7e31e6ab9ea170'
var units = 'imperial'
var lang = 'en' 

var searchButton = document.getElementById('search-city');

searchButton.addEventListener('click', inputEventHandler);



function inputEventHandler(event) {
  event.preventDefault()
  var cityName = document.getElementById("input").value;
  if (!cityName){
    console.log('Please input City');
  }
  else {
    var ul = document.querySelector("ul");
    var li = document.createElement("li");
    li.textContent = cityName;
    ul.appendChild(li); 
    
    var cityHistory = JSON.parse(localStorage.getItem("cityHistory")) || [];
    cityHistory.push(cityName);
    localStorage.setItem("cityHistory", JSON.stringify(cityHistory));

    geoLocation(cityName);
  };
}

function geoLocation(cityName){
  var geoLocationRequest = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=${key}`;
  fetch(geoLocationRequest)
    .then(function (response) {
      if (!response.ok) {
        throw new Error ('Network response was not ok')
        }
      return response.json()
    })
    .then(function(data){
      geoLanLon(data)
      // console.log(data)
    })
    return;
}

 function geoLanLon(data){
  var lat = data[0].lat;
  var lon = data[0].lon;
  // console.log(`Latitude: ${lat}, Longitude: ${lon}`
 var url =  `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}&units=${units}&lang=${lang}`
  getCurrentWeather(url)
  var urlFiveDay = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${key}&units=${units}&lang=${lang}`
  fiveDayWeather(urlFiveDay)
 }

 function getCurrentWeather(url) {
  fetch(url)
  .then((response)=> {
   if (!response.ok) throw new Error(response.statusText)
   return response.json();
  })
   .then (data => {
    // console.log(data) 
       showCurrentWeather(data)
    //  console.log(data) 
   })
} 

function showCurrentWeather(data){
  var currentCity = data.name;
  var currentDate = new Date(data.dt * 1000)
  var currentTemp = data.main.temp
  var currentWind = data.wind.speed
  var currentHumidity = data.main.humidity
  document.getElementById("city").textContent = currentCity
  document.getElementById("current-date").textContent = currentDate.toDateString()
  document.getElementById("current-temp").textContent = currentTemp + " F";
  document.getElementById("current-wind").textContent = currentWind + " MPH"
  document.getElementById("current-humidity").textContent = currentHumidity + " %"
}

function fiveDayWeather(urlFiveDay) {
fetch(urlFiveDay)
.then((response)=> {
  if (!response.ok) throw new Error(response.statusText)
   return response.json();
})
  .then (function (data) {
     filterByTime(data)
  })
}

function filterByTime(data){
  var filteredData = [];
  for (let i = 0; i < data.list.length; i++) {
    var dt_txt = data.list[i].dt_txt;  // this should be a string like "2023-07-30 12:00:00"
    var dtTime = dt_txt.split(" ")[1];  // split the string at the space and take the second part
    if (dtTime === "12:00:00"){
      filteredData.push(data.list[i]);
    }
  }
  console.log(filteredData);
  makeFiveDayCard(filteredData)
  return filteredData;
}

function makeFiveDayCard(filteredData){
  for (let i = 0; i <filteredData.length; i++){
    var date = new Date(filteredData[i].dt * 1000)
    var icon = filteredData[i].weather[0].icon
    var temp =  filteredData[i].main.temp
    var wind = filteredData[i].wind.speed
    var humidity = filteredData[i].main.humidity

    var newCard = document.createElement("div")
    newCard.setAttribute("class", "card column")
    newCard.innerHTML=`
    <div class="card-content">
            <h4 class = "card-header-title" >Date:${date.toDateString()}</h4>
             <img src=" https://openweathermap.org/img/wn/${icon}@2x.png"
             alt="Placeholder image"
             class="image ">
             <p class="content">TEMP: ${temp}</p>
             <p class="content">WIND: ${wind}MPH</p>
             <p class="content">HUMIDITY: ${humidity}</p>
    </div>`
    
 document.getElementById("container-five-day").appendChild(newCard)
  }


  
}

window.onload = function() {
  var cityHistory = JSON.parse(localStorage.getItem("cityHistory")) || [];
  var ul = document.querySelector("ul");

  for(var i = 0; i < cityHistory.length; i++) {
    var li = document.createElement("li");
    li.textContent = cityHistory[i];
    ul.appendChild(li);
  }
};