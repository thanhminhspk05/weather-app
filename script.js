"use strict";

function displayWeather() {
    const inputValue = document.querySelector('.search-bar').value || "Ho Chi Minh"
    const apiKey = `https://api.weatherapi.com/v1/forecast.json?key=6c80edae591a494285631225230802&q=${inputValue}&days=5&aqi=yes&alerts=no`
    fetch(apiKey).then(response => response.json())
        .then(data => updateWeather(data))
        .catch(err => {
            alert("The region not real")
            document.querySelector('.search-bar').value = ''
        })

}

function updateWeather(data) {
    // console.log(data);
    let locationName = data.location.name
    let temp = Math.floor(data.current.temp_c)
    let icon = data.current.condition.icon
    let condition = data.current.condition.text
    let localTime = formatDate(data.location.localtime)
    let feels_like = data.current.feelslike_c
    let windSpeed = data.current.wind_kph
    let humidity = data.current.humidity
    let visible = data.current.vis_km

    document.querySelector('.city').innerText = `${locationName}`
    document.querySelector('.degree').innerText = `${temp} ℃`
    document.querySelector('.icon').src = icon
    document.querySelector('.condition').innerText = condition
    document.querySelector('.local_time').innerText = `Updated at ${localTime}`
    document.querySelector('.feels_like').innerText = `Feels Like: ${feels_like} ℃`
    document.querySelector('.humidity').innerText = `Humidity: ${humidity}%`
    document.querySelector('.wind_speed').innerText = `Wind speed: ${windSpeed} km/h`
    document.querySelector('.visible').innerText = `Visible: ${visible} km`

    document.querySelector('.search-bar').value = ''

    forecastWeather(data)
}


function forecastWeather(data) {
    data = data.forecast.forecastday

    let dayNames = document.querySelectorAll('.day_name')
    let imgs = document.querySelectorAll('img')
    let maxTemps = document.querySelectorAll('.max_temp')
    let minTemps = document.querySelectorAll('.min_temp')
    let conditions = document.querySelectorAll('.forecast .condition')

    const cell_day = index => {
        let dayName = getDay(data[index].date)
        let icon = data[index].day.condition.icon
        let condition = data[index].day.condition.text
        let maxTemp = Math.floor(data[index].day.maxtemp_c)
        let minTemp = Math.floor(data[index].day.mintemp_c)
        

        dayNames[index].innerText = dayName
        imgs[index].src = icon
        maxTemps[index].innerText = maxTemp
        minTemps[index].innerText = minTemp
        conditions[index].innerText = condition
    }

    for (let i = 0; i < 5; i++) {
        cell_day(i)
    }
}

// Convert yyyy-mm-dd to dd/mm/yyyy
function formatDate(inputDate) {
    let [day, time] = inputDate.split(' ')
    let date = day.slice(8,)
    let month = day.slice(5,7)
    let year = day.slice(0,4)
    return `${date}/${month}/${year} ${time}`
}

// Convert yyyy-mm-dd to Name-date
function getDay(inputDate) {
    let dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    let day = new Date(inputDate)
    let dayName = dayNames[day.getDay()]
    return `${dayName} ${inputDate.slice(8,)}`
}

displayWeather()
document.querySelector('.btn-search').addEventListener('click', displayWeather)
window.addEventListener('keydown', e => {
    e.keyCode === 13 && displayWeather()
})
