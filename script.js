const key = "d1abc69877e1d5a031a0c93a4b7d8834";

document.addEventListener("DOMContentLoaded", function () {
  const day = document.querySelector(".day");

  function updateData() {
    const dateHourActual = new Date();
    const formatDay = dateHourActual.toLocaleDateString("pt-BR", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    day.textContent = formatDay;
  }

  updateData();
  setInterval(updateData, 1000);
});

function syncData(data) {
  const temperature = `${Math.round(data.main.temp)}°C`;
  const wind = (data.wind.speed * 3.6).toFixed(0) + "km/h";
  const sunrise = new Date(data.sys.sunrise * 1000).toLocaleTimeString(
    "pt-BR",
    { hour: "2-digit", minute: "2-digit" }
  );
  const sunset = new Date(data.sys.sunset * 1000).toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });

  document.querySelector(".city").innerHTML = data.name;
  document.querySelector(".temperature").innerHTML = temperature;
  document.querySelector(".title-time").innerHTML = data.weather[0].description;
  document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
  document.querySelector(".wind").innerHTML = wind;
  document.querySelector(".pressure").innerHTML = data.main.pressure + "BAR";
  document.querySelector(".visibility").innerHTML =
    data.visibility / 1000 + "km";
  document.querySelector(".hour-sunrise").innerHTML = sunrise;
  document.querySelector(".hour-sunset").innerHTML = sunset;
  document.querySelector(
    ".image-time"
  ).innerHTML = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;

}

async function searchCity(city) {
  const data = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&lang=pt_br&units=metric`
  ).then((response) => response.json());
  syncData(data);
}

function search() {
  const city = document.querySelector(".location-input").value;

  searchCity(city);
}
