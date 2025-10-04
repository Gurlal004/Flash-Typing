const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");
const path = require("path");

const app = express();

app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

const db = new sqlite3.Database(path.join(__dirname, "database.db"));

app.get('/api/words', async (req, res) => {
  try {
    const response = await fetch('https://words.biebersprojects.com/words/100/');
    if (!response.ok) {
      return res.status(response.status).send('Failed to fetch words');
    }

    const data = await response.json();

    res.json(data);
  } catch (error) {
    console.error('Error fetching words:', error);
    res.status(500).send('Server error');
  }
});

const PORT = 5001;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
