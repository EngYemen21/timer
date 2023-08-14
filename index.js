
let country = document.getElementById("country");
let title_city = document.getElementById("title_city");
let cityOfSaudi =
    [
        {
            arabicName: "الرياض",
            name: "Ar Riyāḑ"
        },

        {
            arabicName: "تبوك",
            name: "Tabūk"
        },
        {
            arabicName: "القصيم",
            name: "Al Qaşīm"
        },
        {
            arabicName: "مكة المكرمة",
            name: "Makkah al Mukarramah"
        },
        {
            arabicName: "المدينة المنورة",
            name: "Al Madīnah al Munawwarah"
        }
    ]

for (let citiies of cityOfSaudi) {
    let content = `
     <option>${citiies.arabicName}</option>
     `
    country.innerHTML += content;
}

console.log(country);

country.addEventListener('change', function () {

    let city = document.getElementById("city");
    let cityName = "";
    city.innerHTML = country.value;
    for (let city1 of cityOfSaudi) {
        if (city1.arabicName === this.value) {
            cityName = city1.name;
        }
    }
    getInformation(cityName);
})

function getInformation(ci) {

    let params = {
        country: "SA",
        city: ci
    }
    axios.get("http://api.aladhan.com/v1/timingsByCity", {
        params: params
    })
        .then((data) => {
            const timing_day = data.data.data.date.hijri.day;
            const timing_week = data.data.data.date.hijri.weekday.ar;
            const timing_month = data.data.data.date.hijri.month.ar;
            const all_time = timing_week + " " + timing_day + "  " + timing_month;
            const timing = data.data.data.timings;
            fillTime("fajr-time", timing.Fajr);
            fillTime("dhur-time", timing.Dhuhr);
            fillTime("Asr-time", timing.Sunset);
            fillTime("magrap-time", timing.Maghrib);
            fillTime("Ashi-time", timing.Isha);
            fillTime("shrooq-time", timing.Sunrise);
            selectCity(country, city, title_city, all_time);

        }).catch((error) => {
            console.error(error);
        })
}
getInformation("Al Madīnah al Munawwarah");

function fillTime(id, timing) {
    document.getElementById(id).innerHTML = timing;
}
function selectCity(country, city, title_city, all_time) {
    title_city.innerHTML = all_time;
}


