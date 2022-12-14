const express = require('express');
const fileUpload = require('express-fileupload')
const morgan = require('morgan')
const mv = require('mv')
const app = express();
const cors = require('cors');
require('dotenv').config();
const port = process.env.PORT || 18520;


//Middle ware
app.use((req, res, next) => {
    const corsWhitelist = [
        'http://51.159.105.249:18520'
    ];
    if (corsWhitelist.indexOf(req.headers.origin) !== -1) {
        res.header('Access-Control-Allow-Origin', req.headers.origin);
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    }

    next();
});
app.use(fileUpload({
    createParentPath: true
}))
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))


// Database Connection


const { MongoClient, ServerApiVersion } = require('mongodb');
const { query } = require('express');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.p9oifrw.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run() {
    try {
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
        const aboutUsCollection = client.db('zero-devs').collection('about-us');
        const circularCollection = client.db('zero-devs').collection('circular');
        const requirementCollection = client.db('zero-devs').collection('requirement');
        const responsibilityCollection = client.db('zero-devs').collection('responsibility');
        const benefitCollection = client.db('zero-devs').collection('benefit');
        const pdfCollection = client.db('zero-devs').collection('pdf');


        app.post('/add-team-member', async (req, res) => {
            const info = req.body;
            const result = await memberInfoCollection.insertOne(info);
            res.send(result);

        });

        app.post('/portfolio', async (req, res) => {
            const data = req.body;
            const result = await portfolioCollection.insertOne(data);
            res.send(result);

        });
        app.post('/testimonial', async (req, res) => {
            const data = req.body;
            const result = await testimonialCollection.insertOne(data);
            res.send(result);

        });

        app.get('/team-member', async (req, res) => {
            const query = {};
            const cursor = memberInfoCollection.find(query);
            const members = await cursor.toArray();
            const count = members.length;
            const success = true;
            const message = `Found of ${count} members`;
            res.send({ status: success, message: message, Total_Member: count, data: members });

        });

        app.get('/portfolio', async (req, res) => {
            const query = {};
            const cursor = portfolioCollection.find(query);
            const portfolio = await cursor.toArray();
            res.send(portfolio);
        });

        app.get('/testimonial', async (req, res) => {
            const query = {};
            const cursor = testimonialCollection.find(query);
            const testimonials = await cursor.toArray();
            res.send(testimonials);
        });

        app.post('/portfolio', async (req, res) => {
            const data = req.body;
            const result = await portfolioCollection.insertOne(data);
            res.send(result);

        });

        app.get('/portfolio', async (req, res) => {
            const query = {};
            const cursor = portfolioCollection.find(query);
            const portfolio = await cursor.toArray();
            res.send(portfolio);
        });

        app.post('/testimonial', async (req, res) => {
            const data = req.body;
            const result = await testimonialCollection.insertOne(data);
            res.send(result);

        });

        app.get('/testimonial', async (req, res) => {
            const query = {};
            const cursor = testimonialCollection.find(query);
            const testimonials = await cursor.toArray();
            res.send(testimonials);
        });

        app.post('/service', async (req, res) => {
            const data = req.body;
            const result = await serviceCollection.insertOne(data);
            res.send(result);

        });

        app.get('/service', async (req, res) => {
            const query = {};
            const cursor = serviceCollection.find(query);
            const testimonials = await cursor.toArray();
            res.send(testimonials);
        });

        app.post('/client', async (req, res) => {
            const data = req.body;
            const result = await clientCollection.insertOne(data);
            res.send(result);
        });

        app.get('/client', async (req, res) => {
            const query = {};
            const cursor = clientCollection.find(query);
            const clients = await cursor.toArray();
            res.send(clients);
        });

        app.post('/choose-us', async (req, res) => {
            const data = req.body;
            const result = await chooseUsCollection.insertOne(data);
            res.send(result);
        });

        app.get('/choose-us', async (req, res) => {
            const query = {};
            const cursor = chooseUsCollection.find(query);
            const chooses = await cursor.toArray();
            res.send(chooses);
        });

        app.post('/about-us', async (req, res) => {
            const data = req.body;
            const result = await aboutUsCollection.insertOne(data);
            res.send(result);
        });

        app.get('/about-us', async (req, res) => {
            const query = {};
            const cursor = aboutUsCollection.find(query);
            const about = await cursor.toArray();
            res.send(about);
        });

        app.post('/circular', async (req, res) => {
            const data = req.body;
            const result = await circularCollection.insertOne(data);
            res.send(result);
        });
        app.get('/circular', async (req, res) => {
            const query = {};
            const cursor = circularCollection.find(query);
            const circulars = await cursor.toArray();
            res.send(circulars);
        });
        app.post('/requirement', async (req, res) => {
            const data = req.body;
            const result = await requirementCollection.insertOne(data);
            res.send(result);
        });
        app.get('/requirement', async (req, res) => {
            const query = {};
            const cursor = requirementCollection.find(query);
            const requirements = await cursor.toArray();
            res.send(requirements);
        });
        app.post('/responsibility', async (req, res) => {
            const data = req.body;
            const result = await responsibilityCollection.insertOne(data);
            res.send(result);
        });
        app.get('/responsibility', async (req, res) => {
            const query = {};
            const cursor = responsibilityCollection.find(query);
            const responsibilities = await cursor.toArray();
            res.send(responsibilities);
        });
        app.post('/benefit', async (req, res) => {
            const data = req.body;
            const result = await benefitCollection.insertOne(data);
            res.send(result);
        });
        app.get('/benefit', async (req, res) => {
            const query = {};
            const cursor = benefitCollection.find(query);
            const benefits = await cursor.toArray();
            res.send(benefits);
        });

        // app.use(fileUpload())
        // app.get('/',(req,res)=>{
        //     res.sendFile(__dirname + '/index.html')
        // });

        // app.post('/',async(req,res)=>{
        //     console.log(req.files);
        //    if(req.files){
        //     var file = req.files.file ;
        //     var filename = file.name
        //     file.mv('./uploads/' + filename, function(err){
        //         if(err){
        //             res.send(err)
        //         }else{
        //             res.send('File Uploaded')
        //         }
        //     })
        //    }
        // });
        const fs = require('fs');
        const path = require('path');

        app.post('/pdf-file', async (req, res) => {
           const pdf = req.files;
           console.log(pdf);
        });

        app.get('/status', async (req, res) => {
            const query = {};
            const cursor = statusCollection.find(query);
            const status = await cursor.toArray();
            res.send(status);
        });

        app.get('/gender', async (req, res) => {
            const query = {};
            const cursor = genderCollection.find(query);
            const genders = await cursor.toArray();
            res.send(genders);
        });
        app.get('/category', async (req, res) => {
            const query = {};
            const cursor = categoryCollection.find(query);
            const categories = await cursor.toArray();
            res.send(categories);
        });

        app.get('/category', async (req, res) => {
            const query = {};
            const cursor = categoryCollection.find(query);
            const categories = await cursor.toArray();
            res.send(categories);
        });

    }

    finally {

    }
}

run().catch(console.dir)



app.get('/', (req, res) => {
    res.send('ZeroDevs site is running!!!');
});


app.listen(port, (req, res) => {
    console.log('ZeroDevs server running port', port);
})


