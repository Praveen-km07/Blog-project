const { response } = require('express');
const express = require('express');
const app =express();
const {MongoClient} =require("mongodb")
const PORT =process.env.PORT || 8000;



//Intialise middleware
//we use to have to install body parser but now it is a built in middleware
//function of express.It parses incoming JSON payload
app.use(express.json({extended:false}));

const withDB =async(operations,res)=>{
    try{
        
        const client= await MongoClient.connect('mongodb+srv://testingudemyprojects:wJDd43uXzGpVmHSQ@cluster0.0qqdtj3.mongodb.net/test');
        const db = client.db("mernblog");
        await operations(db);
        client.close();
        }
        catch(error){
            res.status(500).json({message:"Error connecting to database",error})
        }
}

app.get('/api/articles/:name',async (req,res)=>{

    withDB(async (db)=> {
        const articleName =req.params.name;
        const articlesInfo =await db.collection("articles").findOne({name:articleName});
        res.status(200).json(articlesInfo);
    },res)
    
})

app.post('/api/articles/:name/add-comments',async (req,res)=>{
    const {username,text}=req.body
    const articleName=req.params.name

    withDB(async (db)=>{
        const articlesInfo = await db.collection("articles").findOne({name:articleName});
        await db.collection('articles').updateOne({name:articleName},{
            $set : {
                comments:articlesInfo.comments.concat({username,text}),
            },
        });
        const updateArticleInfo =await db.collection('articles').findOne({name:articleName})
        res.status(200).json(updateArticleInfo);
    },res)
    // articlesInfo[articleName].comments.push({username,text})
    // res.status(200).send(articlesInfo[articleName]);
})

app.listen(PORT,()=>{
    console.log(`Server started at ${PORT}`);
})