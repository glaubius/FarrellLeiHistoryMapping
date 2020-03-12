console.log('L', L);

const position = [44.12, -99.2];
const layer = new L.StamenTileLayer("terrain");
const map = L.map('map').setView(position, 7);

map.addLayer(layer);

function onEachFeature(feature, layer) {
  if (feature.properties && feature.properties.popupContent) {
    layer.bindPopup(feature.properties.popupContent);
  }
}

var propertyBoundaries = {
"type": "FeatureCollection",
"name": "PropertyBoundaries",
"crs": { "type": "name", "properties": { "name": "urn:ogc:def:crs:OGC:1.3:CRS84" } },
"features": [
{ "type": "Feature", "properties": { "id": 1, "name": "Charles E. Farrell Homestead", }, "geometry": { "type": "MultiPolygon", "coordinates": [ [ [ [ -101.430760506495659, 44.820168895958133 ], [ -101.420525419981175, 44.820192829916429 ], [ -101.420608562326564, 44.805775816405358 ], [ -101.430551377935927, 44.805859222003932 ], [ -101.430760506495659, 44.820168895958133 ] ] ] ] } },
{ "type": "Feature", "properties": { "id": 2, "name": "Giphart Lei Homestead",  }, "geometry": { "type": "MultiPolygon", "coordinates": [ [ [ [ -103.426636247997607, 45.335893656665476 ], [ -103.406017335663222, 45.33592641048994 ], [ -103.405940877390464, 45.33191036667592 ], [ -103.415521413398281, 45.332128594710667 ], [ -103.415481492238882, 45.328729661423083 ], [ -103.426591288015302, 45.328785625173829 ], [ -103.431432713891468, 45.328834490946612 ], [ -103.431311273913849, 45.335908859619799 ], [ -103.426636247997607, 45.335893656665476 ] ] ] ] } }
]
};

var boundariesStyle = {
  "color": "#ff0000",
  "weight": 3,
};

var locationPopups = {
  "type": "FeatureCollection",
  "name": "LocationPopups",
  "features": [
    { "type": "Feature",
      "properties": {
        "id": 1,
        "name": "Charles E. Farrell Homestead", "popupContent": "<strong>Charles E. Farrell Homestead</strong> <br>Granted 26 November, 1920 by President Woodrow Wilson <br>east 1/2 of Section 21 in Township 10 N of Range 22 E of the Black Hills Meridian, South Dakota, containing 320 acres",
      },
    "geometry": {
      "type": "Point",
      "coordinates": [-101.430760506495659, 44.820168895958133]
    }},
    { "type": "Feature",
      "properties": {
        "id": 1,
        "name": "Giphart Lei Homestead", "popupContent": "<strong>Giphart Lei Homestead</strong> <br>Granted 19 January, 1922 by President Warren G. Harding <br>East 1/2 of the SE 1/4 of Section 19 and SW 1/4 and N 1/2 of the SE 1/4 of Section 20 in Township 16 N of Range 6 E of the Black Hills Meridian, South Dakota, containing 320 acres",
      },
    "geometry": {
      "type": "Point",
      "coordinates": [-103.426636247997607, 45.335893656665476]
    }},
  ]
};

L.geoJSON(propertyBoundaries, {
  style: boundariesStyle
}).addTo(map);

L.geoJSON(locationPopups, {
  onEachFeature: onEachFeature
}).addTo(map);

map.on('popupopen', function(centerMarker) {
  const zoomLvl = 13;
  let cM = map.project(centerMarker.popup._latlng);

  cM.y -= centerMarker.popup._container.clientHeight / 2;
  console.log(map.unproject(cM));
  map.setView(map.unproject(cM), zoomLvl, {animate: true});
});

console.log('map', map);
