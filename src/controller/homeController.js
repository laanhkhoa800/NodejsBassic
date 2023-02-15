let getHomepage = (req, res) => {
    //write logic code return value
    return res.render('index.ejs');
}

module.exports = {
    getHomepage
}