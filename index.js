const express = require('express');
const bodyParser = require('body-parser');
const app=express();

const port=3001;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});

const uri='mongodb+srv://legiahuy124578:Ck2S1Z9lvdZp0ebi@huy.0r5j3uq.mongodb.net/dealine';

const mongoose = require('mongoose');

const svModel = require('./svModel')

app.get('/',async (req,res) =>{
  await mongoose.connect(uri); // ko co await thi ko lay dc du lieu

  let sv = await svModel.find();

  console.log(sv);

  res.send(sv);
})
const ObjectId=require('mongoose').Types.ObjectId;
app.get('/:id', async (req, res) => {
 

  let id = req.params.id;
  console.log(id);
  const objectId = new ObjectId(id);
  await svModel.deleteOne({_id:objectId});

  res.redirect('../')
}) 
app.post('/add',async(req,res)=>{
  await mongoose.connect(uri);

  let kq=await svModel.create(req.body);
  console.log(kq)

  let svs = await svModel.find();
  res.send(svs);
})
app.get('/update/:ten',async(req,res)=>{
  let tenSV = req.params.ten;
  let newName = "huy";
  await svModel.updateOne({ten: tenSV},{name:newName})
  let svs = await svModel.find();
  res.send(svs);
})