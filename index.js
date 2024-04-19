const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const svModel = require('./svModel');

const app = express();
const port = 3001;
const uri = 'mongodb+srv://legiahuy124578:Ck2S1Z9lvdZp0ebi@huy.0r5j3uq.mongodb.net/dealine';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

// Kết nối MongoDB
async function connectDB() {
  try {
    await mongoose.connect(uri);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
  }
}

// Middleware kết nối MongoDB
app.use(async (req, res, next) => {
  await connectDB();
  next();
});

// Lấy tất cả sinh viên
app.get('/', async (req, res) => {
  try {
    const students = await svModel.find();
    console.log(students);
    res.send(students);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Xóa sinh viên dựa trên ID
app.get('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);
    await svModel.deleteOne({ _id: id });
    res.redirect('../');
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Thêm sinh viên mới
app.post('/add', async (req, res) => {
  try {
    const newStudent = await svModel.create(req.body);
    console.log(newStudent);
    const students = await svModel.find();
    res.send(students);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Cập nhật tên sinh viên
app.get('/update/:ten', async (req, res) => {
  try {
    const { ten } = req.params;
    const newName = 'huy';
    await svModel.updateOne({ ten }, { name: newName });
    const students = await svModel.find();
    res.send(students);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal Server Error');
  }
});
