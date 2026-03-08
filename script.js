function login() {
    let u = document.getElementById("username").value;
    let p = document.getElementById("password").value;

    if (u === "nhom2" && p === "nhom2") {
        window.location = "dashboard.html";
    } else {
        document.getElementById("error").innerText = "Sai tài khoản";
    }
}

function logout() {
    window.location = "index.html";
}

/* Theme toggle */
function toggleTheme() {
    if (document.body.classList.contains("light")) {
        document.body.classList.remove("light");
    } else {
        document.body.classList.add("light");
    }
}

/* Sensor simulation & Chart */
let chart;

function initChart() {
    let ctx = document.getElementById("chart").getContext("2d");

    let gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, 'rgba(49, 130, 206, 0.5)'); 
    gradient.addColorStop(1, 'rgba(49, 130, 206, 0.0)');

    chart = new Chart(ctx, {
        type: "line",
        data: {
            labels: [],
            datasets: [{
                label: "Temperature (°C)",
                data: [],
                borderColor: "#3182ce", 
                backgroundColor: gradient, 
                borderWidth: 3,
                tension: 0.4, 
                fill: true,
                pointBackgroundColor: "#ffffff",
                pointBorderColor: "#3182ce",
                pointRadius: 4,
                pointHoverRadius: 6
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false, 
            scales: {
                y: {
                    suggestedMin: 15,
                    suggestedMax: 40,
                    grid: {
                        color: "rgba(160, 174, 192, 0.1)" 
                    },
                    ticks: {
                        color: "#a0aec0"
                    }
                },
                x: {
                    grid: {
                        display: false 
                    },
                    ticks: {
                        color: "#a0aec0"
                    }
                }
            },
            plugins: {
                legend: {
                    labels: {
                        color: "#a0aec0",
                        font: {
                            family: "'Poppins', sans-serif"
                        }
                    }
                }
            }
        }
    });
}

let historyForecast = [];

function updateSensor() {
    let temp = (20 + Math.random() * 10).toFixed(1);
    let hum = (60 + Math.random() * 20).toFixed(1);
    let rain = (Math.random() * 5).toFixed(1);
    let wind = (Math.random() * 8).toFixed(1);

    document.getElementById("temp").innerText = temp + " °C";
    document.getElementById("humidity").innerText = hum + " %";
    document.getElementById("rain").innerText = rain + " mm";
    document.getElementById("wind").innerText = wind + " m/s";

    let time = new Date().toLocaleTimeString('vi-VN', { hour12: false });

    chart.data.labels.push(time);
    chart.data.datasets[0].data.push(temp);

    if (chart.data.labels.length > 15) {
        chart.data.labels.shift();
        chart.data.datasets[0].data.shift();
    }

    chart.update('none');

    /* Weather conclusion */
    let forecast;
    if (rain > 3) {
        forecast = "Heavy rain expected";
    } else if (hum > 80) {
        forecast = "Cloudy weather";
    } else if (temp > 30) {
        forecast = "Hot sunny day";
    } else {
        forecast = "Normal weather";
    }

    document.getElementById("forecastText").innerText = forecast;

    historyForecast.unshift(time + " - " + forecast);
    let list = document.getElementById("forecastHistory");
    list.innerHTML = "";

    historyForecast.slice(0, 5).forEach(i => {
        let li = document.createElement("li");
        li.innerText = i;
        list.appendChild(li);
    });
}

window.onload = function() {
    if (document.getElementById("chart")) {
        initChart();
        setInterval(updateSensor, 2000);
    }
};
