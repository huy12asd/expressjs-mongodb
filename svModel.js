const mongoose = require('mongoose')
const svSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,//thong bao truong co phai dien hay khong
    },
    age:{
        type:Number,
        required:true
    }
})

const svModel = new mongoose.model('students',svSchema);

module.exports=svModel;


