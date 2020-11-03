const { sequelize } = require("../db/index");
const passport = require('passport');

function Init(app) {
  
  app.get("/blog", async function (request, response) {
    const blogs = await sequelize.models.blogs.findAll({});
    response.status(200).send(blogs);
  });

  app.get("/blog/:id", async function (request, response) {
    const { id } = request.params;
    const blog = await sequelize.models.blogs.findOne({ id });
    response.send({ blog });
  });

  app.delete("/blog/:id", async function (request, response) {
    const { id } = request.params;
    const blog = await sequelize.models.blogs.findOne({ id });
    const dest = await blog.destroy();
    response.send({ dest });
  });

  app.post("/blog",
    passport.authenticate("jwt", { session: false }),
    async function (request, response) {
      const { body } = request;
      const { blog_name, language } = body;

      const createdBlog = await sequelize.models.blogs.create({
        blog_name ,
        language,
      });
      response.status(201).send(createdBlog);
    }
  );

  app.put("/blog/:id", 
  passport.authenticate("jwt", { session: false }),
  async function (request, response) {
    const { id } = request.params;
    const blog = await sequelize.models.blogs.findOne({ id });

    const { body } = request;
    const { blog_name, language } = body;

    blog.blog_name = blog_name ? blog_name : blog.blog_name;
    blog.language = language ? language : blog.language;

    
    await blog.save();  

    response.status(200).send(blog);
  });
}

module.exports = {
  Init,
};
