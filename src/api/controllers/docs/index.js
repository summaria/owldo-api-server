const PDFJS = require("pdfjs-dist")
const {getText} = require("../utils")

const getPDFtoText = async (req, res) => {
    //console.log(req.body.url)
    const url = req.body.url; 
    x = url.split('.').pop()
    //console.log(x)
    if(x && x=="pdf")
    {   
        getText(url,res)
        res.status(200);
        //res.json({"Message":"Success"})
    }
    else{
        res.status(404);
        res.json({"message":"invalid pdf file url"})
    }
}

module.exports = {
    getPDFtoText
}