// import express to create a express app
const express = require("express");
const hbs = require("express-hbs");
const path = require("path");

// create array to store blog, initialize with one element first
const blogs = [
  {
    id: 1,
    title: "Pasar Coding di Indonesia Dinilai Masih Menjanjikan",
    post_date: "12 Jul 2021 22:30 WIB",
    author: "Ichsan Emrald Alamsyah",
    content: `Ketimpangan sumber daya manusia (SDM) di sektor digital masih
  menjadi isu yang belum terpecahkan. Berdasarkan penelitian
  ManpowerGroup, ketimpangan SDM global, termasuk Indonesia,
  meningkat dua kali lipat dalam satu dekade terakhir. Lorem ipsum,
  dolor sit amet consectetur adipisicing elit. Quam, molestiae
  numquam! Deleniti maiores expedita eaque deserunt quaerat! Dicta,
  eligendi debitis?`,
  },
];

// initialize app
const app = express();

app.engine("hbs", hbs.express4());
app.set("view engine", "hbs");
app.set("views", "./views");

app.use("/public", express.static("./public"));
app.use(express.urlencoded({ extended: false })); // define request parser
// initialize hello world
app.get("/", (req, res) => {
  res.send("Hello World");
});

// hard code login state
const isLogin = true;

// define route for get home page
app.get("/home", (req, res) => {
  res.setHeader("Content-Type", "text/html");
  res.setHeader("Cache-Control", "s-max-age=1, stale-while-revalidate");
  res.render("index");
});

// define route for get blog page
app.get("/blog", (req, res) => {
  //rende blogs data to page
  res.setHeader("Content-Type", "text/html");
  res.setHeader("Cache-Control", "s-max-age=1, stale-while-revalidate");
  res.render("blog", { isLogin: isLogin, blogs: blogs });
});

// define route for get form blog page
app.get("/add-blog", (req, res) => {
  res.setHeader("Content-Type", "text/html");
  res.setHeader("Cache-Control", "s-max-age=1, stale-while-revalidate");
  res.render("form-blog");
});

/// define route for get blog detail page with params
app.get("/blog/:id", (req, res) => {
  // get selected blog id with params
  const blogId = req.params.id;
  const blog = blogs.find((item) => item.id == blogId);
  // render blog-detail page and send data to view
  res.setHeader("Content-Type", "text/html");
  res.setHeader("Cache-Control", "s-max-age=1, stale-while-revalidate");
  res.render("blog-detail", { blog });
});

// define route for receive post data from client
app.post("/blog", (req, res) => {
  console.log({
    title: req.body.title,
    content: req.body.content,
  });
  const blog = {
    title: req.body.title,
    post_date: "12 Jul 2021 22:30 WIB",
    author: "Ichsan Emrald Alamsyah",
    content: req.body.content,
  };

  // store new post blog to blogs array
  blogs.push(blog);

  // redirect to specific route
  res.redirect("/blog");
});

// define route for handling delete post
app.get("/delete-blog/:id", (req, res) => {
  // get blog index by fetch req params
  const index = req.params.id;

  // remove blog at specific index with count number equal to 1
  blogs.splice(index, 1);

  // redirect to blog route for refetch blog page
  res.redirect("/blog");
});

const PORT = process.env.PORT || 3000;

// start server listener on PORT 5000
app.listen(PORT, () => {
  console.log("server starting on PORT: ", PORT);
});
