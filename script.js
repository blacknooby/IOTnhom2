function login(){

let user=document.getElementById("username").value;

let pass=document.getElementById("password").value;

if(user==="nhom2" && pass==="nhom2"){

window.location="dashboard.html";

}

else{

document.getElementById("error").innerText="Sai tài khoản";

}

}


function logout(){

window.location="index.html";

}



/* SENSOR SIMULATION */

let chart;

function initChart(){

const ctx=document.getElementById("tempChart").getContext("2d");

chart=new Chart(ctx,{

type:"line",

data:{

labels:[],

datasets:[{

label:"Temperature",

data:[],

borderColor:"cyan",

fill:false

}]

},

options:{

scales:{y:{beginAtZero:false}}

}

});

}



function updateSensor(){

let temp=(20+Math.random()*10).toFixed(1);

let hum=(60+Math.random()*20).toFixed(1);

let rain=(Math.random()*5).toFixed(1);

let wind=(Math.random()*8).toFixed(1);


if(document.getElementById("temp")){

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

}

}



window.onload=function(){

if(document.getElementById("tempChart")){

initChart();

setInterval(updateSensor,2000);

}

};
