// TODO line graph chart.js
// TODO show last 5 searches

const currentCity = document.querySelector("#autocomplete");
const cityLocation = document.querySelector(".location");
const cityTemperatureDayZero = document.querySelector("#temperatureDayZero");
const cityCoordinates = document.querySelector(".coordinates");

const timeNow = document.querySelector("#timeNow");

const daysCount = 5;
let date = new Date();

// Use enter key for submitting
currentCity.addEventListener("keyup", function (event){
    if (event.key == "Enter") {
        event.preventDefault();
        document.querySelector("#run").click();
    }
})

// Show the date
showdate = () => {
    const dateDay = date.getDate();
    const dateMonth = (date.getMonth() + 1);
    const dateYear = date.getFullYear();
    let weekDay = (date.getDay());
    const dayWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    document.querySelector("#date").innerHTML = `${dayWeek[weekDay - 1]}<br>${months[dateMonth - 1]} ${dateDay}<br>${dateYear}`

    const weekDays = [document.querySelector("#weekDayOne"), document.querySelector("#weekDayTwo"), document.querySelector("#weekDayThree"), document.querySelector("#weekDayFour")];
    for (i = 0; i < daysCount; i++) {
        let j = (weekDay + i) % 7;
        weekDays[i].innerHTML = `${dayWeek[j]}`;
    }
}

// Live clock
displayClock = () => {
    let time = new Date();

    timeClock = (standIn) => {
        if (standIn < 10) {
          standIn = '0' + standIn
        }
        return standIn;
    }
    
    let hours = time.getHours();
    let minutes = time.getMinutes();
    let seconds = time.getSeconds();
    timeNow.innerHTML = timeClock(hours) + ":" + timeClock(minutes) + ":" + timeClock(seconds);
}
setInterval(displayClock, 1000);

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
        let imgUrl = data["results"][randomNumber]["urls"]["full"];
        document.body.style.backgroundImage = `url(${imgUrl})`;
    })
}

// Animations
addAnimation = (weather, index) => {
    const imgTemp0 = document.querySelector("#imgTemp0");
    const imgTemp1 = document.querySelector("#imgDayOne");
    const imgTemp2 = document.querySelector("#imgDayTwo");
    const imgTemp3 = document.querySelector("#imgDayThree");
    const imgTemp4 = document.querySelector("#imgDayFour");
    const imgTemp = [imgTemp0, imgTemp1, imgTemp2, imgTemp3, imgTemp4];

    switch (weather) {
    case "clouds":
        imgTemp[index].innerHTML = `<lottie-player src="https://assets1.lottiefiles.com/packages/lf20_KUFdS6.json"  background="transparent"  speed="1"  style="width: 120px; height: 120px;"  loop  autoplay></lottie-player>`;
        break;
    case "rain":
        imgTemp[index].innerHTML = `<lottie-player src="https://assets6.lottiefiles.com/private_files/lf30_9s6k5U.json"  background="transparent"  speed="1"  style="width: 120px; height: 120px;"  loop  autoplay></lottie-player>`;
        break;
    case "sun":
        imgTemp[index].innerHTML = `<lottie-player src="https://assets4.lottiefiles.com/private_files/lf30_Um0Z9o.json"  background="transparent"  speed="1"  style="width: 120px; height: 120px;"  loop  autoplay></lottie-player>`;
        break;
    case "storm":
        imgTemp[index].innerHTML = `<lottie-player src="https://assets6.lottiefiles.com/private_files/lf30_LPtaP2.json"  background="transparent"  speed="1"  style="width: 120px; height: 120px;"  loop  autoplay></lottie-player>`;
        break;
    case "snow":
        imgTemp[index].innerHTML = `<lottie-player src="https://assets6.lottiefiles.com/private_files/lf30_kZXVCH.json"  background="transparent"  speed="1"  style="width: 120px; height: 120px;"  loop  autoplay></lottie-player>`;
        break;
    }
}

// Function to show temperature according to city
showTemperature = (currentCity) => {
    fetch (`https://api.weatherbit.io/v2.0/forecast/daily?city=${currentCity}&key=cbe1db44a04a412ebe4a95a03cba00cd&days=${daysCount}`)
    .then(response => response.json())
    .then(data => {
        let tempDayZero = data["data"]["0"]["temp"];
        temperatureDayZero.innerHTML = `${tempDayZero}°C`;

        const descriptions = [];
        for (i = 0; i < daysCount; i ++) {
            let j;
            j = data["data"][i]["weather"]["description"];
            descriptions.push(j);
        }
        const descriptionDaysHtml = [document.querySelector("#descrDayZero"), document.querySelector("#descrDayOne"), document.querySelector("#descrDayTwo"), document.querySelector("#descrDayThree"), document.querySelector("#descrDayFour")];
        for (i = 0; i < daysCount; i++) {
            descriptionDaysHtml[i].innerHTML = descriptions[i];
        }

        const minTemps = [];
        for (i = 0; i < daysCount; i ++) {
            let j;
            j = data["data"][i]["min_temp"];
            minTemps.push(j);
        }
        const maxTemps = [];
        for (i = 0; i < daysCount; i ++) {
            let j;
            j = data["data"][i]["max_temp"];
            maxTemps.push(j);
        }
        const minMaxTempsHtml = [document.querySelector("#temperatureDayOne"), document.querySelector("#temperatureDayTwo"), document.querySelector("#temperatureDayThree"), document.querySelector("#temperatureDayFour")];
        for (i = 0; i < minMaxTempsHtml.length; i++) {
            minMaxTempsHtml[i].innerHTML = `min ${minTemps[i]}°C<br>max ${maxTemps[i]}°C`;
        }

        descriptions.forEach(function(element, index) {
            if (element.includes("sun")){
                addAnimation("sun", index);
            }
            if (element.includes("Clear Sky")){
                addAnimation("sun", index);
            }
            if (element.includes("rain")){
                addAnimation("rain", index);
            }
            if (element.includes("drizzle")){
                addAnimation("rain", index);
            }
            if (element.includes("clouds")){
                addAnimation("clouds", index);
            }
            if (element.includes("storm")){
                addAnimation("storm", index);
            }
            if (element.includes("snow")){
                addAnimation("snow", index);
            }
        });
    })
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
            let currentCountry = data["results"]["0"]["components"]["country"];
            cityHTML(currentCity, currentCountry);
            changeBackground(currentCity);
            showTemperature(currentCity);
        })
    }
    getLocation();
    displayClock();
    showdate();
})

// Executions after click or enter
document.querySelector("#run").addEventListener("click", function() {
    cityHTML(currentCity.value);
    changeBackground(currentCity.value);
    showTemperature(currentCity.value);
    displayClock();
    showdate();
    showTemperature(currentCity);
}) 