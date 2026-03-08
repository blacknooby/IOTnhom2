var map = L.map('map').setView([10.98,106.65], 8);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
maxZoom:19
}).addTo(map);


var marker = L.marker([10.98,106.65]).addTo(map);

marker.bindPopup("Weather Station").openPopup();
