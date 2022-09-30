const express = require('express');
const apiRouter = require('./routes/apiRoute');
const htmlRouter = require('./routes/htmlRoute');

const PORT = process.env.PORT || 3001;

const app = express();


app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));


// Using api router first
app.use('/api', apiRouter);
// Using HTML router
app.use("/", htmlRouter);



app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));