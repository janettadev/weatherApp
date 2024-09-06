const container = document.querySelector(".container");
const search = document.querySelector(".search-box button");
const weatherBox = document.querySelector(".weather-box");
const weatherDetails = document.querySelector(".weather-details");
const error = document.querySelector(".not-found");

search.addEventListener("click", () => {
	const API_KEY = "e00d1fafa3f6a8e4499dd23ecd533947";
	const city = document.querySelector(".search-box input").value;
   if(city == '')
      return
   

	fetch(
		`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
	)
		.then((res) => res.json())
		.then((json) => {

			if (json.cod == "404") {
				container.style.height = "400px";
				weatherBox.classList.remove('active');
				weatherDetails.classList.remove('active');
				error.classList.add('active');
				return;
			}
			container.style.height = "555px";
			weatherBox.classList.add("active");
			weatherDetails.classList.add("active");
			error.classList.remove("active");

			const image = document.querySelector(".weather-box img");
			const temperature = document.querySelector(
				".weather-box .temperature"
			);
			const description = document.querySelector(
				".weather-box .description"
			);
			const humidity = document.querySelector(
				".weather-details .humidity span"
			);
			const wind = document.querySelector(".weather-details .wind span");

			switch (json.weather[0].main) {
				case "Clear":
					image.src = "img/sun_9231728.png";
					break;
				case "Rain":
					image.src = "img/rain.png";
					break;
				case "Snow":
					image.src = "img/snow.png";
					break;
				case "Clouds":
					image.src = "img/clouds-and-sun.png";
					break;
				case "Mist":
					image.src = "img/mist.png";
					break;
				case "Haze":
					image.src = "img/mist.png";
					break;
				default:
					image.src = "img/clouds-and-sun.png";
			}

			temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
			description.innerHTML = `${json.weather[0].description}`;
			humidity.innerHTML = `${json.main.humidity}%`;
			wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;
		});
});
