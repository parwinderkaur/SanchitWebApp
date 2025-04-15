module.exports = {
    home: (req, res) => {
      res.render("index", { layout: 'layout/master' ,title: 'Crystals Healing Vibes || Home'});
    },
  
    services: (req, res) => {
      res.render("services", { layout: 'layout/master' ,title: 'Crystals Healing Vibes || Services'});
    },
  
    serviceDetail: (req, res) => {
      res.render("service-detail", { layout: 'layout/master' ,title: 'Crystals Healing Vibes || Services Details'});
    },
  
    contact: (req, res) => {
      res.render("contact", { layout: 'layout/master' ,title: 'Crystals Healing Vibes || Contact Us'});
    },
  
    blog: (req, res) => {
      res.render("blogs", { layout: 'layout/master' ,title: 'Crystals Healing Vibes || Blogs'});
    },
  
    blogDetails: (req, res) => {
      res.render("blog-detail", { layout: 'layout/master' ,title: 'Crystals Healing Vibes || Blogs Details'});
    },
    // ===== API Functions =====
    getAllFaqs: async (req, res) => {
      const faqs = await Faq.find();
      res.json(faqs);
    },

    getAllTestimonials: async (req, res) => {
      const testimonials = await Testimonial.find();
      res.json(testimonials);
    },

    getAllBlogs: async (req, res) => {
      const blogs = await Blog.find();
      res.json(blogs);
    },

    getBlogById: async (req, res) => {
      const blog = await Blog.findById(req.params.id);
      res.json(blog);
    },

    getAllServices: async (req, res) => {
      const services = await Service.find();
      res.json(services);
    },

    getServiceById: async (req, res) => {
      const service = await Service.findById(req.params.id);
      res.json(service);
    },

    getAllHomeSections: async (req, res) => {
      const home = await Home.find();
      res.json(home);
    },

    getAllSettings: async (req, res) => {
      const settings = await Setting.find();
      res.json(settings);
    }
  };
  