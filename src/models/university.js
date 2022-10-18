import { model, Schema } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const UniversitySchema = new Schema({
    nome: { type: String, required: true },
    country: { type: String, required: true },
    state_province: { type: String, required: false },
    alpha_two_codes: { type: String, required: true, maxLength: 2, minLength: 2 },
    domains: [{ _id: false, type: String, required: false }],
    web_pages: [{ _id: false, type: String, required: false }],

});

UniversitySchema.plugin(mongoosePaginate);
const University = model("Article", UniversitySchema);
export { University };