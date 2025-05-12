const Faq = require("../models/Faq");
const Testimonial = require("../models/Testimonial");
const Blog = require("../models/Blog");
const Service = require("../models/Service");
const Enquiry = require("../models/Contact");
const HomeSection = require("../models/HomeSection");
const Setting = require("../models/Setting");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const Joi = require("joi");
const fs = require("fs");
const path = require("path");

const homeSchema = Joi.object({
  id: Joi.string().length(24).hex().optional(),
  title: Joi.string().required(),    // Changed from "title"
  paragraphNo: Joi.number().required(),
  description: Joi.string().required(),         // Changed from "description"
  status: Joi.number().valid(1, 0).required(),
});
const serviceSchema = Joi.object({
  id: Joi.string().length(24).hex().optional(),
  title: Joi.string().required(),    
  description: Joi.string().required(),
  price: Joi.number().required(),
  status: Joi.number().valid(1,0).required(),
});
const blogSchema = Joi.object({
  id: Joi.string().length(24).hex().optional(),
  title: Joi.string().required(),
  description: Joi.string().required(),     
  dateOfPost: Joi.date().required(),
  status: Joi.number().valid(1,0).required(),
});
const testimonialSchema = Joi.object({
  id: Joi.string().length(24).hex().optional(),
  userName: Joi.string().required(),      
  description: Joi.string().required(),
  status: Joi.number().valid(1,0).required()
});
const faqSchema = Joi.object({
  id: Joi.string().length(24).hex().optional(),
  title: Joi.string().required(),
  description: Joi.string().required(),
  status: Joi.number().valid(1,0).required()
});

const settingSchema = Joi.object({
  id: Joi.string().length(24).hex().required(),
  primaryColor: Joi.string().optional(),
  secondaryColor: Joi.string().optional(),
  tertiaryColor: Joi.string().optional(),
  textColor: Joi.string().optional(),
  accentColor: Joi.string().optional(),
  textDarkColor: Joi.string().optional(),
  textLightColor: Joi.string().optional(),
  logoImage: Joi.string().optional(),
  email: Joi.string().email().optional(),
  number: Joi.string().optional(),
  address: Joi.string().optional(),
  instagramLink: Joi.string().optional(),
  whatsappLink: Joi.string().optional(),
  facebookLink: Joi.string().uri().optional(),
  whatWeProvide: Joi.string().optional(),
});

