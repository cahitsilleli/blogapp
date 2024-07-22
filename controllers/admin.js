const Blog = require("../models/blog");
const Category = require("../models/category");
const Role = require("../models/role");
const User = require("../models/user");
const fs = require("fs");
const {Op} = require("sequelize"); 
const sequelize = require("../data/db");
const slugField = require("../helpers/slugfield");

exports.get_blog_delete = async (req, res) => {
    const blogid = req.params.blogid;
    const userid = req.session.userid;
    const isAdmin = req.session.roles.includes("admin");
    try {
        const blog = await Blog.findOne({
            where: isAdmin ? { id: blogid } : { id: blogid, userId: userid }
        });
        if (blog) {
            return res.render("admin/blog-delete", {
                title: "Delete Blog",
                blog: blog
            });
        }
        res.redirect("/admin/blogs")
    }
    catch(err) {
        console.log(err);
    }
};

exports.post_blog_delete = async (req, res) => {
    const blogid = req.body.blogid;
    try{
        const blog = await Blog.findByPk(blogid);
        if(blog) {
            await blog.destroy();
            return res.redirect("/admin/blogs?action=delete");
        }
        res.redirect("/admin/blogs");
    }
    catch(err) {
        console.log(err);
    }
};

exports.get_category_delete = async (req, res) => {
    const categoryid = req.params.categoryid;
    try {
        const category = await Category.findByPk(categoryid);
        if(category) {
            return res.render("admin/category-delete", {
                title: "Delete Category",
                category: category
            });
        }
        res.redirect("admin/categories")
    }
    catch(err) {
        console.log(err);
    }
};

exports.post_category_delete = async (req, res) => {
    const categoryid = req.body.categoryid;
    try{
        const category = await Category.findByPk(categoryid);
        if(category) {
            await category.destroy();
            return res.redirect("/admin/categories?action=delete");
        }
        res.redirect("/admin/categories");
    }
    catch(err) {
        console.log(err);
    }
};

exports.get_blog_create = async (req, res) => {
    try{
        const categories = await Category.findAll();
        res.render("admin/blog-create", {
            title: "Add Blog",
            categories: categories
        });
    }
    catch(err){
        console.log(err);
    }
};

exports.post_blog_create = async (req, res) => {
    const title = req.body.title;
    const subtitle = req.body.subtitle;
    const description = req.body.description;
    let image = "";
    const mainpage = req.body.mainpage == "on" ? 1:0;
    const confirmation = req.body.confirmation == "on" ? 1:0;
    const userid = req.session.userid;
    
    try{
        if(title == "") {
            throw new Error("Title can't be empty.");
        }

        if(title.length > 20 || title.length < 5) {
            throw new Error("title must be between 5 and 20 characters");
        }

        if(description == "") {
            throw new Error("Description can't be empty");
        }

        if(req.file) {
            image = req.file.filename;
            fs.unlink("./public/images/" + req.body.image, err => {
                console.log(err);
            });
        };

        await Blog.create({
            title: title,
            subtitle: subtitle,
            description: description,
            image: image,
            mainpage: mainpage,
            confirmation: confirmation,
            url: slugField(title),
            userId: userid
        });
        res.redirect("/admin/blogs?action=create");
    }
    catch(err) {
        let errMessage = "";

        if(err instanceof Error) {
            errMessage += err.message;

            res.render("admin/blog-create", {
                title: "Add Blog",
                categories: await Category.findAll(),
                message: { text: errMessage, class: "danger"},
                values: {
                    title: title,
                    subtitle: subtitle,
                    description: description
                }
            });
        }
    }
};

exports.get_category_create = async (req, res) => {
    try{
        res.render("admin/category-create", {
            title: "add category"
        });
    }
    catch(err) {
        res.redirect("/500");
    }
};

