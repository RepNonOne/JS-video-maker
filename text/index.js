const SummaryTool = require('node-summary');
const axios = require('axios');
const readline = require('readline');
const reader = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

// API
const wiki_api = 'https://en.wikipedia.org/w/api.php?action=query&origin=*&format=json&generator=search&gsrnamespace=0&gsrlimit=5&gsrsearch=';
const wikipedia_url = 'https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=';

module.exports.question = function(){
    return new Promise(resolve => {
        reader.question("What's you want to search?\n", answer => {
            let pages, count = 0, data;

            // wikipedia api
            axios.get(wiki_api + answer).then(response => {
                pages = Object.values(response.data.query.pages).map(e => {

                    // send pages to coose
                    console.log('\n.', count + 1, '|', e.title);

                    return {
                        title: e.title,
                        index: count++
                    }
                });

                reader.question("\nChoose a number:", number => {
                    if(number > pages.length) throw 'number range error';

                    let page = pages[number - 1];
                    let title = page.title.replace(/\s/g, '_');

                    // summary text
                    axios.get(wikipedia_url + title).then(response => {
                        let summary_text = Object.values(response.data.query.pages)[0].extract;
                        let automatic, manual = summary_text.split('.');

                        SummaryTool.summarize(page.title, summary_text, function(err, summary) {
                            if(err) throw err;
                            automatic = summary;

                            resolve({summary: manual, title: page.title});
                        });
                    });

                    reader.close();
                });
            });
        });
    });
}