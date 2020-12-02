const currentCity = document.querySelector(".city");
const cityLocation = document.querySelector(".location");
const cityTemperatureDayZero = document.querySelector("#temperatureDayZero");
const cityTemperatureDayOne = document.querySelector("#temperatureDayOne");
const cityTemperatureDayTwo = document.querySelector("#temperatureDayTwo");
const cityTemperatureDayThree = document.querySelector("#temperatureDayThree");
const cityTemperatureDayFour = document.querySelector("#temperatureDayFour");
const cityCoordinates = document.querySelector(".coordinates");
const imgTemp0 = document.querySelector("#temp0");
const imgTemp1 = document.querySelector("#temp1");
const imgTemp2 = document.querySelector("#temp2");
const imgTemp3 = document.querySelector("#temp3");
const imgTemp4 = document.querySelector("#temp4");

const daysCount = 5;

// Use enter key for submitting
currentCity.addEventListener("keyup", function (event){
    if (event.key == "Enter") {
        event.preventDefault();
        document.querySelector("#run").click();
    }
})

// Show the date
const date = new Date();
const dateDay = date.getDate();
const dateMonth = (date.getMonth() + 1);
const dateYear = date.getFullYear();
const weekDay = date.getDay();
const dayWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
console.log(dateMonth);
document.querySelector(".date").innerHTML = `Today is ${dayWeek[weekDay - 1]} ${months[dateMonth - 1]} ${dateDay} ${dateYear}.`

// Function to change HTML with current city
cityHTML = (currentCity) => {
    cityLocation.innerHTML = `${currentCity}`;
}

// Function to change background according to city
 changeBackground = (currentCity) => {
    fetch (`https://api.unsplash.com/search/photos/?query=${currentCity}&client_id=00WYi-JstJlyoIEg8SJDxYOS-9RB4Hr7_yfu5gpIO2g`)
    .then(response => response.json())
    .then(data => {
        let randomNumber = Math.floor(Math.random() * 5);
        let imgUrl = data["results"][randomNumber]["urls"]["full"]
        document.body.style.backgroundImage = `url(${imgUrl})`;
    })
}

// Function to show temperature according to city
showTemperature = (currentCity) => {
    fetch (`https://api.weatherbit.io/v2.0/forecast/daily?city=${currentCity}&key=cbe1db44a04a412ebe4a95a03cba00cd&days=${daysCount}`)
    .then(response => response.json())
    .then(data => {
        let tempDayZero = data["data"]["0"]["temp"];
        let tempDayOne = data["data"]["1"]["temp"];
        let tempDayTwo = data["data"]["2"]["temp"];
        let tempDayThree = data["data"]["3"]["temp"];
        let tempDayFour = data["data"]["4"]["temp"];
        let img0Src = data["data"]["0"]["weather"]["icon"];
        let img1Src = data["data"]["1"]["weather"]["icon"];
        let img2Src = data["data"]["2"]["weather"]["icon"];
        let img3Src = data["data"]["3"]["weather"]["icon"];
        let img4Src = data["data"]["4"]["weather"]["icon"];
        cityTemperatureDayZero.innerHTML = `${tempDayZero}°C <img src="https://www.weatherbit.io/static/img/icons/${img0Src}.png">`;
        cityTemperatureDayOne.innerHTML = `Tomorrow<br>${tempDayOne}°C. <img src="https://www.weatherbit.io/static/img/icons/${img1Src}.png">`;
        cityTemperatureDayTwo.innerHTML = `${dayWeek[weekDay + 1]}<br>${tempDayTwo}°C. <img src="https://www.weatherbit.io/static/img/icons/${img2Src}.png">`;
        cityTemperatureDayThree.innerHTML = `${dayWeek[weekDay + 2]}<br>${tempDayThree}°C. <img src="https://www.weatherbit.io/static/img/icons/${img3Src}.png">`;
        cityTemperatureDayFour.innerHTML = `${dayWeek[weekDay + 3]}<br>${tempDayFour}°C. <img src="https://www.weatherbit.io/static/img/icons/${img4Src}.png">`;
        // imgTemp0.src = "https://www.weatherbit.io/static/img/icons/c02d.png";
        // imgTemp1.src = "https://www.weatherbit.io/static/img/icons/c02d.png";
        // imgTemp2.src = "https://www.weatherbit.io/static/img/icons/c02d.png";
        // imgTemp3.src = "https://www.weatherbit.io/static/img/icons/c02d.png";
        // imgTemp4.src = "https://www.weatherbit.io/static/img/icons/c02d.png";
    })
    .catch(err => alert("Wrong city name."))
}

// Executions for location of user
window.addEventListener("load", function() {
    getLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition);
        } else {
            cityCoordinates.innerHTML = "Geolocation is not supported by this browser.";
        }
    }

    showPosition = (position) => {
        // Show place name based on coordinates
        fetch (`https://api.opencagedata.com/geocode/v1/json?q=${position.coords.latitude}+${position.coords.longitude}&key=0dc9b14ba9a846f19428714fed4f54cc`)
            .then(response => response.json())
            .then(data => {
            let currentCity = data["results"]["0"]["components"]["city"];
            cityHTML(currentCity);
            changeBackground(currentCity);
            showTemperature(currentCity);
        })
    }
    getLocation();
})

// Executions after click or enter
document.querySelector("#run").addEventListener("click", function() {
    cityHTML(currentCity.value);
    changeBackground(currentCity.value);
    showTemperature(currentCity.value);
}) 


