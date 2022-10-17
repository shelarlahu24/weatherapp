const searchBtn = document.getElementById("search-btn");
const search = document.getElementById("search");
const errorMsg = document.getElementById("error");
const temp = document.getElementById("temp");
const city = document.getElementById("city");
const weather = document.getElementById("status");
const today = document.getElementById("today");
const dat = document.getElementById("dat");



const getInfo = async (e) => {
  e.preventDefault();
  let searchVal = search.value;
  if (searchVal === "") {
    search.classList.add("is-invalid")
    errorMsg.style.display = "block";
  } else {
    search.classList.remove("is-invalid")
    errorMsg.style.display = "none";

    let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchVal}&units=metric&appid=7c33d8e96ed4c7fd36c3e7e808030972
`;
    try {
      const res = await fetch(url);
      const data = await res.json();
      const arrData = [data];

      let sts = arrData[0].weather[0].main;
      if (sts === "Clear") {
        weather.innerHTML = `<i class="fa fa-cloud-sun fa-6x my-2"></i>`;
      } else if (sts === "Rain") {
        weather.innerHTML = `<i class="fa fa-cloud-rain fa-6x my-2"></i>`;
      } else {
        weather.innerHTML = `<i class="fa fa-cloud fa-6x my-2"></i>`;
      }

      temp.innerHTML = `${arrData[0].main.temp}&#8451;`;
      city.innerText = `${arrData[0].name}, ${arrData[0].sys.country}`;
    } catch (error) {
      search.classList.add("is-invalid")
      errorMsg.style.display = "block";
      console.log(error);
    }

  }
}

searchBtn.addEventListener("click", getInfo)

//get day fullname
let day;
const d = new Date()
switch (d.getDay()) {
  case 0:
    day = "Sunday";
    break;
  case 1:
    day = "Monday";
    break;
  case 2:
    day = "Tuesday";
    break;
  case 3:
    day = "Wednesday";
    break;
  case 4:
    day = "Thursday";
    break;
  case 5:
    day = "Friday";
    break;
  case 6:
    day = "Saturday";
}

today.innerText = day;

//date

const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

dat.innerText = `${d.getDate()} ${monthNames[d.getMonth()]} ${d.getFullYear()}`;
