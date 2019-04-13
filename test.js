const lyricsGetter = require('./lyricsgetter');
const [,,track, artist] = process.argv;
(async () => {
    const result = await lyricsGetter({track, artist});
    console.log(result)
})().catch(e => setImmediate(() => { throw e }));
