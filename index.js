const express = require('express');
const app = express();
const port = 3000;
const lyricsGetter = require('./lyricsgetter');

app.get('/', async (req, res) => {
    const {query:{track, artist}} = req;
    const result = await lyricsGetter({track, artist});
    res.json(result);
});

app.listen(port, () => console.log(`Lyrics Getter app listening on port ${port}!`));
