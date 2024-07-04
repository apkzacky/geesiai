import mongoose from 'mongoose'

const MONGODB_URI = process.env.DB_CONNECTION


const connect = async () => {
    const connectState = mongoose.connection.readyState

    if (connectState === 1) {
        console.log('already connected')
        return
    }
    if (connectState === 2) {
        console.log('Connecting')
        return
    }


    try {
        await mongoose.connect(MONGODB_URI, {
            dbName: 'GeesiAI',
            bufferCommands: false
        })
        console.log('Mongodb Connected')
    } catch (error) {
        console.log(error.message)
        throw new Error('Error connecting to db')
    }


}

export default connect;