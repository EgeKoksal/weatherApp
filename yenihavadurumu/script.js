// api alma kısmı
const url = "https://api.openweathermap.org/data/2.5/";
const key = "1b49719169e48516aafdf0c011b384ac";

const setQuery = (e) => {
  if (e.keyCode == "13")
    // bu enter tuşunun key kodunu belli ediyor (13)bilmezsin tabi
    getResult(searchBar.value);
};

const getResult = (cityName) => {
  let query = `${url}weather?q=${cityName}&appid=${key}&units=metric&lang=tr`;
  fetch(query)
    .then((weather) => {
      return weather.json();
    })
    .then(displayResult);
};

// aşağıdaki de async ve await kullanılmış hali

/*
const getResult = async (cityName) => {
    let query = `${url}weather?q=${cityName}&appid=${key}&units=metric&lang=tr`

    try {
        const response = await fetch(query); // fetch'in tamamlanmasını bekle
        const weather = await response.json(); // JSON'a çevrilmesini bekle
        displayResult(weather); // Sonucu göster
    } catch (error) {
        console.error("Bir hata oluştu: ", error); // Hataları yakala
    }
}
*/

const displayResult = (result) => {
  let city = document.querySelector(".city");
  city.innerText = `${result.name}, ${result.sys.country}`;

  let temp = document.querySelector(".temp");
  temp.innerText = `${Math.round(result.main.temp)} °C `;

  let desc = document.querySelector(".desc");
  desc.innerText = `${result.weather[0].main}`;

  let minmax = document.querySelector(`.minmax`);
  minmax.innerText = `${Math.round(result.main.temp_min)} °C / ${Math.round(
    result.main.temp_max
  )} °C `;

  const rain = document.querySelector(".rain");
  const cloud = document.querySelector(".cloud");
  const mist = document.querySelector(".mist");
  const mist1 = document.querySelector(".mist1");
  const sun = document.querySelector(".sun");

  rain.style.display = "none";
  cloud.style.display = "none";
  mist.style.display = "none";
  mist1.style.display = "none";
  sun.style.display = "none";

  // Hava durumu durumuna göre uygun elementi göster
  switch (result.weather[0].main) {
    case "Clear":
      sun.style.display = "block";
      break;
    case "Clouds":
      cloud.style.display = "block";
      break;
    case "Rain":
      rain.style.display = "block";
      break;
    case "Mist":
      mist.style.display = "block";
      mist1.style.display = "block";
      break;
    default:
      console.log("Bilinmeyen hava durumu durumu");
  }
};

const searchBar = document.getElementById("searchBar");
searchBar.addEventListener("keypress", setQuery);

//hava durumlarını animasyonlara bağlama

// YAĞMUR DAMLALARI
function rain() {
  let cloud = document.querySelector(".rain");
  let aaa = document.createElement("div");
  let left = Math.floor(Math.random() * 230);

  aaa.classList.add("drop");
  cloud.appendChild(aaa);
  aaa.style.left = left + "px";

  setTimeout(function () {
    cloud.removeChild(aaa);
  }, 2000);
}

setInterval(function () {
  rain();
}, 20);
