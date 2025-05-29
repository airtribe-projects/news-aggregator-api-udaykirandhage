const express = require('express');
const app = express();
const mongoose = require('mongoose')
const port = 3030;
const userRoutes = require('./controllers/user')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


function mongoose_connection(){

mongoose.connect("mongodb+srv://uday:uday@cluster1.6ojfvzg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1",{})
   .then(()=>{
    console.log("Mongo DB connected")
    app.listen(port, (err) => {
    if (err) {
        return console.log('Something bad happened', err);
    }
    console.log(`Server is listening on ${port}`);
});

   })

.catch((err)=>{
    console.log(err)
 })
}


app.use('/api/v1/users/login',userRoutes.login)
app.use('/api/v1/users/',userRoutes.register)

mongoose_connection()
module.exports = app;