exports.post_category_create = async (req, res) => {
    const name = req.body.name;
    try {
        await Category.create({ name: name, url: slugField(name) });
        res.redirect("/admin/categories?action=create");
    }
    catch(err) {
        console.log(err);
    }
};

exports.get_blog_edit = async (req, res) => {
    const blogid = req.params.blogid;
    const userid = req.session.userid;

    const isAdmin = req.session.roles.includes("admin");
    try{
        const blog = await Blog.findOne({
            where: isAdmin ? { id: blogid } : { id: blogid, userId: userid },
            include: {
                model: Category,
                attributes: ["id"]
            }
        });
        const categories = await Category.findAll();
        
        if(blog) {
            return res.render("admin/blog-edit", {
                title: blog.dataValues.title,
                blog: blog.dataValues,
                categories: categories
            });
        }
        res.redirect("/admin/blogs")
    }
    catch(err) {
        console.log(err);
    }
};

exports.post_blog_edit = async(req, res) => {
    const blogid = req.body.blogid;
    const title = req.body.title;
    const subtitle = req.body.subtitle;
    const description = req.body.description;
    let image = req.body.image;
    const url = req.body.url;
    const userid = req.session.userid;

    if(req.file) {
        image = req.file.filename;

        fs.unlink("./public/images/" + req.body.image, err => {
            console.log(err);
        });
    }

    const mainpage = req.body.mainpage == "on" ? 1:0;
    const confirmation = req.body.confirmation == "on" ? 1:0;
    const categoryIds = req.body.categories;
    const isAdmin = req.session.roles.includes("admin");

    try{
        const blog = await Blog.findOne({
            where: isAdmin ? { id: blogid } : { id: blogid, userId: userid },
            include: {
                model: Category,
                attributes: ["id"]
            }
        });

        if(blog) {
            blog.title = title;
            blog.subtitle = subtitle;
            blog.description = description;
            blog.image = image;
            blog.mainpage = mainpage;
            blog.confirmation = confirmation;
            blog.url = url;

            if (categoryIds == undefined) {
                await blog.removeCategories(blog.categories);
            } else {
                await blog.removeCategories(blog.categories);
                const selectedCategories = await Category.findAll({
                    where: {
                        id: {
                            [Op.in]: categoryIds
                        }
                    }
                });
                await blog.addCategories(selectedCategories);
;            }

            await blog.save();
            return res.redirect("/admin/blogs?action=edit");
        }
        res.redirect("/admin/blogs");
    }
    catch(err) {
        console.log(err);
    }
};

exports.post_category_remove = async(req, res) => {
    const blogid = req.body.blogid;
    const categoryid = req.body.categoryid;

    await sequelize.query(`DELETE FROM blogCategories WHERE  blogId=${blogid} AND categoryId=${categoryid}`);
    res.redirect("/admin/categories/" + categoryid);
}

exports.get_category_edit = async (req, res) => {
    const categoryid = req.params.categoryid;
    try {
        const category = await Category.findByPk(categoryid);
        const blogs = await category.getBlogs();
        const countBlogs = await category.countBlogs();

        if (category) {
            return res.render("admin/category-edit", {
                title: category.dataValues.name,
                category: category.dataValues,
                blogs: blogs,
                countBlogs: countBlogs
            });
        }
        res.redirect("/admin/blogs");
    }
    catch(err) {
        console.log(err);
    }
};

exports.post_category_edit = async (req, res) => {
    const categoryid = req.body.categoryid;
    const name = req.body.name;

    try{
        const category = await Category.findByPk(categoryid);
        if(category) {
            category.name = name;

            await category.save();
            return res.redirect("/admin/categories?action=edit");
        }
        res.redirect("/admin/categories");
    }
    catch(err) {
        console.log(err);
    }
};

