const express = require('express');
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const cors = require('cors')
const User = require('./src/models/user');
const Note = require('./src/models/note');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const app = express();
require('dotenv').config();


const uri = process.env.MONGODB_URI;


const secret = "your_secret_secret";

app.use(bodyParser.json())
app.use(cors());


app.post('/signup', (req, res) => {
    console.log("signup signup signup")
    bcrypt.hash(req.body.password, 10).then(hash => {
        const newUser = new User({
            email: req.body.email,
            password: hash,
        })

        newUser.save().then(result => {
            const token = jwt.sign({email: newUser.email, userId: result.id}, secret, {expiresIn: '1h'});
            res.status(200).send({message: 'User Created', email: result.email, token: token});
        }).catch(err => {
            res.status(500).send({message: 'Something went wrong', error: err});
        })
    })
})

app.post('/login', (req, res) => {
    User.findOne({email: req.body.email}).then((user) => {
        if (!user) {
            res.status(404).send({message: 'User Not Found'});
        }

        bcrypt.compare(req.body.password, user.password).then(match => {
            if (!match) {
                return res.status(401).send({message: 'Incorrect Password'});
            }

            const token = jwt.sign({email: user.email, userId: user.id}, secret, {expiresIn: '1h'});

            res.status(200).send({message: 'User logged in!', email: user.email, token: token});
        })
    }).catch(err => {
        res.status(500).send({message: 'Something went wrong', error: err});
    })
})

const authenticate = (req, res, next) => {
    console.log("authenticate");
    const token = req.headers.authorization.split(' ')[1];
    console.log("token", token);
    jwt.verify(token, secret, (err, decoded) => {
        if (err) {
            return res.status(401).send({message: 'Incorrect Token'});
        }
        req.userData = decoded;
        console.log("req.userData", req.userData);
        next()
    })
}


app.get('/user/notes', authenticate, (req, res) => {
    Note.find({user: req.userData.userId})
        .then((notes) => res.status(200).json(notes))
        .catch((err) => res.status(500).json({message: 'Something went wrong', error: err}));
});


app.get('/user/notes/:id', authenticate, (req, res) => {
    Note.findOne({_id: req.params.id, user: req.userData.userId})
        .then((note) => {
            if (!note) return res.status(404).json({message: 'Note not found'});
            res.status(200).json(note);
        })
        .catch((err) => res.status(500).json({message: 'Something went wrong', error: err}));
});


app.post('/user/notes', authenticate, (req, res) => {
    console.log("create note")
    const newNote = new Note({
        title: req.body.title,
        content: req.body.content,
        user: req.userData.userId,
    });

    newNote.save()
        .then((result) => {
            return User.findById(req.userData.userId).then((user) => {
                user.notes.push(result.id);
                return user.save().then(() => {
                    res.status(201).json({message: 'Note created successfully', note: result});
                });
            });
        })
        .catch((err) => res.status(500).json({message: 'Something went wrong', error: err}));
});


app.put('/user/notes/:id', authenticate, (req, res) => {
    Note.findOneAndUpdate(
        {_id: req.params.id, user: req.userData.userId},
        {title: req.body.title, content: req.body.content},
        {new: true}
    )
        .then((note) => {
            if (!note) return res.status(404).json({message: 'Note not found'});
            res.status(200).json({message: 'Note updated', note});
        })
        .catch((err) => res.status(500).json({message: 'Something went wrong', error: err}));
});


app.delete('/user/notes/:id', authenticate, (req, res) => {
    Note.findOneAndDelete({_id: req.params.id, user: req.userData.userId})
        .then((note) => {
            if (!note) return res.status(404).json({message: 'Note not found'});
            res.status(200).json({message: 'Note deleted'});
        })
        .catch((err) => res.status(500).json({message: 'Something went wrong', error: err}));
});


mongoose.connect(uri, {
    serverApi: {
        version: "1",
        strict: true,
        deprecationErrors: true
    }
}).then(() => {
    console.log('MongoDB Connected successfully');
    app.listen(3000, () => {
        console.log('Server is running on port 3000');
    });
}).catch((error) => {
    console.error('Database error', error);
});
