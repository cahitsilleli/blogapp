const Category = require("../models/category");
const Blog = require("../models/blog");
const slugField = require("../helpers/slugfield");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const Role = require("../models/role");

async function populate() {
    const count = await Category.count();

    if (count == 0) {

        const users = await User.bulkCreate([
            {fullname: "Cahit Silleli", email: "cahitsilleli@gmail.com", password: await bcrypt.hash("123123123", 10)},
            {fullname: "Selin Suleler", email: "selinsuleler@gmail.com", password: await bcrypt.hash("123123123", 10)},
            {fullname: "Cafer Karabulut", email: "caferkarabulut@gmail.com", password: await bcrypt.hash("123123123", 10)},
            {fullname: "Damla Kocakoglu", email: "damlakocakoglu@gmail.com", password: await bcrypt.hash("123123123", 10)},
            {fullname: "Selin Yildiz", email: "selinyildiz@gmail.com", password: await bcrypt.hash("123123123", 10)},
        ]);

        const roles = await Role.bulkCreate([
            {rolename: "admin"},
            {rolename: "moderator"},
            {rolename: "guest"}
        ])

        await users[0].addRole(roles[0]);   // cahit => admin
        await users[1].addRole(roles[1]);   // selin => moderator
        await users[2].addRole(roles[1]);   // cafer => moderator
        await users[3].addRole(roles[2]);   // damla => guest
        await users[4].addRole(roles[2]);   // selinY => guest

        const categories = await Category.bulkCreate([
            { name: "Web Development", url: slugField("Web Development")},
            { name: "Mobile Applications", url: slugField("Mobile Applications")},
            { name: "Data Analysis", url: slugField("Data Analysis")},
            { name: "Programming", url: slugField("Programming")}
        ]);

        const blogs = await Blog.bulkCreate([
            {
                title: "loremLorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam et odio eget nisi luctus luctus vitae eget velit. Donec eget porta ligula. Mauris aliquet odio id mattis tempor.",
                subtitle: "Suspendisse lobortis vitae tellus ut accumsan. Etiam mattis, purus vel tincidunt vehicula, tellus purus pharetra tortor, at laoreet odio sapien eu tortor.",
                description: " Etiam aliquet sodales mi, quis venenatis nulla mollis lobortis. Praesent nibh libero, tristique ut bibendum nec, ultrices egestas mauris. Nulla est augue, cursus nec accumsan ac, venenatis a nulla. Sed id massa maximus, egestas lectus sed, sollicitudin risus. Aenean et ipsum ut massa accumsan lobortis. Suspendisse rutrum, nunc nec porttitor vestibulum, massa augue vulputate orci, ut tincidunt dui lorem at quam. Pellentesque quis faucibus ex. Suspendisse lobortis vitae tellus ut accumsan. Etiam mattis, purus vel tincidunt vehicula, tellus purus pharetra tortor, at laoreet odio sapien eu tortor. ",
                image: "1.jpeg",
                mainpage: true,
                confirmation: true,
                url: slugField("loremLorem ipsum dolor sit amet consectetur adipiscing elit Aliquam et odio eget nisi luctus luctus vitae eget velit Donec eget porta ligula Mauris aliquet odio id mattis tempor"),
                userId: 2
            },
            {
                title: "loremLorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam et odio eget nisi luctus luctus vitae eget velit. Donec eget porta ligula. Mauris aliquet odio id mattis tempor.",
                subtitle: "Suspendisse lobortis vitae tellus ut accumsan. Etiam mattis, purus vel tincidunt vehicula, tellus purus pharetra tortor, at laoreet odio sapien eu tortor.",
                description: " Etiam aliquet sodales mi, quis venenatis nulla mollis lobortis. Praesent nibh libero, tristique ut bibendum nec, ultrices egestas mauris. Nulla est augue, cursus nec accumsan ac, venenatis a nulla. Sed id massa maximus, egestas lectus sed, sollicitudin risus. Aenean et ipsum ut massa accumsan lobortis. Suspendisse rutrum, nunc nec porttitor vestibulum, massa augue vulputate orci, ut tincidunt dui lorem at quam. Pellentesque quis faucibus ex. Suspendisse lobortis vitae tellus ut accumsan. Etiam mattis, purus vel tincidunt vehicula, tellus purus pharetra tortor, at laoreet odio sapien eu tortor. ",
                image: "2.jpeg",
                mainpage: true,
                confirmation: true,
                url: slugField("loremLorem ipsum dolor sit amet consectetur adipiscing elit Aliquam et odio eget nisi luctus luctus vitae eget velit Donec eget porta ligula Mauris aliquet odio id mattis tempor"),
                userId: 2
            },
            {
                title: "loremLorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam et odio eget nisi luctus luctus vitae eget velit. Donec eget porta ligula. Mauris aliquet odio id mattis tempor.",
                subtitle: "Suspendisse lobortis vitae tellus ut accumsan. Etiam mattis, purus vel tincidunt vehicula, tellus purus pharetra tortor, at laoreet odio sapien eu tortor.",
                description: " Etiam aliquet sodales mi, quis venenatis nulla mollis lobortis. Praesent nibh libero, tristique ut bibendum nec, ultrices egestas mauris. Nulla est augue, cursus nec accumsan ac, venenatis a nulla. Sed id massa maximus, egestas lectus sed, sollicitudin risus. Aenean et ipsum ut massa accumsan lobortis. Suspendisse rutrum, nunc nec porttitor vestibulum, massa augue vulputate orci, ut tincidunt dui lorem at quam. Pellentesque quis faucibus ex. Suspendisse lobortis vitae tellus ut accumsan. Etiam mattis, purus vel tincidunt vehicula, tellus purus pharetra tortor, at laoreet odio sapien eu tortor. ",
                image: "2.jpeg",
                mainpage: true,
                confirmation: true,
                url: slugField("loremLorem ipsum dolor sit amet consectetur adipiscing elit Aliquam et odio eget nisi luctus luctus vitae eget velit Donec eget porta ligula Mauris aliquet odio id mattis tempor"),
                userId: 2
            },
            {
                title: "loremLorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam et odio eget nisi luctus luctus vitae eget velit. Donec eget porta ligula. Mauris aliquet odio id mattis tempor.",
                subtitle: "Suspendisse lobortis vitae tellus ut accumsan. Etiam mattis, purus vel tincidunt vehicula, tellus purus pharetra tortor, at laoreet odio sapien eu tortor.",
                description: " Etiam aliquet sodales mi, quis venenatis nulla mollis lobortis. Praesent nibh libero, tristique ut bibendum nec, ultrices egestas mauris. Nulla est augue, cursus nec accumsan ac, venenatis a nulla. Sed id massa maximus, egestas lectus sed, sollicitudin risus. Aenean et ipsum ut massa accumsan lobortis. Suspendisse rutrum, nunc nec porttitor vestibulum, massa augue vulputate orci, ut tincidunt dui lorem at quam. Pellentesque quis faucibus ex. Suspendisse lobortis vitae tellus ut accumsan. Etiam mattis, purus vel tincidunt vehicula, tellus purus pharetra tortor, at laoreet odio sapien eu tortor. ",
                image: "2.jpeg",
                mainpage: true,
                confirmation: true,
                url: slugField("loremLorem ipsum dolor sit amet consectetur adipiscing elit Aliquam et odio eget nisi luctus luctus vitae eget velit Donec eget porta ligula Mauris aliquet odio id mattis tempor"),
                userId: 2
            },
            {
                title: "loremLorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam et odio eget nisi luctus luctus vitae eget velit. Donec eget porta ligula. Mauris aliquet odio id mattis tempor.",
                subtitle: "Suspendisse lobortis vitae tellus ut accumsan. Etiam mattis, purus vel tincidunt vehicula, tellus purus pharetra tortor, at laoreet odio sapien eu tortor.",
                description: " Etiam aliquet sodales mi, quis venenatis nulla mollis lobortis. Praesent nibh libero, tristique ut bibendum nec, ultrices egestas mauris. Nulla est augue, cursus nec accumsan ac, venenatis a nulla. Sed id massa maximus, egestas lectus sed, sollicitudin risus. Aenean et ipsum ut massa accumsan lobortis. Suspendisse rutrum, nunc nec porttitor vestibulum, massa augue vulputate orci, ut tincidunt dui lorem at quam. Pellentesque quis faucibus ex. Suspendisse lobortis vitae tellus ut accumsan. Etiam mattis, purus vel tincidunt vehicula, tellus purus pharetra tortor, at laoreet odio sapien eu tortor. ",
                image: "1.jpeg",
                mainpage: true,
                confirmation: true,
                url: slugField("loremLorem ipsum dolor sit amet consectetur adipiscing elit Aliquam et odio eget nisi luctus luctus vitae eget velit Donec eget porta ligula Mauris aliquet odio id mattis tempor"),
                userId: 3
            },
            {
                title: "loremLorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam et odio eget nisi luctus luctus vitae eget velit. Donec eget porta ligula. Mauris aliquet odio id mattis tempor.",
                subtitle: "Suspendisse lobortis vitae tellus ut accumsan. Etiam mattis, purus vel tincidunt vehicula, tellus purus pharetra tortor, at laoreet odio sapien eu tortor.",
                description: " Etiam aliquet sodales mi, quis venenatis nulla mollis lobortis. Praesent nibh libero, tristique ut bibendum nec, ultrices egestas mauris. Nulla est augue, cursus nec accumsan ac, venenatis a nulla. Sed id massa maximus, egestas lectus sed, sollicitudin risus. Aenean et ipsum ut massa accumsan lobortis. Suspendisse rutrum, nunc nec porttitor vestibulum, massa augue vulputate orci, ut tincidunt dui lorem at quam. Pellentesque quis faucibus ex. Suspendisse lobortis vitae tellus ut accumsan. Etiam mattis, purus vel tincidunt vehicula, tellus purus pharetra tortor, at laoreet odio sapien eu tortor. ",
                image: "2.jpeg",
                mainpage: true,
                confirmation: true,
                url: slugField("loremLorem ipsum dolor sit amet consectetur adipiscing elit Aliquam et odio eget nisi luctus luctus vitae eget velit Donec eget porta ligula Mauris aliquet odio id mattis tempor"),
                userId: 3
            },
            {
                title: "loremLorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam et odio eget nisi luctus luctus vitae eget velit. Donec eget porta ligula. Mauris aliquet odio id mattis tempor.",
                subtitle: "Suspendisse lobortis vitae tellus ut accumsan. Etiam mattis, purus vel tincidunt vehicula, tellus purus pharetra tortor, at laoreet odio sapien eu tortor.",
                description: " Etiam aliquet sodales mi, quis venenatis nulla mollis lobortis. Praesent nibh libero, tristique ut bibendum nec, ultrices egestas mauris. Nulla est augue, cursus nec accumsan ac, venenatis a nulla. Sed id massa maximus, egestas lectus sed, sollicitudin risus. Aenean et ipsum ut massa accumsan lobortis. Suspendisse rutrum, nunc nec porttitor vestibulum, massa augue vulputate orci, ut tincidunt dui lorem at quam. Pellentesque quis faucibus ex. Suspendisse lobortis vitae tellus ut accumsan. Etiam mattis, purus vel tincidunt vehicula, tellus purus pharetra tortor, at laoreet odio sapien eu tortor. ",
                image: "2.jpeg",
                mainpage: true,
                confirmation: true,
                url: slugField("loremLorem ipsum dolor sit amet consectetur adipiscing elit Aliquam et odio eget nisi luctus luctus vitae eget velit Donec eget porta ligula Mauris aliquet odio id mattis tempor"),
                userId: 3
            },
            {
                title: "loremLorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam et odio eget nisi luctus luctus vitae eget velit. Donec eget porta ligula. Mauris aliquet odio id mattis tempor.",
                subtitle: "Suspendisse lobortis vitae tellus ut accumsan. Etiam mattis, purus vel tincidunt vehicula, tellus purus pharetra tortor, at laoreet odio sapien eu tortor.",
                description: " Etiam aliquet sodales mi, quis venenatis nulla mollis lobortis. Praesent nibh libero, tristique ut bibendum nec, ultrices egestas mauris. Nulla est augue, cursus nec accumsan ac, venenatis a nulla. Sed id massa maximus, egestas lectus sed, sollicitudin risus. Aenean et ipsum ut massa accumsan lobortis. Suspendisse rutrum, nunc nec porttitor vestibulum, massa augue vulputate orci, ut tincidunt dui lorem at quam. Pellentesque quis faucibus ex. Suspendisse lobortis vitae tellus ut accumsan. Etiam mattis, purus vel tincidunt vehicula, tellus purus pharetra tortor, at laoreet odio sapien eu tortor. ",
                image: "2.jpeg",
                mainpage: true,
                confirmation: true,
                url: slugField("loremLorem ipsum dolor sit amet consectetur adipiscing elit Aliquam et odio eget nisi luctus luctus vitae eget velit Donec eget porta ligula Mauris aliquet odio id mattis tempor"),
                userId: 3
            },
            {
                title: "loremLorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam et odio eget nisi luctus luctus vitae eget velit. Donec eget porta ligula. Mauris aliquet odio id mattis tempor.",
                subtitle: "Suspendisse lobortis vitae tellus ut accumsan. Etiam mattis, purus vel tincidunt vehicula, tellus purus pharetra tortor, at laoreet odio sapien eu tortor.",
                description: " Etiam aliquet sodales mi, quis venenatis nulla mollis lobortis. Praesent nibh libero, tristique ut bibendum nec, ultrices egestas mauris. Nulla est augue, cursus nec accumsan ac, venenatis a nulla. Sed id massa maximus, egestas lectus sed, sollicitudin risus. Aenean et ipsum ut massa accumsan lobortis. Suspendisse rutrum, nunc nec porttitor vestibulum, massa augue vulputate orci, ut tincidunt dui lorem at quam. Pellentesque quis faucibus ex. Suspendisse lobortis vitae tellus ut accumsan. Etiam mattis, purus vel tincidunt vehicula, tellus purus pharetra tortor, at laoreet odio sapien eu tortor. ",
                image: "1.jpeg",
                mainpage: true,
                confirmation: true,
                url: slugField("loremLorem ipsum dolor sit amet consectetur adipiscing elit Aliquam et odio eget nisi luctus luctus vitae eget velit Donec eget porta ligula Mauris aliquet odio id mattis tempor"),
                userId: 3
            },
            {
                title: "loremLorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam et odio eget nisi luctus luctus vitae eget velit. Donec eget porta ligula. Mauris aliquet odio id mattis tempor.",
                subtitle: "Suspendisse lobortis vitae tellus ut accumsan. Etiam mattis, purus vel tincidunt vehicula, tellus purus pharetra tortor, at laoreet odio sapien eu tortor.",
                description: " Etiam aliquet sodales mi, quis venenatis nulla mollis lobortis. Praesent nibh libero, tristique ut bibendum nec, ultrices egestas mauris. Nulla est augue, cursus nec accumsan ac, venenatis a nulla. Sed id massa maximus, egestas lectus sed, sollicitudin risus. Aenean et ipsum ut massa accumsan lobortis. Suspendisse rutrum, nunc nec porttitor vestibulum, massa augue vulputate orci, ut tincidunt dui lorem at quam. Pellentesque quis faucibus ex. Suspendisse lobortis vitae tellus ut accumsan. Etiam mattis, purus vel tincidunt vehicula, tellus purus pharetra tortor, at laoreet odio sapien eu tortor. ",
                image: "2.jpeg",
                mainpage: true,
                confirmation: true,
                url: slugField("loremLorem ipsum dolor sit amet consectetur adipiscing elit Aliquam et odio eget nisi luctus luctus vitae eget velit Donec eget porta ligula Mauris aliquet odio id mattis tempor"),
                userId: 3
            },
            {
                title: "loremLorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam et odio eget nisi luctus luctus vitae eget velit. Donec eget porta ligula. Mauris aliquet odio id mattis tempor.",
                subtitle: "Suspendisse lobortis vitae tellus ut accumsan. Etiam mattis, purus vel tincidunt vehicula, tellus purus pharetra tortor, at laoreet odio sapien eu tortor.",
                description: " Etiam aliquet sodales mi, quis venenatis nulla mollis lobortis. Praesent nibh libero, tristique ut bibendum nec, ultrices egestas mauris. Nulla est augue, cursus nec accumsan ac, venenatis a nulla. Sed id massa maximus, egestas lectus sed, sollicitudin risus. Aenean et ipsum ut massa accumsan lobortis. Suspendisse rutrum, nunc nec porttitor vestibulum, massa augue vulputate orci, ut tincidunt dui lorem at quam. Pellentesque quis faucibus ex. Suspendisse lobortis vitae tellus ut accumsan. Etiam mattis, purus vel tincidunt vehicula, tellus purus pharetra tortor, at laoreet odio sapien eu tortor. ",
                image: "2.jpeg",
                mainpage: true,
                confirmation: true,
                url: slugField("loremLorem ipsum dolor sit amet consectetur adipiscing elit Aliquam et odio eget nisi luctus luctus vitae eget velit Donec eget porta ligula Mauris aliquet odio id mattis tempor"),
                userId: 2
            },
            {
                title: "loremLorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam et odio eget nisi luctus luctus vitae eget velit. Donec eget porta ligula. Mauris aliquet odio id mattis tempor.",
                subtitle: "Suspendisse lobortis vitae tellus ut accumsan. Etiam mattis, purus vel tincidunt vehicula, tellus purus pharetra tortor, at laoreet odio sapien eu tortor.",
                description: " Etiam aliquet sodales mi, quis venenatis nulla mollis lobortis. Praesent nibh libero, tristique ut bibendum nec, ultrices egestas mauris. Nulla est augue, cursus nec accumsan ac, venenatis a nulla. Sed id massa maximus, egestas lectus sed, sollicitudin risus. Aenean et ipsum ut massa accumsan lobortis. Suspendisse rutrum, nunc nec porttitor vestibulum, massa augue vulputate orci, ut tincidunt dui lorem at quam. Pellentesque quis faucibus ex. Suspendisse lobortis vitae tellus ut accumsan. Etiam mattis, purus vel tincidunt vehicula, tellus purus pharetra tortor, at laoreet odio sapien eu tortor. ",
                image: "2.jpeg",
                mainpage: true,
                confirmation: true,
                url: slugField("loremLorem ipsum dolor sit amet consectetur adipiscing elit Aliquam et odio eget nisi luctus luctus vitae eget velit Donec eget porta ligula Mauris aliquet odio id mattis tempor"),
                userId: 2
            },
            {
                title: "loremLorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam et odio eget nisi luctus luctus vitae eget velit. Donec eget porta ligula. Mauris aliquet odio id mattis tempor.",
                subtitle: "Suspendisse lobortis vitae tellus ut accumsan. Etiam mattis, purus vel tincidunt vehicula, tellus purus pharetra tortor, at laoreet odio sapien eu tortor.",
                description: " Etiam aliquet sodales mi, quis venenatis nulla mollis lobortis. Praesent nibh libero, tristique ut bibendum nec, ultrices egestas mauris. Nulla est augue, cursus nec accumsan ac, venenatis a nulla. Sed id massa maximus, egestas lectus sed, sollicitudin risus. Aenean et ipsum ut massa accumsan lobortis. Suspendisse rutrum, nunc nec porttitor vestibulum, massa augue vulputate orci, ut tincidunt dui lorem at quam. Pellentesque quis faucibus ex. Suspendisse lobortis vitae tellus ut accumsan. Etiam mattis, purus vel tincidunt vehicula, tellus purus pharetra tortor, at laoreet odio sapien eu tortor. ",
                image: "1.jpeg",
                mainpage: true,
                confirmation: true,
                url: slugField("loremLorem ipsum dolor sit amet consectetur adipiscing elit Aliquam et odio eget nisi luctus luctus vitae eget velit Donec eget porta ligula Mauris aliquet odio id mattis tempor"),
                userId: 2
            },
            {
                title: "loremLorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam et odio eget nisi luctus luctus vitae eget velit. Donec eget porta ligula. Mauris aliquet odio id mattis tempor.",
                subtitle: "Suspendisse lobortis vitae tellus ut accumsan. Etiam mattis, purus vel tincidunt vehicula, tellus purus pharetra tortor, at laoreet odio sapien eu tortor.",
                description: " Etiam aliquet sodales mi, quis venenatis nulla mollis lobortis. Praesent nibh libero, tristique ut bibendum nec, ultrices egestas mauris. Nulla est augue, cursus nec accumsan ac, venenatis a nulla. Sed id massa maximus, egestas lectus sed, sollicitudin risus. Aenean et ipsum ut massa accumsan lobortis. Suspendisse rutrum, nunc nec porttitor vestibulum, massa augue vulputate orci, ut tincidunt dui lorem at quam. Pellentesque quis faucibus ex. Suspendisse lobortis vitae tellus ut accumsan. Etiam mattis, purus vel tincidunt vehicula, tellus purus pharetra tortor, at laoreet odio sapien eu tortor. ",
                image: "2.jpeg",
                mainpage: true,
                confirmation: true,
                url: slugField("loremLorem ipsum dolor sit amet consectetur adipiscing elit Aliquam et odio eget nisi luctus luctus vitae eget velit Donec eget porta ligula Mauris aliquet odio id mattis tempor"),
                userId: 2
            },
            {
                title: "loremLorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam et odio eget nisi luctus luctus vitae eget velit. Donec eget porta ligula. Mauris aliquet odio id mattis tempor.",
                subtitle: "Suspendisse lobortis vitae tellus ut accumsan. Etiam mattis, purus vel tincidunt vehicula, tellus purus pharetra tortor, at laoreet odio sapien eu tortor.",
                description: " Etiam aliquet sodales mi, quis venenatis nulla mollis lobortis. Praesent nibh libero, tristique ut bibendum nec, ultrices egestas mauris. Nulla est augue, cursus nec accumsan ac, venenatis a nulla. Sed id massa maximus, egestas lectus sed, sollicitudin risus. Aenean et ipsum ut massa accumsan lobortis. Suspendisse rutrum, nunc nec porttitor vestibulum, massa augue vulputate orci, ut tincidunt dui lorem at quam. Pellentesque quis faucibus ex. Suspendisse lobortis vitae tellus ut accumsan. Etiam mattis, purus vel tincidunt vehicula, tellus purus pharetra tortor, at laoreet odio sapien eu tortor. ",
                image: "2.jpeg",
                mainpage: true,
                confirmation: true,
                url: slugField("loremLorem ipsum dolor sit amet consectetur adipiscing elit Aliquam et odio eget nisi luctus luctus vitae eget velit Donec eget porta ligula Mauris aliquet odio id mattis tempor"),
                userId: 2
            },
            {
                title: "loremLorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam et odio eget nisi luctus luctus vitae eget velit. Donec eget porta ligula. Mauris aliquet odio id mattis tempor.",
                subtitle: "Suspendisse lobortis vitae tellus ut accumsan. Etiam mattis, purus vel tincidunt vehicula, tellus purus pharetra tortor, at laoreet odio sapien eu tortor.",
                description: " Etiam aliquet sodales mi, quis venenatis nulla mollis lobortis. Praesent nibh libero, tristique ut bibendum nec, ultrices egestas mauris. Nulla est augue, cursus nec accumsan ac, venenatis a nulla. Sed id massa maximus, egestas lectus sed, sollicitudin risus. Aenean et ipsum ut massa accumsan lobortis. Suspendisse rutrum, nunc nec porttitor vestibulum, massa augue vulputate orci, ut tincidunt dui lorem at quam. Pellentesque quis faucibus ex. Suspendisse lobortis vitae tellus ut accumsan. Etiam mattis, purus vel tincidunt vehicula, tellus purus pharetra tortor, at laoreet odio sapien eu tortor. ",
                image: "2.jpeg",
                mainpage: true,
                confirmation: true,
                url: slugField("loremLorem ipsum dolor sit amet consectetur adipiscing elit Aliquam et odio eget nisi luctus luctus vitae eget velit Donec eget porta ligula Mauris aliquet odio id mattis tempor"),
                userId: 3
            },
        ]);

        await categories[0].addBlog(blogs[0]);
        await categories[0].addBlog(blogs[1]);
        await categories[0].addBlog(blogs[2]);
        await categories[0].addBlog(blogs[3]);
        await categories[0].addBlog(blogs[4]);
        await categories[0].addBlog(blogs[5]);
        await categories[0].addBlog(blogs[6]);
        await categories[0].addBlog(blogs[7]);
        await categories[0].addBlog(blogs[8]);
        await categories[0].addBlog(blogs[9]);
        await categories[0].addBlog(blogs[10]);
        await categories[0].addBlog(blogs[11]);
        await categories[0].addBlog(blogs[12]);
        await categories[0].addBlog(blogs[13]);
        await categories[1].addBlog(blogs[14]);
        await categories[1].addBlog(blogs[15]);
        
        await categories[1].addBlog(blogs[2]);
        await categories[1].addBlog(blogs[3]);
        
        await categories[2].addBlog(blogs[2]);
        await categories[2].addBlog(blogs[3]);

        await blogs[0].addCategories(categories[1]);
    }
};

module.exports = populate;