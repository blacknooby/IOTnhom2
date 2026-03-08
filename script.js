function login(){

let u=document.getElementById("username").value;

let p=document.getElementById("password").value;

if(u==="nhom2" && p==="nhom2")

window.location="dashboard.html";

else

document.getElementById("error").innerText="Sai tài khoản";

}

function logout(){

window.location="index.html";

}

/* theme */
/* theme */

function toggleTheme(){

if(document.body.classList.contains("light")){

document.body.classList.remove("light");

}else{

document.body.classList.add("light");

}

}
/* sensor simulation */

let chart;

function initChart(){

let ctx=document.getElementById("chart");

chart=new Chart(ctx,{

type:"line",

data:{

labels:[],

datasets:[{

label:"Temp",

data:[],

borderColor:"cyan"

}]

}

});

}

let historyForecast=[];

function updateSensor(){

let temp=(20+Math.random()*10).toFixed(1);

let hum=(60+Math.random()*20).toFixed(1);

let rain=(Math.random()*5).toFixed(1);

let wind=(Math.random()*8).toFixed(1);

document.getElementById("temp").innerText=temp+" °C";

document.getElementById("humidity").innerText=hum+" %";

document.getElementById("rain").innerText=rain+" mm";

document.getElementById("wind").innerText=wind+" m/s";

let time=new Date().toLocaleTimeString();

chart.data.labels.push(time);

chart.data.datasets[0].data.push(temp);

if(chart.data.labels.length>10){

chart.data.labels.shift();

chart.data.datasets[0].data.shift();

}

chart.update();

/* weather conclusion */

let forecast;

if(rain>3)

forecast="Heavy rain expected";

else if(hum>80)

forecast="Cloudy weather";

else if(temp>30)

forecast="Hot sunny day";

else

forecast="Normal weather";

document.getElementById("forecastText").innerText=forecast;

historyForecast.unshift(time+" - "+forecast);

let list=document.getElementById("forecastHistory");

list.innerHTML="";

historyForecast.slice(0,5).forEach(i=>{

let li=document.createElement("li");

li.innerText=i;

list.appendChild(li);

});

}

window.onload=function(){

if(document.getElementById("chart")){

initChart();

setInterval(updateSensor,2000);

}

};
