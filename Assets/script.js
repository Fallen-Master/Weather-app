var key = '2f23027a9f86d417da7e31e6ab9ea170'

document.getElementById('search-city')

.addEventListener('click', function(event) {
    event.preventDefault();
    var cityName = document.querySelector('input').value;
    document.querySelector('input').value =''
    console.log(cityName)
    fetch (`https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=${key}`)
    .then(response => response.json())
    .then(data => {
        var lat = data[0].lat;
        var lon = data[0].lon;
        console.log(`Latitude: ${lat}, Longitude: ${lon}`)

        var ul = document.querySelector("ul");
        var li = document.createElement("li");
        li.textContent = cityName;
        ul.appendChild(li); 

       
        var cityHistory = JSON.parse(localStorage.getItem("cityHistory")) || [];
        cityHistory.push(cityName);
        localStorage.setItem("cityHistory", JSON.stringify(cityHistory));
      

    })
})
















// var fetchButton = document.getElementById('fetch-button');


// function getApi(){
//     let requestUrl = 'http://api.openweathermap.org/data/2.5/forecast?id=524901&appid=2f23027a9f86d417da7e31e6ab9ea170'

//     fetch(requestUrl)
//     .then(function (response) {
//         return response.json()
//         console.log(response)
//     })
//     .then (function (data){
//         console.log(data)
//     })
// }
// fetchButton.addEventListener('click', getApi);