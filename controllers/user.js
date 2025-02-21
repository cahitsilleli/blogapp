const Blog = require("../models/blog");
const Category = require("../models/category");
const {Op} = require("sequelize"); 

exports.blogs_details = async function(req, res) {
    const slug = req.params.slug;
    try{
        const blog = await Blog.findOne({
            where: {
                url: slug
            },
            raw: true
        });

        if(blog) {
            return res.render("users/blog-details", {
                title: blog.title,
                blog: blog
            });
        }
        res.redirect("/404");
    }
    catch(err) {
        console.log(err);
    }
};

exports.blog_list = async function(req, res) {
    const size = 3;
    const { page = 0 } = req.query;
    const slug = req.params.slug;
    try{
        const { rows, count } = await Blog.findAndCountAll({
            where: {confirmation: true},
            raw: true,
            include: slug ? { model: Category, where: { url: slug } }: null,
            limit: size,
            offset: page * size
        });

        const categories = await Category.findAll({raw: true})

        res.render("users/blogs", {
            title: "All Courses",
            blogs: rows,
            totalItems: count,
            totalPages: Math.ceil(count/size),
            currentPage: page,
            categories: categories,
            selectedCategory: slug
        });
    }
    catch(err) {
        console.log(err);
    }
};

exports.index = async function(req, res) {
    try{
        const blogs = await Blog.findAll({
            where: {
                [Op.and]: [
                    {mainpage: true},
                    {confirmation: true}
                ]
            },
            raw: true
        });

        const categories = await Category.findAll({raw: true});

        res.render("users/index", {
            title: "Popular Courses",
            blogs: blogs,
            categories: categories,
            selectedCategory: null
        });
    }
    catch(err) {
        console.log(err);
    }
};