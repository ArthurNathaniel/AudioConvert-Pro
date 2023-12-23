const express = require("express");
const ffmpeg = require("fluent-ffmpeg");
const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/convert", (req, res) => {
  const audioData = req.body.audioData; // Assuming audioData is base64-encoded audio data

  // Use fluent-ffmpeg to convert audio to MP3
  ffmpeg()
    .input(audioData)
    .audioCodec("libmp3lame") // Use MP3 codec
    .on("end", () => res.json({ success: true }))
    .on("error", (err) =>
      res.status(500).json({ success: false, error: err.message })
    )
    .save("public/output.mp3"); // Save the converted file as MP3
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
