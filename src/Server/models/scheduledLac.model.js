const mongoose = require("mongoose");

const reqString = {
    type: String,
    required: true,
    trim: true,
};

const scheduleLacSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user',
            required: true,
        },
        status:{type:Boolean,required:true},
        topic: { type: String, trim: true, required: true },
        date: {type: String, trim: true, required: true},
    },
    {
        timestamps: true,
        versionKey: false

    }
);

const scheduledLecture = mongoose.model("scheduleLec", scheduleLacSchema);

module.exports = scheduledLecture;