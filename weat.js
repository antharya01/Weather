document.addEventListener("DOMContentLoaded", () => {
  const searchButton = document.querySelector(".search button");
  const searchBar = document.querySelector(".search-bar");

  if (searchButton) {
    searchButton.addEventListener("click", () => weather.search());
  } else {
    console.error("Search button not found in the DOM.");
  }

  if (searchBar) {
    searchBar.addEventListener("keyup", (event) => {
      if (event.key === "Enter") {
        weather.search();
      }
    });
  } else {
    console.error("Search bar not found in the DOM.");
  }
  weather.fetchWeather("Denver");
});

let weather = {
  apiKey: "34930f3697a8de609eadb2b54c6e7cf2",
  fetchWeather: function (city) {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&units=metric&appid=" +
        this.apiKey
    )
      .then((response) => {
        if (!response.ok) {
          alert("No weather found.");
          throw new Error("No weather found.");
        }
        return response.json();
      })
      .then((data) => this.displayWeather(data))
      .catch((error) => console.error("Fetch error: ", error));
  },
  displayWeather: function (data) {
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp, humidity } = data.main;
    const { speed } = data.wind;

    const cityElement = document.querySelector(".city");
    const iconElement = document.querySelector(".icon");
    const descriptionElement = document.querySelector(".description");
    const tempElement = document.querySelector(".temp");
    const humidityElement = document.querySelector(".humidity");
    const windElement = document.querySelector(".wind");

    if (cityElement) cityElement.innerText = "Weather in " + name;
    if (iconElement) iconElement.src = "https://openweathermap.org/img/wn/" + icon + ".png";
    if (descriptionElement) descriptionElement.innerText = description;
    if (tempElement) tempElement.innerText = temp + "°C";
    if (humidityElement) humidityElement.innerText = "Humidity: " + humidity + "%";
    if (windElement) windElement.innerText = "Wind speed: " + speed + " km/h";

    const weatherElement = document.querySelector(".weather");
    if (weatherElement) weatherElement.classList.remove("loading");
    
    document.body.style.backgroundImage = "url('wbi.jpeg')";
  },
  search: function () {
    this.fetchWeather(document.querySelector(".search-bar").value);
  },
};

function myFunction() {
  var x = document.getElementById("myLinks");
  if (x.style.display === "block") {
    x.style.display = "none";
  } else {
    x.style.display = "block";
  }
}
function toggleMenu() {
  document.querySelector('.nav-links').classList.toggle('open');
  document.querySelectorAll('.bar').forEach(bar => bar.classList.toggle('open'));
}