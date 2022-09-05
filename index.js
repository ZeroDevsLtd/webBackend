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
const { query } = require('express');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.p9oifrw.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run(){
    try{
        await client.connect();

        const memberInfoCollection = client.db('zero-devs').collection('team-member-info');
        const statusCollection = client.db('zero-devs').collection('statuses');
        const genderCollection = client.db('zero-devs').collection('gender');
        const categoryCollection = client.db('zero-devs').collection('category');
        const portfolioCollection = client.db('zero-devs').collection('portfolio');
        const testimonialCollection = client.db('zero-devs').collection('testimonials');
        const serviceCollection = client.db('zero-devs').collection('services');
        const clientCollection = client.db('zero-devs').collection('clients');
        const chooseUsCollection = client.db('zero-devs').collection('choose-us');


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

        });

        app.post('/portfolio',async (req,res)=>{
            const data = req.body ;
            const result = await portfolioCollection.insertOne(data);
            res.send(result);

        });

        app.get('/portfolio', async(req,res)=>{
            const query = {};
            const cursor = portfolioCollection.find(query);
            const portfolio = await cursor.toArray();
            res.send(portfolio);
        });

        app.post('/testimonial',async (req,res)=>{
            const data = req.body ;
            const result = await testimonialCollection.insertOne(data);
            res.send(result);

        });

        app.get('/testimonial', async(req,res)=>{
            const query = {};
            const cursor = testimonialCollection.find(query);
            const testimonials = await cursor.toArray();
            res.send(testimonials);
        });

        app.post('/service',async (req,res)=>{
            const data = req.body ;
            const result = await serviceCollection.insertOne(data);
            res.send(result);

        });

        app.get('/service', async(req,res)=>{
            const query = {};
            const cursor = serviceCollection.find(query);
            const testimonials = await cursor.toArray();
            res.send(testimonials);
        });

        app.post('/client',async (req,res)=>{
            const data = req.body ;
            const result = await clientCollection.insertOne(data);
            res.send(result);
        });

        app.get('/client',async (req,res)=>{
            const query = {} ;
            const cursor = clientCollection.find(query);
            const clients = await cursor.toArray();
            res.send(clients);
        });

        app.post('/choose-us',async (req,res)=>{
            const data = req.body ;
            const result = await chooseUsCollection.insertOne(data);
            res.send(result);
        });

        app.get('/choose-us', async (req,res)=>{
            const query = {} ;
            const cursor = chooseUsCollection.find(query);
            const chooses = await cursor.toArray();
            res.send(chooses);
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

        app.get('/category', async(req,res)=>{
            const query = {};
            const cursor = categoryCollection.find(query);
            const categories = await cursor.toArray();
            res.send(categories);
        });

    }

    finally{

    }
}

run().catch(console.dir)



app.get('/',(req,res)=>{
    res.send('ZeroDevs site is running!!!');
});

app.listen(port,(req,res)=>{
    console.log('ZeroDevs server running port',port);
})


