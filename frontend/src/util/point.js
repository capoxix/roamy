const NodeGeocoder = require('node-geocoder');

class Point {
  constructor({lat, lng, minutes, angle}){
    this.lat = lat;
    this.lng = lng;
    this.minutes = minutes;
    this.angle = angle;
    this.static = false;
  }

  static makeDestinationsStr(endPoints) {
    let destinations = `&destinations=`

    for (let i = 0; i < endPoints.length; i++) {
      destinations = destinations +  endPoints[i].getLatLng();
    }

    return destinations
  }

  static modify(endPoints) {
    const activePoints = [];
    
    for(let i = 0; i < endPoints.length; i++) {
      if (endPoints[i].static === false) {activePoints.push(endPoints[i])}
    }
    console.log('before', endPoints)
    console.log('after', activePoints)
    return activePoints;
  }

  static inPacific(endPoints) {

    for (let i = 0; i < endPoints.length; i++) {
      endPoints[i].tooFar(); 
    }
  }

  createEndPoint(currentAngle, dLat, dLng) {
    let pLng = this.lng + (dLng * Math.cos((currentAngle * Math.PI)/ 180))
    let pLat = this.lat + (dLat * Math.sin((currentAngle * Math.PI)/ 180))
    const newPoint = new Point({
      lat: pLat,
      lng: pLng,
      angle: currentAngle
    })
    return newPoint
  }

  initEndPoints() {
    const pointsArr = [];
    const dLat = 0.003604 * this.minutes;
    const dLng =  0.0045402 * this.minutes;

    let numPoints = 4;
    let angle = 360 / numPoints;
    let currentAngle = 0;
  
    while (currentAngle < 360) { 
      let newPoint = this.createEndPoint(currentAngle, dLat, dLng)
      pointsArr.push(newPoint)
  
      currentAngle += angle;
    }

    return pointsArr;
  }



  // Adjust existing endpoints 
  //
  adjustPoints(endPoints, data, addresses) {
    const options = {
      provider: 'google',
      apiKey: 'AIzaSyDBghaO6vALAG_-QG2SCBN8LEB_jFM6o1Q'
    }
    const geocoder = NodeGeocoder(options)

    geocoder.geocode('825 Battery St, San Francisco, CA')
      .then((res) => {
        console.log(res[0])
        console.log(res[0].latitude)
        console.log(res[0].longitude)
      })


    for (let i = 0; i < endPoints.length; i++) {
      this.check(endPoints[i], data[i], addresses[i], i)
    }
    
  }
  
  check(endPoint, datum, address, i) {
    if (datum.status === "ZERO_RESULTS") {
      endPoint.destroy = true;
      return
    } else if (endPoint.static) {
      endPoint.minutes = datum.duration.value / 60;
      // geolocate point based on address
      return 
    }
    endPoint.minutes = datum.duration.value / 60;
    let origin = this;
    console.log('item: ', i)
    console.log(endPoint)
    console.log('minutes: ', endPoint.minutes)
    console.log('address: ', address)
    
    if (Math.abs(this.minutes - endPoint.minutes) < 1.2) {
      // reassign the point to the address given and make point static
      console.log('close enough -------------------')
      console.log('')
      console.log('')
      endPoint.static = true;
    } else {
      endPoint.adjust(origin)
      console.log('')
      console.log('')
    }

  }

  adjust(origin) {

    let oLat = Math.abs(origin.lat);
    let oLng = Math.abs(origin.lng);

    let tLat = Math.abs(this.lat);
    let tLng = Math.abs(this.lng);

    let hypotenuse = Math.sqrt(Math.pow(oLat - tLat, 2) + Math.pow(oLng - tLng, 2));

    let newHypotenuse = hypotenuse * (origin.minutes / this.minutes);

    const scaleLat = Math.sin((Math.PI * this.angle) / 180) * newHypotenuse;
    const scaleLng = Math.cos((Math.PI * this.angle) / 180) * newHypotenuse;

    this.lat = origin.lat + scaleLat;
    this.lng = origin.lng + scaleLng;
    console.log('new lat: ', this.lat)
    console.log('new lng: ', this.lng)
    this.tooFar();


  }


 
  // Query String functions
  //
  getLatLng() {
    return `${this.lat}%2C${this.lng}%7C`
  }
  
  makeStartStr() {
    const header = 'https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial';
    const origin = `&origins=${this.lat},${this.lng}`;
    return header + origin;
  }

  makeSearchStr(endPoints) {
    const start = this.makeStartStr();
    const destinations = Point.makeDestinationsStr(endPoints);
    const key = '&key=AIzaSyDBghaO6vALAG_-QG2SCBN8LEB_jFM6o1Q'
    return start + destinations + key
  }



  // EndPoint check
  //

  tooFar() {
    const topLat = 37.8135;
    const westLng = -122.5220;

    if (this.lat < topLat) {
      if (this.lng < westLng) {
        this.lng = westLng;
        this.static = true;
      }
    }
  }
}

// let o = new Point({lat: 37.7990, lng: -122.4014, minutes: 10})
// let d1 = new Point({lat: 37.775181, lng: -122.409909})
// let d2 = new Point({lat: 37.781402, lng:  -122.411327})
// let arr = o.initEndPoints();

// o.makeSearchStr([d1, d2]);

module.exports = Point;


//  lat: 37.72254761481811,
// lng: -122.3050878137617,
//  minutes: undefined,
//  angle: 315,
//   static: false 
//  32.916666666666664
//  120 Creedon Cir, Alameda, CA 94502, USA
// new lat:  37.74973012658228
//  new lng:  -122.33933144303798
  
