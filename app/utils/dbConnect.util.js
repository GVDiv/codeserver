import { connect } from "mongoose";

async function dbConnect(){
    try {
        await connect(process.env.MONGO_URI)
        console.log("connected to mongo databse")
    } catch (error) {
        console.log(error)
    }
}

export default dbConnect