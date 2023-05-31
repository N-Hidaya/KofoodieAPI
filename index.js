const express = require('express')
const cors = require('cors')
const app = express();
const greet = require('./routes/greet')
const restaurants = require('./routes/restaurants')

//middleware for server to recognize incoming requests objects as JSON
app.use(express.json());
//make API publicly accessible
app.use(cors());
//Register router from greet
app.use('/greet', greet)
app.use('/restaurants', restaurants)

app.get('/', (req, res) => {
    res.json('Welcome to the API')
})

//Listen for a connection to know server is running
const port = process.env.PORT || 5500;
app.listen(port, () => console.log(`Listening on Port: ${port}`));
