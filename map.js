var map = L.map('map').setView([10.98, 106.65], 8);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19
}).addTo(map);

// Tạo icon tùy chỉnh bằng HTML & CSS thay vì dùng ảnh tĩnh
var weatherIcon = L.divIcon({
    className: 'custom-marker', // Class CSS để style
    html: '<div class="marker-content">📡</div>', // Bạn có thể đổi 📡 thành 🌤️ hoặc 📍 tùy thích
    iconSize: [44, 44],
    iconAnchor: [22, 44], // Điểm neo ở giữa phía dưới cùng của icon
    popupAnchor: [0, -44] // Popup sẽ mở ra ở phía trên icon
});

// Thêm marker vào bản đồ với icon mới
var marker = L.marker([10.98, 106.65], { icon: weatherIcon }).addTo(map);

// Chút điệu đà cho nội dung popup
marker.bindPopup("<b>IoT Weather Station</b><br>Trạm Nhóm 2 đang hoạt động!").openPopup();