module.exports = {
  // ----------- AUTH ------------
  login: (req, res) => {
    res.render("admin/auth-login", { currentUrl: req.originalUrl,
        layout: false, title: 'Crystals Healing Vibes || Login' });
  },

  loginApi: async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });
      if (!user) {
        req.flash("error", "User not found");
        return res.redirect("/admin/login");
      }

      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        req.flash("error", "Invalid credentials");
        return res.redirect("/admin/login");
      }

      req.session.userId = user._id;
      res.redirect("/admin");
    } catch (error) {
      console.log(error);
      req.flash("error", "Something went wrong");
      res.redirect("/admin/login");
    }
  },

  logout: (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        console.log("Logout error:", err);
        return res.redirect("/admin");
      }
      res.clearCookie("connect.sid");
      res.redirect("/admin/login");
    });
  },

  // ----------- PAGES + LISTS (Combined) ------------
  dashboard: async (req, res) => {
    try {
      const [
        blogCount,
        serviceCount,
        faqCount,
        testimonialCount,
        enquiryRecords ] = await Promise.all([
        Blog.countDocuments(),
        Service.countDocuments(),
        Faq.countDocuments(),
        Testimonial.countDocuments(),
        Enquiry.find()
      ]);

      const records = {
        counts: {
          blogs: blogCount,
          services: serviceCount,
          faqs: faqCount,
          testimonials: testimonialCount
        },
        enquiries: enquiryRecords
      };

      res.render("admin/index", {
        records,
        "currentUrl": req.originalUrl,
        "layout": 'layout/admin-master',
        "title": 'Crystals Healing Vibes || Dashboard',
      });

    } catch (err) {
      console.error("Dashboard Error:", err);
      res.status(500).send("Something went wrong");
    }
  },
  home: async (req, res) => {
    const records = await HomeSection.find().lean();
    res.render("admin/home", { records, currentUrl: req.originalUrl,
        layout: 'layout/admin-master', title: 'Crystals Healing Vibes || Home Section' });
  },

  services: async (req, res) => {
    const records = await Service.find().lean();
    res.render("admin/services", { records, currentUrl: req.originalUrl,
        layout: 'layout/admin-master', title: 'Crystals Healing Vibes || Services Section' });
  },

  blogs: async (req, res) => {
    const records = await Blog.find().lean();
    res.render("admin/blogs", { records, currentUrl: req.originalUrl,
        layout: 'layout/admin-master', title: 'Crystals Healing Vibes || Blogs Section' });
  },

  testimonials: async (req, res) => {
    const records = await Testimonial.find().lean();
    res.render("admin/testimonials", { records, currentUrl: req.originalUrl,
        layout: 'layout/admin-master', title: 'Crystals Healing Vibes || Testimonials Section' });
  },

  faq: async (req, res) => {
    const records = await Faq.find().lean();
    res.render("admin/faq", { records, currentUrl: req.originalUrl,
        layout: 'layout/admin-master', title: 'Crystals Healing Vibes || FAQ Section' });
  },

  setting: async (req, res) => {
    const records = await Setting.findOne().lean()
    res.render("admin/setting", { records, currentUrl: req.originalUrl,
        layout: 'layout/admin-master', title: 'Crystals Healing Vibes || Setting Section' });
  },

  // ----------- ONLY UPDATE FUNCTIONS ------------
  faqApiUpdate: async (req, res) => {
    try {
      const { error } = faqSchema.validate(req.body);
    if (error) return res.status(400).json({ success: false, message: error.details[0].message });
      const { id, ...data } = req.body;
      const faq = id
        ? await Faq.findByIdAndUpdate(id, data, { new: true })
        : await Faq.create(data);
  
      if (!faq) {
        return res.status(404).json({ success: false, message: "FAQ not found or failed to create" });
      }
  
      res.json({
        success: true,
        message: id ? "FAQ updated successfully" : "FAQ created successfully",
        data: faq,
      });
    } catch (err) {
      res.status(500).json({ success: false, message: "Operation failed", error: err.message });
    }
  },      
  testimonialApiUpdate: async (req, res) => {
    try {
      const { error } = testimonialSchema.validate(req.body);
    if (error) return res.status(400).json({ success: false, message: error.details[0].message });
      const { id, ...data } = req.body;
      const testimonial = id
        ? await Testimonial.findByIdAndUpdate(id, data, { new: true })
        : await Testimonial.create(data);
  
      if (!testimonial) {
        return res.status(404).json({ success: false, message: "Testimonial not found or failed to create" });
      }
  
      res.json({
        success: true,
        message: id ? "Testimonial updated successfully" : "Testimonial created successfully",
        data: testimonial,
      });
    } catch (err) {
      res.status(500).json({ success: false, message: "Operation failed", error: err.message });
    }
  },
  blogApiUpdate: async (req, res) => {
    try {
      const { error } = blogSchema.validate(req.body);
      if (error) return res.status(400).json({ success: false, message: error.details[0].message });

      const { id, title, description, dateOfPost, status } = req.body;
      const data = { title, description, dateOfPost, status };

      if (req.file) {
        data.image = `/media/blogs/${req.file.filename}`;
      }

      let blog;
      if (id) {
        const existing = await Blog.findById(id);
        if (!existing) return res.status(404).json({ success: false, message: "Blog not found" });
        if (req.file && existing.image) {
          const oldImagePath = path.join(__dirname, `../public${existing.image}`);
          if (fs.existsSync(oldImagePath)) fs.unlinkSync(oldImagePath);
        }
        blog = await Blog.findByIdAndUpdate(id, data, { new: true });
      } else {
        blog = await Blog.create(data);
      }

      res.json({
        success: true,
        message: id ? "Blog updated successfully!" : "Blog created successfully!",
        data: blog,
      });
    } catch (err) {
      res.status(500).json({ success: false, message: "Operation failed", error: err.message });
    }
  },
  serviceApiUpdate: async (req, res) => {
    try {
      const { id, title, description, price, status } = req.body;
      let data = { title, description, price, status };
      const { error } = serviceSchema.validate(req.body);
      if (error) return res.status(400).json({ success: false, message: error.details[0].message });

      if (req.file) {
        data.image = `/media/services/${req.file.filename}`;
      }

      if (id) {
        const service = await Service.findById(id);
        if (!service) return res.status(404).json({ success: false, message: "Service not found" });

        if (req.file && service.image) {
          const oldImagePath = path.join(__dirname, `../public${service.image}`);
          if (fs.existsSync(oldImagePath)) fs.unlinkSync(oldImagePath);
        }
        await Service.findByIdAndUpdate(id, data);
        res.json({ success: true, message: "Service updated successfully." });
      } else {
        await Service.create(data);
        res.json({ success: true, message: "Service added successfully." });
      }
    } catch (err) {
      console.error("======err.message============", err.message);
      res.status(500).json({ success: false, message: "Update failed", error: err.message });
    }
  },
  homeApiUpdate: async (req, res) => {
    try {
      const { error } = homeSchema.validate(req.body);
      if (error) return res.status(400).json({ success: false, message: error.details[0].message });
      const updateData = {
        title: req.body.title,
        paragraphNo: req.body.paragraphNo,
        description: req.body.description,
        status: req.body.status,
      };
      if (req.file) {
        const old = await HomeSection.findById(req.body.id);
        if (old?.image) {
          const oldPath = path.join(__dirname, "../public/media/home/", old.image);
          if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
        }
        updateData.image = req.file.filename;
      }
      const updated = await HomeSection.findByIdAndUpdate(req.body.id, updateData, { new: true });
      if (!updated) return res.status(404).json({ success: false, message: "Home section not found" });

      res.json({ success: true, message: "Section updated successfully", data: updated });
    } catch (err) {
      res.status(500).json({ success: false, message: "Update failed", error: err.message });
    }
  },
  settingApiUpdate: async (req, res) => {
    try {
      const { error } = settingSchema.validate(req.body);
      if (error) return res.status(400).json({ success: false, message: error.details[0].message });

      const data = { ...req.body };
      if (req.file) {
        const setting = await Setting.findById(req.body.id);
        if (setting?.logoImage) {
          const oldPath = path.join(__dirname, "../public/media/", setting.logoImage);
          if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
        }
        data.logoImage = req.file.filename;
      }

      const updated = await Setting.findByIdAndUpdate(data.id, data, { new: true });
      if (!updated) return res.status(404).json({ success: false, message: "Setting not found" });

      res.json({ success: true, message: "Settings updated successfully", data: updated });
    } catch (err) {
      res.json({ success: false, message: "Error saving settings", error: err.message });
    }
  },
  deleteFaq : async (req, res) => {
    try {
      const schema = Joi.object({
        id: Joi.string().length(24).hex().required()
      });
      const { error } = schema.validate(req.body);
      if (error) return res.status(400).json({ success: false, message: error.details[0].message });

      await Faq.findByIdAndDelete(req.body.id);
      res.json({ success: true, message: "FAQ deleted successfully" });
    } catch (err) {
      console.error("Delete FAQ Error:", err);
      res.status(500).json({ success: false, message: "Internal Server Error" });
    }
  },
  deleteTestimonial : async (req, res) => {
    try {
      const schema = Joi.object({
        id: Joi.string().length(24).hex().required()
      });
      const { error } = schema.validate(req.body);
      if (error) return res.status(400).json({ success: false, message: error.details[0].message });

      await Testimonial.findByIdAndDelete(req.body.id);
      res.json({ success: true, message: "Testimonial deleted successfully" });
    } catch (err) {
      console.error("Delete Testimonial Error:", err);
      res.status(500).json({ success: false, message: "Internal Server Error" });
    }
  },
  deleteBlog : async (req, res) => {
    try {
      const schema = Joi.object({
        id: Joi.string().length(24).hex().required()
      });
      const { error } = schema.validate(req.body);
      if (error) return res.status(400).json({ success: false, message: error.details[0].message });

      const blog = await Blog.findById(req.body.id);
      if (!blog) return res.status(404).json({ success: false, message: "Blog not found" });

      if (blog.image) {
        const filePath = path.join(__dirname, "../public/media/blogs/", blog.image);
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      }

      await Blog.findByIdAndDelete(req.body.id);
      res.json({ success: true, message: "Blog deleted successfully" });
    } catch (err) {
      console.error("Delete Blog Error:", err);
      res.status(500).json({ success: false, message: "Internal Server Error" });
    }
  },
  deleteService : async (req, res) => {
    try {
      const schema = Joi.object({
        id: Joi.string().length(24).hex().required()
      });
      const { error } = schema.validate(req.body);
      if (error) return res.status(400).json({ success: false, message: error.details[0].message });

      const service = await Service.findById(req.body.id);
      if (!service) return res.status(404).json({ success: false, message: "Service not found" });

      if (service.image) {
        const filePath = path.join(__dirname, "../public/media/services/", service.image);
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      }

      await Service.findByIdAndDelete(req.body.id);
      res.json({ success: true, message: "Service deleted successfully" });
    } catch (err) {
      console.error("Delete Service Error:", err);
      res.status(500).json({ success: false, message: "Internal Server Error" });
    }
  }
};
