const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const reqString = {
    type: String,
    required: true,
    trim: true,
};
const sample = "https://cdn.dribbble.com/users/2878951/screenshots/14013747/media/603f0b853c409547dfa51cba996f375c.png?compress=1&resize=400x300"
const usersSchema = new mongoose.Schema(
    {
        username: reqString,
        fullname: reqString,
        email: reqString,
        password: reqString,
        number: { type: Number },
        profilePic: { type: String, default: sample },
        attended_lec: {type:Number,require:false,default:0},
        goals: {type:Number,require:false,default:0},
        history: [
            { type: mongoose.Schema.Types.ObjectId, ref: 'post', required: true },
        ],
        isNewNotification: { type: Boolean, default: false },
        tokens: [
            {
                token: reqString,
            },
        ],
    },
    {
        versionKey: false,
        timestamps: true,

    }
);

// hashing the password
usersSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 8);
    }
    next();
});

// generating auth token
usersSchema.methods.generateAuthToken = async function () {
    try {
        // jwt.sign(payload, secretOrPrivateKey,[optional,callback])
        const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET_KEY);
        this.tokens = this.tokens.concat({ token: token });
        await this.save();
        return token;
    } catch (err) {
        console.log(err);
    }
};

// collection creation
const UsersData = mongoose.model('user', usersSchema);

module.exports = UsersData;