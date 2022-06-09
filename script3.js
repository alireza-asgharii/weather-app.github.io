const input = document.querySelector(".search .searchInput");
const button = document.querySelector(".searchButton");
const listWeather = document.querySelector(".weatherList");
const cityStyle = document.querySelector('#cityStyle');
const err =  document.querySelector('.err');


const key = "67f613e2aea22e56d6dc6da64d245ea6";

input.addEventListener('focus', () => {
  input.placeholder = '';
})

input.addEventListener('blur', () => {
  input.placeholder = 'search for city weather...';
})

button.addEventListener("click", () => {
  weatherHandler();
});

window.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    weatherHandler();
    event.preventDefault();
  }
});

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];


function weatherHandler() {
  const inputValue = input.value;
  console.log(inputValue);
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&appid=${key}&units=metric`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log(data)
      const d = new Date();
      const day = days[d.getDay()];
      const month = months[d.getMonth()];
      const monthDay = d.getDate()

      const { main, name, sys, weather, message } = data;

      const icon = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${weather[0]["icon"]}.svg`;
      const div = document.createElement("div");
      div.classList.add("city");
      if (weather[0].main === "Clouds") {
        div.classList.add('clouds');
      } else if (weather[0].main === "Clear") {
        div.classList.add('clear');
      } else {
        div.classList.add('defualt');
      }
      const markup = `
      <div class="temp">
        <p>${weather[0].main}</p>
        <h3>${Math.round(main.temp)}<sup>&#xb0</sup></h3>
      </div> 
      <span class="point">|</span>
      <div class="dateContainer">
        <p class="date">${day}, ${monthDay} ${month}</p>
        <p class="cityName">
          <i class="fa-solid fa-location-dot"></i>
          <sapn>${name}</sapn>
        </p>
      </div>
      <div class="imageWeather">
        <img  src="${icon}">
      </div>
      `;
     
      div.innerHTML = markup;
      listWeather.appendChild(div);
      err.innerHTML = ''
    })
    .catch(() => {
      err.innerHTML = 'مشکلی وجود دارد'
    })

  input.value = "";
}
