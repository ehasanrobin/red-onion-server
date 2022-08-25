const express = require('express')
const app = express()
const port = process.env.PORT ||  5000
const cors = require('cors');
require('dotenv').config()
// midddle ware 
app.use(cors())
app.use(express.json())

// onionuser1
// C7nCo50VdnHzQDE8


const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.USER_NAME}:${process.env.USER_PASS}@cluster0.jspzohs.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });



async function run(){
    try{
        const menusCollection = client.db("redOnion").collection("menus");
        // get Products 
    app.get("/menus", async (req,res)=>{
        const query = {};
        const cursor = menusCollection.find(query);
        const services = await cursor.toArray();
        res.send(services)
    });

    // add prodcuts 
    app.post("/menus",async (req,res)=> {
        const doc = req.body;
        console.log(doc);
        const result = await menusCollection.insertOne(doc);
        res.send(result);

    });

    // delete product 
    app.delete("/menus/:id", async(req,res)=> {
        const id = req.params.id;
        const query = { _id: ObjectId(id) };
        const result = await menusCollection.deleteOne(query);
        res.send(result);
    })



    }
    finally{
        // await client.close();
    }
}

run().catch(console.dir);




app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })