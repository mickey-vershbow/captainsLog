// Import Dependencies

const express = require('express');
const app = express();

// Routes
app.get(/logs/new, (req, res) => {
    res.send('new');
})


// Listen on Port 3000
app.listen(3000, () => {
    console.log("listening");
});
