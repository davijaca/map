
const buses = [];

mapboxgl.accessToken = 'pk.eyJ1IjoiZGF2aWJlbnRpbSIsImEiOiJja3o2MTJmdHcwdzkyMm9wMWI5M241endzIn0.nC0f8b-Hw_VpAuy90kB2bQ';


var bostonMap = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v11',
  center: [-71.104081, 42.365554],
  zoom: 12.5,
});

async function getBusLocations(){
	const url = 'https://api-v3.mbta.com/vehicles';
	const response = await fetch(url);
	const geojson = await response.json();
	return geojson.data;

}

async function Update(){  
	const locations = await getBusLocations();

  locations.forEach((x,i) => {
    const location = [x.attributes.longitude, x.attributes.latitude];

    if (!buses.length || i >= buses.length) {
      var marker = new mapboxgl.Marker().setLngLat(location).addTo(bostonMap);

      buses.push(marker);
    }
    else {
      buses[i].setLngLat(location);
    }
  })
}

Update();
