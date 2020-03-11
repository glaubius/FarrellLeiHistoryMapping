console.log('L', L)

const position = [44.12, -99.2];
const map = L.map('map').setView(position, 7);

L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

console.log('map', map)
