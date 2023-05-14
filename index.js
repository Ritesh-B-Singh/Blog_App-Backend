const express = require('express');
const cors = require('cors');
const mongoose = require("mongoose");
const app = express();
const Blog = require('./models/Blog');

app.use(cors({ credentials: true, origin: 'https://blog-app-two-beryl.vercel.app/' }));
app.use(express.json());

mongoose.connect('mongodb+srv://riteshbmsingh:n2oTmQBQUzI5lHLf@cluster0.cay8nvi.mongodb.net/?retryWrites=true&w=majority');

app.put('/', async (req, res) => {
    const { id, title, imageUrl, content, author, quote } = req.body;
    try {
        const filter = { _id: id };
        const update = req.body;
        const blogDoc = await Blog.findOneAndUpdate(filter, update);
        res.json(blogDoc);
    } catch (e) {
        console.log(e);
        res.status(400).json(e);
    }
});

app.get('/', async (req, res) => {
    res.json(await Blog.find());
});


app.listen(4000);