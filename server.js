const { response } = require('express');
const express = require('express');
const app =express();
const PORT =process.env.PORT || 8000;

//Intialise middleware
//we use to have to install body parser but now it is a built in middleware
//function of express.It parses incoming JSON payload
app.use(express.json({extended:false}));

app.get('/',(request,response)=>{
      response.send ("Hello World");
});


app.post('/',(reqest,response)=>{
    response.send(`Hello ${reqest.body.name}`);
})

app.listen(PORT,()=>{
    console.log(`Server started at ${PORT}`);
})