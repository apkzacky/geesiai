import mongoose, { model, models } from "mongoose";

const { Schema } = mongoose;



const feedbackSchama = new Schema({
    email: {
        type: String,
        require: true,
    },
    name: {
        type: String,
        require: true,
    },
    message: {
        type: String,
        require: true,
    }
});

const Feedback = models.Feedback || model("Feedback", feedbackSchama)

export default Feedback;