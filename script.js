// Grab UI elements
const cityInput = document.getElementById("cityInput");
const getWeatherBtn = document.getElementById("getWeatherBtn");
const weatherResult = document.getElementById("weatherResult");

// when button clicked
getWeatherBtn.addEventListener("click", () => {
    const city = cityInput.value.trim();

    if (city === "") {
        weatherResult.textContent = "Please type a city name first.";
        return;
    }

    getWeather(city);
});


// call the API
async function getWeather(cityName) {
    const apiKey = "75bff14866bbd077bc0f24bd4a95078f"; 
    
    const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(cityName)}&units=metric&appid=${apiKey}`;

    weatherResult.textContent = "Loading...";

    try {
        const res = await fetch(apiURL);

        if (!res.ok) {
            weatherResult.textContent = "City not found.";
            return;
        }

        const data = await res.json();
        displayWeather(data);
    } catch (err) {
        weatherResult.textContent = "Could not fetch weather.";
    }
}


// show weather and change background
function displayWeather(data) {
    const temp = data.main.temp;
    const desc = data.weather[0].description;
    const mainType = data.weather[0].main.toLowerCase();
    const country = data.sys.country;

    // update text
    weatherResult.innerHTML = `
        <h2>${data.name}, ${country}</h2>
        <p><strong>${temp}°C</strong></p>
        <p>${desc}</p>
    `;

    // change background
    document.body.className = ""; // reset

    if (mainType.includes("cloud")) {
        document.body.classList.add("cloudy-bg");
    } else if (mainType.includes("rain")) {
        document.body.classList.add("rainy-bg");
    } else if (mainType.includes("snow")) {
        document.body.classList.add("snow-bg");
    } else if (mainType.includes("storm") || mainType.includes("thunder")) {
        document.body.classList.add("storm-bg");
    } else {
        document.body.classList.add("sunny-bg");
    }
}
