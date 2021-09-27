import { Schema, model } from "mongoose";
import mongoosePaginate = require('mongoose-paginate-v2');

const mobilePhoneSchema = new Schema({
    model: { type: String },
    price: { type: Number },
    brand: { type: String },
    startDate: { type: Date },
    endDate: { type: Date },
    color: { type: String },
    code: { type: String, required: true, unique: true },
}, {
    timestamps: true,
});


mobilePhoneSchema.plugin(mongoosePaginate);

export default model('mobilePhones', mobilePhoneSchema);


