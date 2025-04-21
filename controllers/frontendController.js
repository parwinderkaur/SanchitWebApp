const Faq = require("../models/Faq");
const Testimonial = require("../models/Testimonial");
const Blog = require("../models/Blog");
const Service = require("../models/Service");
const Home = require("../models/HomeSection");
const Setting = require("../models/Setting");
const moment = require('moment');
const Contact = require("../models/Contact");


module.exports = {
  // HOME PAGE
  home: async (req, res) => {
    try {
      const [settings, sections, faqs, testimonials] = await Promise.all([
        Setting.findOne().lean(),
        Home.find({ status: 1 }).lean(),
        Faq.find({ status: 1 }).lean(),
        Testimonial.find({ status: 1 }).lean()
      ]);
      console.log("===settings===========",settings)
      console.log("===sections===========",sections)
      console.log("===faqs===========",faqs)
      console.log("===settings===========",settings)
      // Home.find({ status: 1 }).lean(),
      res.render("index", {
        layout: 'layout/master',
        title: settings?.metaTitle || 'Crystals Healing Vibes || Home',
        settings,
        sections,
        faqs,
        testimonials
      });
    } catch (err) {
      console.error("Home controller error:", err);
      res.status(500).send("Internal Server Error");
    }
  },

  // SERVICES LIST PAGE
  services: async (req, res) => {
    try {
      const [settings, services] = await Promise.all([
        Setting.findOne().lean(),
        Service.find({ status: 1 }).lean()
      ]);
      res.render("services", {
        layout: 'layout/master',
        title: 'Crystals Healing Vibes || Services',
        services,
        settings
      });
    } catch (err) {
      console.error("Services Error:", err);
      res.status(500).send("Internal Server Error");
    }
  },

  // SERVICE DETAIL PAGE
  serviceDetail: async (req, res) => {
    try {
      const [settings, service, servicesList] = await Promise.all([
        Setting.findOne().lean(),
        Service.findById(req.params.id).lean(),
        Service.find({ _id: { $ne: req.params.id } }).lean()
    ]);
    
      if (!service) {
        return res.status(404).render("errors/404", { layout: false });
      }
      res.render("service-detail", {
        layout: 'layout/master',
        title: service.title,
        service,
        settings,servicesList
      });
    } catch (err) {
      console.error("Service Detail Error:", err);
      res.status(500).send("Internal Server Error");
    }
  },

  // CONTACT PAGE
  contact: async (req, res) => {
    try {
      const settings = await Setting.findOne().lean();
      res.render("contact", {
        layout: 'layout/master',
        title: 'Crystals Healing Vibes || Contact Us',
        settings
      });
    } catch (err) {
      console.error("Contact Page Error:", err);
      res.status(500).send("Internal Server Error");
    }
  },
  contactApi: async (req, res) => {
    try {
      const data = {
        name: req.body.name,
        email: req.body.email,
        contact: req.body.phone,
        message: req.body.message,
      };
  
      console.log("====contactApi===================", data);
  
      const savedContact = await Contact.create(data);
  
      if (!savedContact) {
        return res.status(400).json({ success: false, message: "Contact could not be saved" });
      }
  
      return res.json({
        success: true,
        message: "Contact form submitted successfully!",
        data: savedContact,
      });
  
    } catch (err) {
      res.status(500).json({
        success: false,
        message: "An error occurred while submitting the contact form.",
        error: err.message,
      });
    }
  },

  // BLOG LIST PAGE
  blog: async (req, res) => {
    try {
      const [settings, blogs] = await Promise.all([
        Setting.findOne().lean(),
        Blog.find({ status: 1 }).sort({ dateOfPost: -1 }).lean()
      ]);
      res.render("blogs", {
        layout: 'layout/master',
        title: 'Crystals Healing Vibes || Blogs',
        blogs,moment,
        settings
      });
    } catch (err) {
      console.error("Blogs Error:", err);
      res.status(500).send("Internal Server Error");
    }
  },

  // BLOG DETAIL PAGE
  blogDetails: async (req, res) => {
    try {
      const [settings, blog] = await Promise.all([
        Setting.findOne().lean(),
        Blog.findById(req.params.id).lean()
      ]);
      if (!blog) {
        return res.status(404).render("errors/404", { layout: false });
      }
      res.render("blog-detail", {
        layout: 'layout/master',
        title: blog.title,
        blog,moment,
        settings
      });
    } catch (err) {
      console.error("Blog Detail Error:", err);
      res.status(500).send("Internal Server Error");
    }
  },

  // ===== API Functions (as is, for frontend AJAX etc.) =====
  getAllFaqs: async (req, res) => {
    const faqs = await Faq.find({ status: 1 });
    res.json(faqs);
  },

  getAllTestimonials: async (req, res) => {
    const testimonials = await Testimonial.find({ status: 1 });
    res.json(testimonials);
  },

  getAllBlogs: async (req, res) => {
    const blogs = await Blog.find({ status: 1 });
    res.json(blogs);
  },

  getAllServices: async (req, res) => {
    const services = await Service.find({ status: 1 });
    res.json(services);
  },

  getAllHomeSections: async (req, res) => {
    const home = await Home.find({ status: 1 });
    res.json(home);
  },

  getAllSettings: async (req, res) => {
    const settings = await Setting.find({ status: 1 });
    res.json(settings);
  }
};