const request = require("request");
const cheerio = require("cheerio");

const getIssuesHtml = require("./issues");

function getRepoPageHtml(url,topic) {
    request(url, function (error, response, html) {
        if (error) {
            console.log(error);
        } else if (response.statusCode == 404) {
            console.log("Page Not Found");
        } else {
            // console.log(url);
            getRepoLink(html,topic);
        }
    })
}

module.exports = getRepoPageHtml;

function getRepoLink(html,topic) {
    let $ = cheerio.load(html);
    let repoHeadingArr = $(".f3.color-fg-muted.text-normal.lh-condensed");
    // console.log(topic);
    for (let i = 0; i < 8; i++){
        let twolink = $(repoHeadingArr[i]).find("a");
        // console.log(twolink.length);
        let link = $(twolink[1]).attr("href");
        // console.log(link);
        let repoName = link.split("/").pop();
        // console.log(repoName);
        let fullLink = `https://github.com${link}/issues`;
        // console.log(fullLink);
        getIssuesHtml(fullLink, topic,repoName);
    }
    // console.log("``````````````````````````````````````");
}

