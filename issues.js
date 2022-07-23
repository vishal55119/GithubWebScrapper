const request = require("request");
const cheerio = require("cheerio");
const pdfkit = require("pdfkit");

const fs = require("fs");
const path = require("path");

function getIssuesHtml(url, topic,repoName) {
    request(url, function (error, response, html) {
        if (error) {
            console.log(error);
        } else if (response.statusCode == 404) {
            console.log("Page Not Found");
        } else {
            extractIssuesHtml(html, topic,repoName);
        }
    })
}

module.exports = getIssuesHtml;

function extractIssuesHtml(html, topic,repoName) {
    let $ = cheerio.load(html);
    let issuesElemArr = $(".Link--primary.v-align-middle.no-underline.h4.js-navigation-open.markdown-title");
    // console.log(issuesElemArr.length);
    let arr = [];
    for (let i = 0; i < issuesElemArr.length; i++){
        let link = $(issuesElemArr[i]).attr("href");
        // console.log(link);
        let fullLink = `https://github.com${link}`;

        arr.push(fullLink);
    }

    // console.log(topic);
    // console.log(repoName);
    // console.log(arr);

    let folderPath = path.join(__dirname, topic);

    dirCreator(folderPath);

    let filePath = path.join(folderPath, repoName + ".pdf");
    
    let text = JSON.stringify(arr);

    let pdfDoc = new pdfkit();

    pdfDoc.pipe(fs.createWriteStream(filePath));

    pdfDoc.text(text);

    pdfDoc.end();

}

function dirCreator(folderPath) {
    if (fs.existsSync(folderPath) == false) {
        fs.mkdirSync(folderPath);
    }
}