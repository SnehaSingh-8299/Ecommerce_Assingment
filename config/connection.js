const mongoose = require("mongoose");
global.ObjectId = mongoose.Types.ObjectId;
module.exports.mongodb = async () => {
    mongoose.connect(process.env.MONGODB_URL, {
        useUnifiedTopology: true,
        // useFindAndModify: false,
        useNewUrlParser: true,
        // useCreateIndex: true,

    }).then(
        () => { /** ready to use. The `mongoose.connect()` promise resolves to undefined. */
            console.log("MongoDb Connected");
        },
        err => { /** handle initial connection error */
            console.log("Mongo", err);
        }
    );   
    
};