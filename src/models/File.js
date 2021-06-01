import {Schema, model, Document} from 'mongoose';

const fileSchema = new Schema({
    title: String,
    description: String,
    filePath: String
});

export default model ('Files', fileSchema);