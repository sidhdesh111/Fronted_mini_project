const API_Key = "19749503f3cf4ee576dc616c454f0431";
const Location_URL = "http://api.openweathermap.org/geo/1.0/direct?";
const Weather_URL = "https://api.openweathermap.org/data/2.5/weather?&units=metric";

const clear = 'images/clear.png';
const cloud = 'images/clouds.png';
const drizzle = 'images/drizzle.png';
const mist = 'images/mist.png';
const snow = 'images/snow.png';
const rain = 'images/rain.png';


let q = "Allahabad";
get_location(API_Key, Location_URL, q);

function get_location_name() {
    let input_data = document.querySelector('.input_search_field');
    let location_name = input_data.value;
    get_location(API_Key, Location_URL, location_name);

}

async function get_location(API, URL, location) {

    let response = await fetch(`${URL}&q=${location}&appid=${API}`)

    let data = await response.json();
    // console.log(data);

    let longitude = data[0].lon;
    let latitude = data[0].lat;
    get_weater(longitude, latitude);
}



async function get_weater(lon, lat) {
    console.log(lon, lat);

    let res = await fetch(`${Weather_URL}&lon=${lon}&lat=${lat}&appid=${API_Key}`);
    let weather_data = await res.json();
    console.log(weather_data);
    // console.log(weather_data.name);
    // console.log(weather_data.main.temp);
    // console.log(weather_data.main.humidity);
    // console.log(weather_data.weather[0].main);
    let weather_type = weather_data.weather[0].main;
    let location_name = weather_data.name;
    let location_temp = weather_data.main.temp;
    let humidity = weather_data.main.humidity;
    let speed = weather_data.wind.speed;

    let loc_name = document.querySelector(".card .temp_area h3");
    let loc_temp = document.querySelector(".card .temp_area .temp");
    let loc_humidity = document.querySelector(".card .feature .humidity h2");
    let loc_speed = document.querySelector(".card .feature .wind h2");
    let weather_img_tag = document.querySelector(".card .temp_area img");
    let weather_image = weather_img_tag.getAttribute("src");
    switch (weather_type) {
        case 'Rain':
            weather_img_tag.setAttribute("src", rain);
            break;
        case 'Clouds':
           weather_img_tag.setAttribute("src", cloud);
            break;
        case 'Drizzle':
           weather_img_tag.setAttribute("src", drizzle);
            break;
        case 'Snow':
        weather_img_tag.setAttribute("src", snow);
            break;
        case 'Mist':
           weather_img_tag.setAttribute("src", mist);
            case 'Clear':
           weather_img_tag.setAttribute("src", clear);
            break;
        default:
            break;
    }

    loc_name.innerHTML = location_name;
    loc_temp.innerHTML = `${location_temp}°C`;
    loc_humidity.innerHTML = `${humidity}%`;
    loc_speed.innerHTML = `${speed} Km/h`;
}

