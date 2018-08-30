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

    let numPoints = 8;
    let angle = 360 / numPoints;
    let currentAngle = 0;
  
    while (currentAngle < 360) { 
      let newPoint = this.createEndPoint(currentAngle, dLat, dLng)
      pointsArr.push(newPoint)
  
      currentAngle += angle;
    }

    return pointsArr;
  }



  //
  // Adjust existing endpoints 
  //
  adjustPoints(endPoints, data, addresses) {

    for (let i = 0; i < endPoints.length; i++) {
      this.check(endPoints[i], data[i], addresses[i], i)
    }
    
  }
  
  check(endPoint, datum, address, i) {
    if (datum.status === "ZERO_RESULTS") {
      endPoint.destroy = true;
      return
    }
    endPoint.minutes = datum.duration.value / 60;
    let origin = this;
    console.log('item: ', i)
    console.log(endPoint)
    console.log(resultMins)
    console.log(address)
    
    if (Math.abs(this.minutes - endPoint.minutes) < 1.2) {
      // reassign the point to the address given and make point static
      console.log('close enough -------------------')
      console.log('')
      console.log('')
      this.static = true;
    } else {
      endPoint.adjust(origin)
      console.log('')
      console.log('')
    }

  }

  adjust(origin) {
    const scaleLat = Math.sin(Math.PI * this.angle/180)*(origin.minutes* Math.abs(this.lat - origin.lat)/this.minutes)
    const scaleLng = Math.cos(Math.PI * this.angle/180)*(origin.minutes* Math.abs(this.lng - origin.lng)/this.minutes)

    this.lat = origin.lat + scaleLat;
    this.lng = origin.lng + scaleLng;
    console.log('new lat: ', this.lat)
    console.log('new lng: ', this.lng)
  }



  //
  // Query String functions
  //
  getLatLng() {
    return `${this.lat}%2C${this.lng}%7C`
  }

  makeSearchStr(endPoints) {
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
  
  

  //
  // EndPoint check
  //

  tooFar() {
    const topLat = 37.8135;
    const westLng = -122.5220;

    console.log("------------")
    console.log(this.lat)
    console.log(this.lng)
    if (this.lat < topLat) {
      if (this.lng < westLng) {
        this.lng = westLng;
        this.static = true;
      }
    }
    console.log(this.lat)
    console.log(this.lng)
  }
}

// let o = new Point({lat: 37.7990, lng: -122.4014, minutes: 10})
// let d1 = new Point({lat: 37.775181, lng: -122.409909})
// let d2 = new Point({lat: 37.781402, lng:  -122.411327})
// let arr = o.initEndPoints();

// o.makeSearchStr([d1, d2]);

module.exports = Point;