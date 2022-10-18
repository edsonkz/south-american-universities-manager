import mongoose from "mongoose";


const mongo = mongoose;
var url = "mongodb://localhost:27017/south_america_universities";

const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

export { url, mongo, connectionParams };