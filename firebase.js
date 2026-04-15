import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getDatabase, onValue, ref } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyBuot6MSqGdTXu19kEMfONUvIpid323Fj4",
    authDomain: "aiotnhom2.firebaseapp.com",
    databaseURL: "https://aiotnhom2-default-rtdb.firebaseio.com",
    projectId: "aiotnhom2",
    storageBucket: "aiotnhom2.appspot.com",
};

// Khởi tạo Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// ĐƯỜNG DẪN CHUẨN THEO FIREBASE CỦA NHÓM
const LATEST_PATH = "weather_stations/Weather_station_1/latest";

function toNumber(value, fallback = null) {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : fallback;
}

function normalizeReading(id, reading) {
    return {
        id,
        temperature: toNumber(reading.temperature),
        humidity: toNumber(reading.humidity),
        rain: reading.rain, // GIỮ NGUYÊN ĐỂ NHẬN CHỮ "yes" HOẶC "no"
        pressure: toNumber(reading.pressure),
        timestamp: toNumber(reading.timestamp) > 9999999999 ? toNumber(reading.timestamp) : toNumber(reading.timestamp) * 1000
    };
}

function subscribeToWeatherReadings({ limit = 15, onData, onError }) {
    if (!database) {
        if (typeof onError === "function") onError(new Error("Firebase config is incomplete"));
        return () => {};
    }

    let localHistory = []; // Mảng tạm để lưu dữ liệu vẽ biểu đồ Chart.js

    // Chỉ trỏ vào nhánh 'latest' để lấy dữ liệu thời gian thực cho nhẹ web
    const latestRef = ref(database, LATEST_PATH);

    return onValue(
        latestRef,
        (snapshot) => {
            const data = snapshot.val();
            
            if (data) {
                // Chuẩn hóa dữ liệu Firebase trả về
                const reading = normalizeReading(data.timestamp, data);

                // Nạp vào mảng lịch sử nội bộ
                localHistory.push(reading);
                
                // Giới hạn số lượng điểm vẽ trên đồ thị (ví dụ 15 điểm)
                if (localHistory.length > limit) {
                    localHistory.shift(); 
                }

                if (typeof onData === "function") {
                    onData({
                        latest: reading,
                        history: localHistory
                    });
                }
            }
        },
        (error) => {
            if (typeof onError === "function") {
                onError(error);
            }
        }
    );
}

window.firebaseWeatherApi = {
    hasConfiguredFirebase: true,
    subscribeToWeatherReadings
};
