import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
    title: {type: String, required: true, uppercase: true, trim: true, maxLength: 80},
    description: {type: String, required: true, trim: true, minLength: 20},
    createAt: {type: Date, default: Date.now, required: true,},
    hashtags: [{type: String, trim: true}],
    meta: {
        views: {type: Number, default: 0, required: true,},
        rating: {type: Number, default: 0, required: true,},
    },
});

videoSchema.pre('save', async function () {
    this.hashtags = this.hashtags[0].split(',').map(word => (
        word.startsWith(' ')? word.substr(1, word.length) : word
    )).map((word) => (
        word.startsWith('#')? word : `#${word}`
    ))
});

const Video = mongoose.model('Video', videoSchema);

export default Video;