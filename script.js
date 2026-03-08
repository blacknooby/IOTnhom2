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

    chart = new Chart(ctx, {
        type: "line",
        data: {
            labels: [],
            datasets: [
                {
                    label: "Temperature (°C)",
                    data: [],
                    borderColor: "#ff6b6b", // Màu đỏ
                    borderWidth: 2,
                    tension: 0.4,
                    pointRadius: 3,
                    pointHoverRadius: 5
                },
                {
                    label: "Humidity (%)",
                    data: [],
                    borderColor: "#4dabf7", // Màu xanh dương
                    borderWidth: 2,
                    tension: 0.4,
                    pointRadius: 3,
                    pointHoverRadius: 5
                },
                {
                    label: "Rain (mm)",
                    data: [],
                    borderColor: "#51cf66", // Màu xanh lá
                    borderWidth: 2,
                    tension: 0.4,
                    pointRadius: 3,
                    pointHoverRadius: 5
                },
                {
                    label: "Wind Speed (m/s)",
                    data: [],
                    borderColor: "#fcc419", // Màu vàng
                    borderWidth: 2,
                    tension: 0.4,
                    pointRadius: 3,
                    pointHoverRadius: 5
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false, 
            interaction: {
                mode: 'index',
                intersect: false,
            },
            scales: {
                y: {
                    title: {
                        display: true,
                        text: 'Sensor Values',
                        color: '#a0aec0',
                        font: { family: "'Poppins', sans-serif", weight: 600 }
                    },
                    suggestedMin: 0,
                    suggestedMax: 100,
                    grid: {
                        color: "rgba(160, 174, 192, 0.1)" 
                    },
                    ticks: {
                        color: "#a0aec0"
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Time',
                        color: '#a0aec0',
                        font: { family: "'Poppins', sans-serif", weight: 600 }
                    },
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
                        },
                        usePointStyle: true,
                        boxWidth: 8
                    }
                },
                tooltip: {
                    bodyFont: { family: "'Poppins', sans-serif" },
                    titleFont: { family: "'Poppins', sans-serif" }
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

    // Cập nhật trục thời gian (X)
    chart.data.labels.push(time);
    
    // Cập nhật dữ liệu cho cả 4 đường (Y)
    chart.data.datasets[0].data.push(temp);
    chart.data.datasets[1].data.push(hum);
    chart.data.datasets[2].data.push(rain);
    chart.data.datasets[3].data.push(wind);

    // Giữ lại 15 điểm dữ liệu gần nhất để khung hình không bị đặc xịt
    if (chart.data.labels.length > 15) {
        chart.data.labels.shift();
        chart.data.datasets[0].data.shift();
        chart.data.datasets[1].data.shift();
        chart.data.datasets[2].data.shift();
        chart.data.datasets[3].data.shift();
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
