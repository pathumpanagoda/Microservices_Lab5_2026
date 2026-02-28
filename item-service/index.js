const express = require('express');
const app = express();
const PORT = 8081;

app.use(express.json());

let items = [
    { id: 1, name: "Book" },
    { id: 2, name: "Laptop" },
    { id: 3, name: "Phone" }
];

let idCounter = 4;

// GET /items
app.get('/items', (req, res) => {
    res.json(items);
});

// POST /items
app.post('/items', (req, res) => {
    const newItem = {
        id: idCounter++,
        name: req.body.name
    };
    items.push(newItem);
    res.status(201).json(newItem);
});

// GET /items/:id
app.get('/items/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const item = items.find(i => i.id === id);

    if (!item) {
        return res.status(404).json({ message: "Item not found" });
    }

    res.json(item);
});

app.listen(PORT, () => {
    console.log(`Item Service running on port ${PORT}`);
});