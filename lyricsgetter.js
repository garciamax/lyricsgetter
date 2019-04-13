const puppeteer = require('puppeteer');
module.exports = async ({track, artist}) => {
    const browser = await puppeteer.launch({headless: true});
    let lyrics;
    let links = [];
    let error = null;
    const page = await browser.newPage();
    await page.goto(`https://google.com/search?hl=en&q=${encodeURIComponent(`${track} ${artist} lyrics`)}`);

    try{
        // const toEnglish = await page.$x("//a[contains(text(), 'English')]");
        // await toEnglish[0].click();
        // await page.waitForNavigation({ waitUntil: 'networkidle2' });
        // await page.type('input[name=q]', `${track} ${artist} lyrics`, { delay: 100 });
        // await page.evaluate(() => document.querySelector('input[type=submit]').click());
        // await page.waitForNavigation({ waitUntil: 'networkidle2' });
        const trackBoxTitles = await page.$x(`//*[contains(@id,"uid_")]/div[1]/div[2]`);
        lyrics = await page.evaluate(el => el.innerText, trackBoxTitles[0]);
        const parts = lyrics.split("\n");
        parts.shift();
        lyrics = parts.join("\n");
    }catch (e) {
        error = e;
        lyrics =  null;
    }
    try{
        const searchResults = await page.$x('//h3//ancestor::a');
        for(let handle of searchResults){
            const href = await page.evaluate(el => ({href:el.href,text:el.innerText}), handle);
            links.push(href);
        }
    }catch (e) {
        error = e;
        links = null
    }
    await browser.close();
    return {error, lyrics, links};
};
