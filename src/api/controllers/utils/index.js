const PDFJS = require("pdfjs-dist/legacy/build/pdf.js")

const getText = async (url,res) => {
    //Getting the Doc
    const loadingTask = PDFJS.getDocument(url);
    loadingTask.promise.then(async function (doc) {
        //Extarcting Number of Pages
        const numPages = doc.numPages;
        console.log("# Document Loaded");
        //console.log("Number of Pages: " + numPages);

        //Getting Metadata
        
        //console.log("## Metadata Info");
        //console.log(JSON.stringify(data.info, null, 2));
        //console.log();
        output = ""
        const loadPage = function (pageNum) {
            return doc.getPage(pageNum).then(function (page) {
              //console.log("# Page " + pageNum + " Text Content");
              //console.log();
              return page.getTextContent().then(function (content) {
                  // Content contains lots of information about the text layout and
                  // styles, but we need only strings at the moment
                  const strings = content.items.map(function (item) {
                    return item.str;
                  });
                return strings.join(" ");
                })  
            });
          };
        for (let i = 1; i <= numPages; i++) {
            output += await loadPage(i);
          }
    lastPromise = doc.getMetadata().then(function (data) {
        const content = {
            "Title":data.info.Title,
            "Author":data.info.Author,
            "Keywords":data.info.Keywords,
            "Pages":doc.numPages,
            "Content":output
        }
        res.json(content)

        }).catch(function(err){
            //Caught
            console.log(err)
        })
    }).catch(function(err){
        //Caught
        console.log(err) 
    })
}

module.exports = {
    getText
}