if(process.env.NODE_ENV === 'production'){
  module.exports = require('./keys_prod');
} else {
  module.exports = require('./keys_dev');
}


// module.exports = {
//   mongoURI: "mongodb://mappy:mappy123@ds131902.mlab.com:31902/new-test",
//   secretOrKey: 'secret',
// };
