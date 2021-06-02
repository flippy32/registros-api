import {Schema, model, Document} from 'mongoose';

const fileSchema = new Schema({
    filePath: String
});

export default model ('File', fileSchema);