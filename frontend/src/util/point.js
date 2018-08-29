class Point {
    constructor({lat, lng, minutes, angle}){
      this.lat = lat;
      this.lng = lng;
      this.minutes = minutes;
      this.angle = angle;
      this.draw = false;
    }
    // this.distance = distance;
    // this.time= time;
    // rescaleLong (resTime) {
    //   newScale = (minutes * (Math.abs(this.long - long)) / resTime);
    //   this.long = newScale;
    // }
    
    // rescalePoint (resTime) {
    //   point.long = long+difference;
    // }
    static createEndPoint(startPoint, currentAngle, dLat, dLng) {
      let pLng = startPoint.lng + (dLng * Math.cos((currentAngle * Math.PI)/ 180))
      let pLat = startPoint.lat + (dLat * Math.sin((currentAngle * Math.PI)/ 180))
      const newPoint = new Point({
        lat: pLat,
        lng: pLng,
        angle: currentAngle
      })
      return newPoint
    }
    static initEndPoints(lat, lng, minutes) {
      const pointsArr = [];
    
      const startPoint = new Point({
        lat: lat,
        lng: lng,
        minutes: minutes
      })
      
      //find the dLat dLng
      const dLat = 0.003604 * startPoint.minutes;
      const dLng =  0.0045402 * startPoint.minutes;
      // debugger
      let numPoints = 8;
      let angle = 360 / numPoints;
      let currentAngle = 0;
    
      while (currentAngle < 360) { 
        let newPoint = Point.createEndPoint(startPoint, currentAngle, dLat, dLng)
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
  endPoints = Point.initEndPoints(lat, lng, minutes) 
  
  // while (not perfect) {
  // do async matrix call one at a time FIRST!!!! OI
  endPoints.forEach((point) => point.adjustPoint(resMinutes))
    