
function login(){

let user = document.getElementById("username").value;
let pass = document.getElementById("password").value;

if(user === "nhom2" && pass === "nhom2"){

window.location.href="dashboard.html";

}else{

document.getElementById("error").innerText="Sai tài khoản hoặc mật khẩu";

}

}


function logout(){

window.location.href="index.html";

}


/* Fake sensor data */

function randomData(){

let temp = (20 + Math.random()*10).toFixed(1);
let hum = (60 + Math.random()*20).toFixed(1);
let rain = (Math.random()*5).toFixed(1);
let wind = (Math.random()*8).toFixed(1);

if(document.getElementById("temp")){

document.getElementById("temp").innerText=temp+" °C";
document.getElementById("humidity").innerText=hum+" %";
document.getElementById("rain").innerText=rain+" mm";
document.getElementById("wind").innerText=wind+" m/s";

}

}

setInterval(randomData,2000);
