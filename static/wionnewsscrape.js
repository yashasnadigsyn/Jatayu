const puppeteer = require('puppeteer');
const fs = require('fs');
let grabHeadlines;
async function wionewsscraper() { 
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto("https://www.wionews.com/world", {waitUntil:'networkidle0'});
    await page.setDefaultNavigationTimeout(0);

    const grabHeadlines = await page.evaluate(() => {
        const headlines = document.querySelectorAll(".content-holder h2 a");
        let headlists = [];
        headlines.forEach((tag) => {
            headlists.push("`"+tag.innerText+"`");
            headlists.push("`<a href='"+tag.href+"'>link</a>`");
        });
        return headlists;
    });
    await browser.close();
    wionnewsscrapehtmldata = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>WionNewsLinks</title>
    <link rel="stylesheet" href="../static/styles/jatayumaincss.css">
    <style>
    table, th, td {
        border: 1px solid black;
        width: 100%;
    }
    th, td {
        padding: 15px;
        text-align: left;
    }
</style>
</head>
<body>
<a href="/"><div class="JatayuLogo"></div></a><h1 style="text-align: center;">Wion News Links</h1><br>
<br><br>
    <div id="wionewstable"></div>
    <script>
    let data = [${grabHeadlines}];
    let htmldata = '<table><tr>';
    let perrow = 2;

    for (i=0; i<data.length; i++) {
        htmldata += '<td>'+ data[i] + '</td>';
        let next = i +1;
        if (next%perrow == 0 && next!=data.length) {
            htmldata += '</tr><tr>';
        }
    }
    htmldata += '</tr></table>'

    document.getElementById('wionewstable').innerHTML = htmldata;
</script>
</body>
</html>`;
fs.writeFile('../templates/WionNewsHtml.html', wionnewsscrapehtmldata, (err) => {
      
    // In case of a error throw err.
    if (err) throw err;
});
}
wionewsscraper();
