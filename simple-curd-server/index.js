// ======================
// fozlurrahman993
// 6oeWueowXgyVKGXi
// ======================

const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());


const uri = "mongodb+srv://fozlurrahman993:6oeWueowXgyVKGXi@cluster0.hslh8b3.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();

        // const database = client.db("usersDB");
        // const usersCollection = database.collection("users");
        const usersCollection = client.db("usersDB").collection('users');


        // read single data
        app.get('/users/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await usersCollection.findOne(query);
            res.send(result);
        })
        app.put('/users/:id', async (req, res) => {
            const id = req.params.id;
            const updatedUser = req.body;
            console.log(updatedUser);
            const filter = { _id: new ObjectId(id) };
            const options = { upsert: true };
            const updatedDoc = {
                $set: {
                    name: updatedUser.name,
                    email: updatedUser.email
                }
            }
            const result = await usersCollection.updateOne(filter, updatedDoc, options);
            res.send(result);
        })

        // read user 
        app.get('/users', async (req, res) => {
            const cursor = usersCollection.find();
            const result = await cursor.toArray();
            res.send(result);
        })

        // create user 
        app.post('/users', async (req, res) => {
            const user = req.body;
            // console.log('new user', user);
            const result = await usersCollection.insertOne(user);
            res.send(result);
        })

        // delete user 
        app.delete('/users/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            console.log('Deleting user with ID:', id); // Add this line
            const result = await usersCollection.deleteOne(query);
            console.log('Delete result:', result); // Add this line
            res.send(result);
        })





        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);




app.get('/', (req, res) => {
    res.send('simple curd server id running');
})

app.listen(port, () => {
    console.log(`the port is running ${port}`);
})