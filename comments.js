// Create web server
// Create API
// Create a route to get all comments
// Create a route to get comments by id
// Create a route to add a new comment
// Create a route to update a comment
// Create a route to delete a comment

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');

app.use(bodyParser.json());

app.get('/comments', (req, res) => {
    fs.readFile('./comments.json', 'utf-8', (err, data) => {
        if (err) {
            res.status(500).send('Error reading comments.json file');
        } else {
            res.send(data);
        }
    });
});

app.get('/comments/:id', (req, res) => {
    fs.readFile('./comments.json', 'utf-8', (err, data) => {
        if (err) {
            res.status(500).send('Error reading comments.json file');
        } else {
            const comments = JSON.parse(data);
            const comment = comments.find(comment => comment.id == req.params.id);
            if (comment) {
                res.send(comment);
            } else {
                res.status(404).send('Comment not found');
            }
        }
    });
});

app.post('/comments', (req, res) => {
    fs.readFile('./comments.json', 'utf-8', (err, data) => {
        if (err) {
            res.status(500).send('Error reading comments.json file');
        } else {
            const comments = JSON.parse(data);
            const newComment = req.body;
            newComment.id = comments.length + 1;
            comments.push(newComment);
            fs.writeFile('./comments.json', JSON.stringify(comments), 'utf-8', (err) => {
                if (err) {
                    res.status(500).send('Error writing comments.json file');
                } else {
                    res.status(201).send(newComment);
                }
            });
        }
    });
});

app.put('/comments/:id', (req, res) => {
    fs.readFile('./comments.json', 'utf-8', (err, data) => {
        if (err) {
            res.status(500).send('Error reading comments.json file');
        } else {
            const comments = JSON.parse(data);
            const comment = comments.find(comment => comment.id == req.params.id);
            if (comment