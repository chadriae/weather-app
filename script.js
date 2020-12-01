const citySearch = document.querySelector(".city");
const cityLocation = document.querySelector(".location");
const cityTemperatureDayZero = document.querySelector(".temperatureDayZero");
const cityTemperatureDayOne = document.querySelector(".temperatureDayOne");
const cityTemperatureDayTwo = document.querySelector(".temperatureDayTwo");
const cityTemperatureDayThree = document.querySelector(".temperatureDayThree");
const cityTemperatureDayFour = document.querySelector(".temperatureDayFour");
const daysCount = 5;

citySearch.addEventListener("keyup", function (event){
    if (event.key == "Enter") {
        event.preventDefault();
        document.querySelector("#run").click();
    }
})

document.querySelector("#run").addEventListener("click", function() {
    console.log(citySearch.value);
    fetch (`https://api.weatherbit.io/v2.0/forecast/daily?city=${citySearch.value}&key=5c845431685a49938d7db2daf29433fd&days=${daysCount}`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            let selectedCity = data["city_name"];
            let tempDayZero = data["data"]["0"]["temp"];
            let tempDayOne = data["data"]["1"]["temp"];
            let tempDayTwo = data["data"]["2"]["temp"];
            let tempDayThree = data["data"]["3"]["temp"];
            let tempDayFour = data["data"]["4"]["temp"];
            cityLocation.innerHTML = `Current weather forecast for ${selectedCity}.`;
            cityTemperatureDayZero.innerHTML = `The temperature is ${tempDayZero}°C.`;
            cityTemperatureDayOne.innerHTML = `The temperature for tomorrow is ${tempDayOne}°C.`;
            cityTemperatureDayTwo.innerHTML = `The temperature for the day after is ${tempDayTwo}°C.`;
            cityTemperatureDayThree.innerHTML = `The temperature for the day after is ${tempDayThree}°C.`;
            cityTemperatureDayFour.innerHTML = `The temperature for the day after is ${tempDayFour}°C.`;
        })
        .catch(err => alert("Wrong city name."))

    fetch (`https://api.unsplash.com/search/photos/?query=${citySearch.value}&client_id=00WYi-JstJlyoIEg8SJDxYOS-9RB4Hr7_yfu5gpIO2g`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            let imgUrl = data["results"][0]["urls"]["full"]
            console.log(imgUrl);
            document.body.style.backgroundImage = `url(${imgUrl})`;
        })
})