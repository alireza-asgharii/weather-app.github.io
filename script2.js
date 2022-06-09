// https://api.openweathermap.org/data/2.5/weather?q=tehran&appid=67f613e2aea22e56d6dc6da64d245ea6&units=metric

const input = document.querySelector("input");
const form = document.querySelector("form");
const list = document.querySelector(".ajax-section ul");
const msg = document.querySelector(".msg");

const key = "67f613e2aea22e56d6dc6da64d245ea6";

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const inputValue = input.value;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&appid=${key}&units=metric`;
  fetch(url)
    .then((response) => response.json())
    .then((Date) => requestHandler(Date));
});

function requestHandler(Date) {
  console.log(Date);
  const { name, main, sys, weather, cod, message } = Date;
  if (cod === 200) {
    const icon = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${weather[0]["icon"]}.svg`;
    const li = document.createElement("li");
    li.classList.add("city");
    const markup = `
      <h2 class='city-name' date-name='${name},${sys.country}'>
        <span>${name}</span>
        <span>${sys.country}</span>
      </h2>
      <div class='city-temp'>${main.temp}</div>
      <figure>
        <img class='city-icon' src='${icon}' alt ='city' >
        <figurecaption>${weather[0].description}</figurecaption>
      </figure>
    `;
    li.innerHTML = markup;
    list.appendChild(li);
    msg.innerHTML = "";
  } else {
    msg.innerHTML = message;
  }
  input.value = "";
}
