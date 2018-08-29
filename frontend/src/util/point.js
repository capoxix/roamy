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
    
    //find the dLat dLng
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
}

export default Point;

function cloudGenerator(lat ,lng, minutes) {
  const origin = new Point({
    lat: lat,
    lng: lng,
    minutes: minutes
  })
  const endPoints = [];
  
  // should pass in origin object instead
  endPoints = origin.initEndPoints() 
  
  // while (not perfect) {
  // do async matrix call one at a time FIRST!!!! OI
  endPoints.forEach((point) => point.adjustPoint(resMinutes))
}

let o = new Point({lat: 37.7990, lng: -122.4014, minutes: 20})