import { Schema, model } from 'mongoose'
import bcrypt from 'bcryptjs'

const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
        },
        email: {
            type: String,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        roles: [
            {
                type: Schema.Types.ObjectId,
                ref: "Role",
            },
        ],
    }, 
    {
    timestamps: true,
    versionKey: false,
});

//cifrar y comparar contraseñas
userSchema.statics.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
}
userSchema.statics.compararPassword = async (password, receivePassword) => {
    return await bcrypt.compare(password, receivePassword);
}

export default model('User', userSchema);