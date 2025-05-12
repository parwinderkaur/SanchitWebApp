const express = require("express");
const router = express.Router();
const frontendController = require("../controllers/frontendController");
const adminController = require("../controllers/adminController");
const { uploadFor } = require("./utils/multer");

function isAuthenticated(req, res, next) {
    // if (req.session.userId) {
      return next();
    // }
    // res.redirect("/admin/login");
  }

// ✅ Frontend Routes
router.get("/", frontendController.home);
router.get("/services", frontendController.services);
router.get("/service-detail/:id", frontendController.serviceDetail);
router.get("/contact", frontendController.contact);
router.post("/api/contact", frontendController.contactApi);
router.get("/blogs", frontendController.blog);
router.get("/blog-detail/:id", frontendController.blogDetails);

// ✅ Frontend API Routes
router.get("/api/faqs", frontendController.getAllFaqs);
router.get("/api/testimonials", frontendController.getAllTestimonials);
router.get("/api/blogs", frontendController.getAllBlogs);
router.get("/api/services", frontendController.getAllServices);
router.get("/api/home-sections", frontendController.getAllHomeSections);
router.get("/api/settings", frontendController.getAllSettings);

// ✅ Admin Routes (Prefix manually handled)
router.get("/admin/login", adminController.login);
router.get("/admin/logout", adminController.logout);

router.get("/admin", isAuthenticated, adminController.dashboard);
router.get("/admin/home", isAuthenticated, adminController.home);
router.get("/admin/services", isAuthenticated, adminController.services);
router.get("/admin/blogs", isAuthenticated, adminController.blogs);
router.get("/admin/testimonials", isAuthenticated, adminController.testimonials);
router.get("/admin/faq", isAuthenticated, adminController.faq);
router.get("/admin/setting", isAuthenticated, adminController.setting);

// ✅ API Routes (POST Update by ID)
router.post("/api/admin/login", adminController.loginApi);
router.post("/api/settings",uploadFor("").single('logoImage'), adminController.settingApiUpdate);
router.post("/api/faqs", uploadFor("").single('logoImage'),adminController.faqApiUpdate);
router.post("/api/testimonials", uploadFor("").single('logoImage'),adminController.testimonialApiUpdate);
router.post("/api/blogs",uploadFor("blogs").single('image'), adminController.blogApiUpdate);
router.post("/api/services",uploadFor("services").single('image'), adminController.serviceApiUpdate);
router.post("/api/home-sections",uploadFor("images").single('image'), adminController.homeApiUpdate);

router.post("/api/faqs/delete", adminController.deleteFaq);
router.post("/api/testimonials/delete", adminController.deleteTestimonial);
router.post("/api/blogs/delete", adminController.deleteBlog);
router.post("/api/services/delete", adminController.deleteService);

module.exports = router;