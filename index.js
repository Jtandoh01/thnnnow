const mongoose = require('mongoose');
require('dotenv').config();


const express = require('express');
const Student = require('./models/student');



mongoose.set('strictQuery', false);


const app = express();
const { MONGODB_URI } = process.env; // To retrieve environment variable to vercel

// Setup MongoDB Connection


  mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('Error connecting to MongoDB', err));
  
  

// Middleware for parsing JSON body
app.use(express.json());

// Define routes




app.get('/students/:id', async (req, res) => {
    const student = await Student.findById( req.params.id );
    if (!student) return res.status(404).send('Student not found');
    res.send(student);
  });
  


  app.post('/students', async (req, res) => {
    const { name, age, gender, email, } = req.body
    const student = new Student({
      
      name,
      age,
      gender,
      email,
      
    });
    
    await student.save();
    res.send(student);
      
  });


const port = process.env.PORT || 8000;
// Start server
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