exports.get_blogs = async (req, res) => {
    const userid = req.session.userid;
    const isModerator = req.session.roles.includes("moderator");
    const isAdmin = req.session.roles.includes("admin");
    try{
        const blogs = await Blog.findAll({
            attributes: ["id", "title", "image"],
            include: {
                model: Category,
                attributes: ["name"]
            },
            where: isModerator && !isAdmin ? {userId: userid} : null
        });
        res.render("admin/blog-list", {
            title: "Blog List",
            blogs: blogs,
            action: req.query.action
        });
    }
    catch(err) {
        console.log(err);
    }  
};

exports.get_categories = async (req, res) => {
    try{
        const categories = await Category.findAll();
        res.render("admin/category-list", {
            title: "Category List",
            categories: categories,
            action: req.query.action
        });
    }
    catch(err) {
        console.log(err);
    }
};

exports.get_roles = async (req, res) => {
    try{
        const roles = await Role.findAll({
            attributes: {
                include: ["role.id", "role.rolename", [sequelize.fn("COUNT", sequelize.col("users.id")), "user_count"]]
            },
            include: [
                {model: User, attributes:["id"]}
            ],
            group: ["role.id"],
            raw: true,
            includeIgnoreAttributes: false
        });

        res.render("admin/role-list", {
            title: "Role List",
            roles: roles
        });

    }
    catch(err) {
        console.log(err);
    }
};

exports.get_role_edit = async (req, res) => {
    const roleid = req.params.roleid;
    try{
        const role = await Role.findByPk(roleid);
        const users = await role.getUsers();
        if(role) {
            return res.render("admin/role-edit", {
                title: role.rolename,
                role: role,
                users: users
            });
        }
        res.redirect("admin/roles");
    }
    catch(err) {
        console.log(err);
    }
};

exports.post_role_edit = async (req, res) => {
    const roleid = req.body.roleid;
    const rolename = req.body.rolename;
    try{
        await Role.update({ rolename: rolename}, {
            where: {
                id: roleid
            }
        });
        return res.redirect("/admin/roles");
    }
    catch(err) {
        console.log(err);
    }
};

exports.roles_remove = async (req, res) => {
    const roleid = req.body.roleid;
    const userid = req.body.userid;
    try{
        await sequelize.query(`DELETE FROM userRoles WHERE userId=${userid} AND roleId=${roleid}`);
        return res.redirect("/admin/roles/" + roleid);
    }
    catch(err) {
        console.log(err);
    }
};

exports.get_user = async (req, res) => {
    try{
        const users = await User.findAll({
            attributes: ["id","fullname","email"],
            include: {
                model: Role,
                attributes: ["rolename"]
            }
        });

        res.render("admin/user-list", {
            title: "User List",
            users: users
        });
    }
    catch(err) {
        console.log(err);
    }
};

exports.get_user_edit = async (req, res) => {
    const userid = req.params.userid;
    try{
        const user = await User.findOne({
            where: { id: userid },
            include: { model: Role, attributes: ["id"] }
        });

        const roles = await Role.findAll();

        res.render("admin/user-edit", {
            title: "User Edit",
            user: user,
            roles: roles
        });
    }
    catch(err) {
        console.log(err);
    }
};

exports.post_user_edit = async (req, res) => {
    const userid = req.body.userid;
    const fullname = req.body.fullname;
    const email = req.body.email;
    const roleIds = req.body.roles;
    try {
        const user = await User.findOne({
            where: { id: userid },
            include: { model: Role, attributes: ["id"] }
        });

        if(user) {
            user.fullname = fullname;
            user.email = email;
            if(roleIds == undefined) {
                await user.removeRoles(user.roles);
            } else {
                await user.removeRoles(user.roles);
                const selectedRoles = await Role.findAll({
                    where: {
                        id: {
                            [Op.in]: roleIds
                        }
                    }
                });
                await user.addRoles(selectedRoles);
            }

            await user.save();
            return res.redirect("/admin/users");
        }
        return res.redirect("/admin/users");
    }
    catch(err) {
        console.log(err);
    }
};