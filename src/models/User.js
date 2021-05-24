import  {Schema, model} from 'mongoose'
import bcrypt from 'bcryptjs'

const userSchema = new Schema({
    username: {
        type:String
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String,
        required: true
    }, 
    role:[{
        ref: "Role",
        type: Schema.Types.ObjectId
    }]
}, {
    timestamps: true,
    versionKey: false
});

//cifrar y comparar contraseñas
userSchema.statics.encryptPassword = async (password) =>{
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
}
userSchema.statics.compararPassword = async (password, receivePassword)=>{
    return await bcrypt.compare(password, receivePassword);
}

export default model ('User', userSchema);