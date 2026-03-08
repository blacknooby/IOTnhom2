const langData={

en:{
temp:"Temperature",
humidity:"Humidity",
rain:"Rain",
wind:"Wind Speed",
history:"Sensor History",
forecast:"Weather Forecast",
oldForecast:"Forecast History"
},

vi:{
temp:"Nhiệt độ",
humidity:"Độ ẩm",
rain:"Lượng mưa",
wind:"Tốc độ gió",
history:"Lịch sử cảm biến",
forecast:"Dự báo thời tiết",
oldForecast:"Lịch sử dự báo"
}

};

function setLang(lang){

document.querySelectorAll("[data-lang]").forEach(el=>{

let key=el.getAttribute("data-lang");

el.innerText=langData[lang][key];

});

}
