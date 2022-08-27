const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const port = process.env.PORT || 5000;


//Middle ware
app.use(cors());
app.use(express.json());


// Database Connection


const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.p9oifrw.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run(){
    try{
        await client.connect();

        const memberInfoCollection = client.db('zero-devs').collection('team-member-info');
        const statusCollection = client.db('zero-devs').collection('statuses');
        const genderCollection = client.db('zero-devs').collection('gender');


        app.post('/add-team-member',async (req,res)=>{
            const info = req.body ;
            const result = await memberInfoCollection.insertOne(info);
            res.send(result);

        });

        app.get('/team-member', async(req,res)=>{
            const query = {};
            const cursor = memberInfoCollection.find(query);
            const members = await cursor.toArray();
            const count = members.length; 
            const success = true;
            const message = `Found of ${count} members`;
            res.send({status:success,message:message,Total_Member:count,data:members});
        })


        app.get('/status', async(req,res)=>{
            const query = {};
            const cursor = statusCollection.find(query);
            const status = await cursor.toArray();
            res.send(status);
        });
        app.get('/gender', async(req,res)=>{
            const query = {};
            const cursor = genderCollection.find(query);
            const genders = await cursor.toArray();
            res.send(genders);
        });

    }

    finally{

    }
}

run().catch(console.dir)



app.get('/',(req,res)=>{
    res.send('ZeroDevs site is runnig!!!');
});

app.listen(port,(req,res)=>{
    console.log('ZeroDevs server running port',port);
})


{
    success:true
    total: 3
    data:[
        {

        },
        {

        },
        {

        }
    ]

}