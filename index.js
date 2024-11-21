const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

app.post('/bfhl', (req, res) => {
    const { data } = req.body;

    // Your logic here to process the input data
    // For example purposes only:
    const response = {
        is_success: true,
        user_id: "john_doe_17091999",
        email: "john@xyz.com",
        roll_number: "ABCD123",
        numbers: [],
        alphabets: data.filter(d => /^[A-Za-z]+$/.test(d)),
        highest_lowercase_alphabet: data.filter(d => d === d.toLowerCase()).sort().slice(-1),
        is_prime_found: false,
        file_valid: false
    };

    res.json(response);
});