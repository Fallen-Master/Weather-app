var fetchButton = document.getElementById('fetch-button');

function getApi(){
    let requestUrl = 'http://api.openweathermap.org/data/2.5/forecast?id=524901&appid=2f23027a9f86d417da7e31e6ab9ea170'

    fetch(requestUrl)
    .then(function (response) {
        return response.json()
        console.log(response)
    })
    .then (function (data){
        console.log(data)
    })
}
fetchButton.addEventListener('click', getApi);