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

    let numPoints = 1;
    let angle = 360 / numPoints;
    let currentAngle = 0;
  
    while (currentAngle < 360) { 
      let newPoint = this.createEndPoint(currentAngle, dLat, dLng)
      pointsArr.push(newPoint)
  
      currentAngle += angle;
    }

    return pointsArr;
  }
  
  getLatLng() {
    return `${this.lat}%2C${this.lng}%7C`
  }

  makeSearchStr() {
    // resp = await fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${lat}+${long}&destination=${point.lat},%20${long}&key=AIzaSyDBghaO6vALAG_-QG2SCBN8LEB_jFM6o1Q`);
    const start = this.makeStartStr();
    const destinations = `&destinations=34.150532%2C-118.444918`
    const key = '&key=AIzaSyDBghaO6vALAG_-QG2SCBN8LEB_jFM6o1Q'
    return start + destinations + key
  }
  
  makeStartStr() {
    const header = 'https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial';
    const origin = `&origins=${this.lat},${this.lng}`;
    return header + origin;
  }
  
  makeDestinationsStr(destinations) {
    let destinationStr = `&destinations=34.150532%2C-118.444918%7C`

    for (let i = 0; i < destinations.length; i++) {
      destinationStr = destinationStr +  destinations[i].getLatLng();
    }

    return destinationStr
  }
}

module.export = Point;

// async function cloudGenerator(lat ,lng, minutes) {
//   const origin = new Point({
//     lat: lat,
//     lng: lng,
//     minutes: minutes
//   })
//   const endPoints = [];
//   let cycles = 0;
  
 
//   endPoints = origin.initEndPoints()

  
  
//   // while (not perfect) {
//   // do async matrix call one at a time FIRST!!!! OI
//   endPoints.forEach((point) => point.adjustPoint(resMinutes))
// }

let o = new Point({lat: 37.7990, lng: -122.4014, minutes: 20})