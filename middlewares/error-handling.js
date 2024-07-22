module.exports = (err, req, res, next) => {
    res.status(500).render("errors/500", { title: "hata sayfası "});
};