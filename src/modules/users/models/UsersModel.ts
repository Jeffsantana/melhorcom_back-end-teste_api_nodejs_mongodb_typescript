import { Schema, model } from "mongoose";
import mongoosePaginate = require('mongoose-paginate-v2');
import { hash } from 'bcrypt';

const userSchema = new Schema({
    active: { type: Boolean, default: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone_number: { type: String },
    // profile: { type: String, default: 'USER' },
    // roles: { type: Schema.Types.ObjectId, ref: 'roles', required: true },
    password: { type: String, required: true, select: false, },
}, {
    timestamps: true,
});

// eslint-disable-next-line func-names
userSchema.pre('save', async function (next) {
    this.password = await hash(this.password, 10);
    next();
});

userSchema.plugin(mongoosePaginate);

export default model('users', userSchema);
