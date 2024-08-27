import mongoose, { model, models } from "mongoose";

const { Schema } = mongoose;



const News_SubscribersSchama = new Schema({
    email: {
        type: String,
        require: true,
    }

});

const News_Subscribers = models.News_Subscribers || model("News_Subscribers", News_SubscribersSchama)

export default News_Subscribers;