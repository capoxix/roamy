class Point {
  constructor({lat, lng, minutes, angle}){
    this.lat = lat;
    this.lng = lng;
    this.minutes = minutes;
    this.angle = angle;
    this.draw = false;
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

    let numPoints = 2;
    let angle = 360 / numPoints;
    let currentAngle = 0;
  
    while (currentAngle < 360) { 
      let newPoint = this.createEndPoint(currentAngle, dLat, dLng)
      pointsArr.push(newPoint)
  
      currentAngle += angle;
    }

    return pointsArr;
  }

  adjustEndPoints(endPoints, times, addresses) {

    for (let i = 0; i < endPoints.length; i++) {
      endPoints[i].checkEndPoint(this, times[i], addresses[i])
    }
    
  }
  
  checkEndPoint(origin, data, address) {
    let minutes = data.duration.value / 60;

    if (Math.abs(origin.minutes - minutes) < 75) {
      // use the address to keep the exact point
      console.log(address)
    } else {
      this.adjustPoint(origin, minutes)
    }

  }

  adjustPoint(origin, resultMins) {
    const scaleLat = Math.sin(Math.PI * this.angle/180)*(origin.minutes* Math.abs(this.lat - origin.lat)/resultMins)
    const scaleLng = Math.cos(Math.PI * this.angle/180)*(origin.minutes* Math.abs(this.lng - origin.lng)/resultMins)

    this.lat = origin.lat + scaleLat;
    this.lng = origin.lng + scaleLng;
  }

  
  // Query String functions
  getLatLng() {
    return `${this.lat}%2C${this.lng}%7C`
  }

  makeSearchStr(endPoints) {
    // resp = await fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${lat}+${long}&destination=${point.lat},%20${long}&key=AIzaSyDBghaO6vALAG_-QG2SCBN8LEB_jFM6o1Q`);
    const start = this.makeStartStr();
    const destinations = Point.makeDestinationsStr(endPoints);
    const key = '&key=AIzaSyDBghaO6vALAG_-QG2SCBN8LEB_jFM6o1Q'
    return start + destinations + key
  }
  
  makeStartStr() {
    const header = 'https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial';
    const origin = `&origins=${this.lat},${this.lng}`;
    return header + origin;
  }
  
  static makeDestinationsStr(endPoints) {
    let destinations = `&destinations=`

    for (let i = 0; i < endPoints.length; i++) {
      destinations = destinations +  endPoints[i].getLatLng();
    }

    return destinations
  }
}

// let o = new Point({lat: 37.7990, lng: -122.4014, minutes: 10})
// let d1 = new Point({lat: 37.775181, lng: -122.409909})
// let d2 = new Point({lat: 37.781402, lng:  -122.411327})
// let arr = o.initEndPoints();

// o.makeSearchStr([d1, d2]);

module.exports = Point;