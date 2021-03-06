class Point {
  constructor({lat, lng, minutes, angle}){
    this.lat = lat;
    this.lng = lng;
    this.minutes = minutes;
    this.angle = angle;
    this.static = false;
    this.destroy = false;
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
    return activePoints;
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

    let numPoints = 20;
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
      endPoint.address = address;
      return 
    }
    
    endPoint.minutes = datum.duration.value / 60;
    endPoint.address = address;
    let origin = this;
    
    if (Math.abs(this.minutes - endPoint.minutes) < 1.2) {
      endPoint.static = true;
    } else {
      endPoint.adjust(origin)
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
    
    this.inPacific();
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

  endPointsInWater(endPoints) {
  
    if (this.inPeninusla()) { 
      
      for (let i = 0; i < endPoints.length; i++) {
        endPoints[i].inPacific();
        endPoints[i].nearAngel();  
      }
    } else {
      
      for (let i = 0; i < endPoints.length; i++) {
        endPoints[i].inPacific(); 
      }
    }
  }

  inPacific() {
    const topLat = 37.8135;
    const westLng = -122.5220;
    
    if (this.lat < topLat) {
      if (this.lng < westLng) {
        this.lng = westLng;
        this.static = true;
      }
    }
  }

  nearAngel() {
    const topLat = 37.87214;
    const botLat = 37.814642;
    const westLng = -122.45507;
    const eastLng = -122.39318;

    if (this.lat < topLat
      && this.lat > botLat
      && this.lng > westLng
      && this.lng < eastLng) {
      this.lat = botLat;
      this.static = true;
    }
  }

  inPeninusla() {
    return (this.lat < 37.8116 && this.lng < -122.379249)
  }

}

module.exports = Point;


