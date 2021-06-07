const getPDFtoText = async (req, res) => {
    const { url } = req.params;
    res.status(200);
    res.json({"text":"textfrompdf"})
}


module.exports = {
    getPDFtoText
}