const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");

const app = express();
const PORT = 3005;

app.get("/", async (req, res) => {
  try {
    // Step 1: Hit the PHP endpoint
    const phpEndpoint = "https://allinonereborn.com/amit2/redirect-1.php"; // Replace with your PHP endpoint
    const htmlResponse = await axios.get(phpEndpoint);

    // Step 2: Parse the HTML and extract the link from the '#playlistUrl' element
    const $ = cheerio.load(htmlResponse.data);
    const playlistUrl = $("#playlistUrl").contents();

    if (!playlistUrl) {
      return res.status(404).send("Playlist URL not found");
    }

    // Step 3: Fetch the content from the extracted link
    const playlistResponse = await axios.get(playlistUrl);

    // Step 4: Return the content from the playlist URL
    res.send(playlistResponse.data);
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).send("An error occurred while processing your request");
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
