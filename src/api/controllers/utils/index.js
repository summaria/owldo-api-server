const PDFJS = require("pdfjs-dist/legacy/build/pdf.js")

const getText = async (url) => {
    const loadingTask = PDFJS.getDocument(url);
    loadingTask.promise
    .then(function (doc) {
        const numPages = doc.numPages;
        console.log("# Document Loaded");
        console.log("Number of Pages: " + numPages);
        console.log();

        let lastPromise; // will be used to chain promises
        lastPromise = doc.getMetadata().then(function (data) {
        console.log("# Metadata Is Loaded");
        console.log("## Info");
        console.log(JSON.stringify(data.info, null, 2));
        console.log();
        
        }).catch(function(err){
            //Caught
            console.log(err)
        })
    }).catch(function(err){
        //Caught
        console.log(err)
    }
    )
}

module.exports = {
    getText
}