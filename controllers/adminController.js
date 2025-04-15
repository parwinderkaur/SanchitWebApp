const Faq = require("../models/Faq");
const Testimonial = require("../models/Testimonial");
const Blog = require("../models/Blog");
const Service = require("../models/Service");
const Enquiry = require("../models/Contact");
const HomeSection = require("../models/HomeSection");
const Setting = require("../models/Setting");
const User = require("../models/User");
const bcrypt = require("bcrypt");

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
console.log("========================records==========================",records);
console.log("-==originalUrl==========",req.originalUrl);

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
      const updated = await Faq.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!updated) {
        return res.status(404).json({ success: false, message: "FAQ not found" });
      }
      res.json({ success: true, message: "FAQ updated successfully", data: updated });
    } catch (err) {
      res.status(500).json({ success: false, message: "Update failed", error: err.message });
    }
  },

  testimonialApiUpdate: async (req, res) => {
    try {
      const updated = await Testimonial.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!updated) {
        return res.status(404).json({ success: false, message: "Testimonial not found" });
      }
      res.json({ success: true, message: "Testimonial updated successfully", data: updated });
    } catch (err) {
      res.status(500).json({ success: false, message: "Update failed", error: err.message });
    }
  },

  blogApiUpdate: async (req, res) => {
    try {
      const data = {
        title: req.body.title,
        description: req.body.description,
        dateOfPost: req.body.dateOfPost,
        status: req.body.status,
      };
      console.log("====blogApiUpdate===============",req.file.filename)

      // If a new image was uploaded, include it
      if (req.file) {
        console.log("====req.file===============",req.file)
        data.image = req.file.filename;
      }
      console.log("====data===============",data)
      const updated = await Blog.findByIdAndUpdate(req.params.id, data, { new: true });
  
      if (!updated) {
        return res.status(404).json({ success: false, message: "Blog not found" });
      }
      return res.json({ success: true, message: "Blog updated successfully!", data: updated });
  
    } catch (err) {
      res.status(500).json({ success: false, message: "Update failed", error: err.message });
    }
  },

  serviceApiUpdate: async (req, res) => {
    try {
      const updateData = {
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        status: req.body.status,
      };
      if (req.file) {
        updateData.image = req.file.filename;
      }
      const updated = await Service.findByIdAndUpdate(req.params.id, updateData, { new: true });
      if (!updated) {
        return res.status(404).json({ success: false, message: "Service not found" });
      }
      res.json({ success: true, message: "Service updated successfully", data: updated });
    } catch (err) {
      res.status(500).json({ success: false, message: "Update failed", error: err.message });
    }
  },

  homeApiUpdate: async (req, res) => {
    try {
      const updateData = {
        title: req.body.title,
        paragraphNo: req.body.paragraphNo,
        description: req.body.description,
        status: req.body.status,
      };
      if (req.file) {
        updateData.image = req.file.filename;
      }
      const updated = await HomeSection.findByIdAndUpdate(req.params.id, updateData, { new: true });
      if (!updated) {
        return res.status(404).json({ success: false, message: "Section not found" });
      }
      res.json({ success: true, message: "Section updated successfully", data: updated });
    } catch (err) {
      res.status(500).json({ success: false, message: "Update failed", error: err.message });
    }
  },

  settingApiUpdate: async (req, res) => {
    try {
      const data = { ...req.body };
      if (req.file) {
        data.logoImage = req.file.filename;
      }
      console.log("========data=========",data)
      console.log("========req.params.id=========",data.id)

      const updated = await Setting.findByIdAndUpdate(data.id, data, { new: true });
      console.log("========updated=========",updated)

      if (!updated) {
        return res.status(404).json({ success: false, message: "Setting not found" });
      }
  
      res.json({ success: true, message: "Settings updated successfully", data: updated });
    } catch (err) {
      res.json({ success: false, message: "Error saving settings", error: err.message });
    }
  }
};
