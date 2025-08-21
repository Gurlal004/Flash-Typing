// const express = require("express")
// const sqlite3 = require("sqlite3").verbose()
// const cors = require("cors")
// const app = express()
// const path = require("path")
// const fetch = require("node-fetch")

// app.use(cors({
//     origin: "*"
// }));

// const db = new sqlite3.Database(path.join(__dirname, "database.db"))

// app.options("/api/words", (req, res) => {
//   res.sendStatus(204);
// });

// app.get("/api/words", async (req, res) => {
//     const source  = req.query.source;

//     if(source === "api"){
//         try{
//             const response = await fetch("https://words.biebersprojects.com/words/100/");
//             const data = await response.json();
//             const wrapped = data.map(word => ({word}));
//             console.log(wrapped.length);
//             return res.json(wrapped);
//         }catch(err){
//             return res.status(500).json({error: "Failed to fetch words"})
//         }
//     }

//     // const sql = "SELECT word FROM words ORDER BY RANDOM() LIMIT 5";

//     // db.all(sql, [], (err, rows) => {
//     //     if(err){
//     //         return res.status(500).json({error: err.message});
//     //     }
//     //     res.json(rows);
//     // });
// });

// const PORT = 5000;
// app.listen(PORT, () => {
//     console.log(`Server started on port ${PORT}`);
// })


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

    // Print to console
    // console.log('Fetched Data:', data);

    // Send response to client
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
