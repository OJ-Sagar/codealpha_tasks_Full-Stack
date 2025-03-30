const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/socialmedia', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
});

const postSchema = new mongoose.Schema({
    userId: mongoose.Schema.Types.ObjectId,
    content: String,
    likes: Number,
    comments: [String],
});

const User = mongoose.model('User', userSchema);
const Post = mongoose.model('Post', postSchema);

// Routes
app.post('/api/register', async (req, res) => {
    const newUser = new User(req.body);
    await newUser.save();
    res.json(newUser);
});

app.post('/api/posts', async (req, res) => {
    const newPost = new Post(req.body);
    await newPost.save();
    res.json(newPost);
});

app.get('/api/posts', async (req, res) => {
    const posts = await Post.find().populate('userId');
    res.json(posts);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});