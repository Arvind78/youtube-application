const mongoose = require('mongoose');
const dbConnection =()=>{
   mongoose.connect(process.env.MongoDb).then(()=>{
     console.log(`database Connected!`)
   })
   .catch((err)=>{throw(err)})
}
module.exports = dbConnection
