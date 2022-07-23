const request = require("request");
const cheerio = require("cheerio");
const getRepoPageHtml = require("./repoPage");

const url = "https://github.com/topics";

request(url, function (error, response, html) {
    if (error) {
        console.log(error);
    } else if (response.statusCode == 404) {
        console.log("Page Not Found");
    }
    else {
        // console.log(html);
        getTopicsLink(html);
    }
})

function getTopicsLink(html) {
    let $ = cheerio.load(html);
    let topicElemArr = $(".no-underline.d-flex.flex-column.flex-justify-center");
    for (let i = 0; i < topicElemArr.length; i++){
        let link = $(topicElemArr[i]).attr("href")
        let topic = link.split("/").pop();
        // console.log(topic);
        // console.log(link);
        let fullLink = `https://github.com${link}`;
        // console.log(fullLink);
        getRepoPageHtml(fullLink,topic);
    }
}