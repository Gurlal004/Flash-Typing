import fetch from "node-fetch";

export default async function handler(req, res) {
  // CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  try {
    const response = await fetch("https://words.biebersprojects.com/words/100/");
    if (!response.ok) {
      return res.status(response.status).send("Failed to fetch words");
    }

    const data = await response.json();

    // Optional: filter only words with letters
    const words = data.filter(w => /^[A-Za-z]+$/.test(w));

    res.status(200).json(words);
  } catch (error) {
    console.error("Error fetching words:", error);
    res.status(500).send("Server error");
  }
}
