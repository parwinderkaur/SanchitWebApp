const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

// 📦 Models import
const Faq = require("./models/Faq");
const Testimonial = require("./models/Testimonial");
const Blog = require("./models/Blog");
const Service = require("./models/Service");
const Contact = require("./models/Contact");
const HomeSection = require("./models/HomeSection");
const Setting = require("./models/Setting");
const User = require("./models/User");
const bcrypt = require("bcryptjs");


// 🧠 MongoDB connection string
const mongoURI = "mongodb+srv://parwinderkaur385:0SYLwbGaoEFzO1LK@sanchitwebapp.eaptc00.mongodb.net/?retryWrites=true&w=majority&appName=SanchitWebApp";

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(async () => {
  console.log("✅ MongoDB connected for seeding.");

  // --- Data insert
  await Faq.insertMany([
    { title: "How to consult the astrologer?", description: "You can book a consultation using our contact form." },
    { title: "What services are provided?", description: "We offer horoscope, palmistry, vastu, and tarot services." },
    { title: "Is online consultation available?", description: "Yes, consultations are available via Zoom and WhatsApp." },
    { title: "Are the services confidential?", description: "Absolutely. Your privacy is our top priority." },
    { title: "What languages are supported?", description: "Hindi, English, and Sanskrit consultations available." }
  ]);

  await Testimonial.insertMany([
    { userName: "Rohit Sharma", description: "Very accurate predictions. Helped me take major life decisions!" },
    { userName: "Sneha Kapoor", description: "The tarot reading gave me amazing clarity!" },
    { userName: "Aman Verma", description: "Great experience with vastu consultation!" },
    { userName: "Divya Joshi", description: "My career path became clear after astrological guidance." },
    { userName: "Nitin Rao", description: "Authentic and trustworthy astrologer. Highly recommend!" }
  ]);

  await Blog.insertMany([
    { title: "Mercury Retrograde Explained", image: "mercury.jpg", dateOfPost: new Date("2024-11-01"), description: "How Mercury retrograde impacts your communication." },
    { title: "Zodiac Signs & Career", image: "career.jpg", dateOfPost: new Date("2024-12-15"), description: "Best career paths for each zodiac sign." },
    { title: "Kundli Matching Tips", image: "kundli.jpg", dateOfPost: new Date("2025-01-10"), description: "Important aspects to check while matching kundlis." },
    { title: "Mars Transit Update", image: "mars.jpg", dateOfPost: new Date("2025-02-08"), description: "Understand the impact of Mars transit." },
    { title: "2025 Horoscope Overview", image: "horoscope.jpg", dateOfPost: new Date("2025-03-05"), description: "A detailed horoscope guide for 2025." }
  ]);

  await Service.insertMany([
    { title: "Horoscope Reading", description: "Detailed birth chart analysis and predictions.", price: 999, image: "horoscope.jpg" },
    { title: "Palmistry", description: "Know your future through your palm lines.", price: 799, image: "palmistry.jpg" },
    { title: "Tarot Reading", description: "Get answers through tarot card guidance.", price: 699, image: "tarot.jpg" },
    { title: "Vastu Consultation", description: "Balance energies in your home and office.", price: 1499, image: "vastu.jpg" },
    { title: "Numerology", description: "Discover your lucky numbers and dates.", price: 599, image: "numerology.jpg" }
  ]);

  await Contact.insertMany([
    { name: "Priya Mehta", email: "priya@gmail.com", contact: "9876543210", message: "Interested in tarot reading." },
    { name: "Anil Rao", email: "anilrao@example.com", contact: "9812345678", message: "Need Vastu help for my new house." },
    { name: "Sunita Gupta", email: "sunita.g@gmail.com", contact: "9000012345", message: "Can I get a horoscope match?" }
  ]);

  await HomeSection.insertMany([
    { title: "Trusted Astrologer", paragraphNo: 1, description: "15+ years of guiding people spiritually.", image: "astro1.jpg" },
    { title: "Authentic Remedies", paragraphNo: 2, description: "We offer tried and tested Vedic solutions.", image: "astro2.jpg" }
  ]);

  await Setting.create({
    primaryColor: "#FFD700",
    secondaryColor: "#8B0000",
    tertiaryColor: "#FFF8DC",
    textColor: "#000000",
    logoImage: "logo.png",
    email: "astro@example.com",
    number: "+91-9876543210",
    address: "Delhi, India",
    instagramLink: "https://instagram.com/astroprofile",
    whatsappLink: "https://wa.me/919876543210",
    facebookLink: "https://facebook.com/astroprofile",
    whatWeProvide: "Horoscope, Tarot, Vastu, Palmistry, Numerology"
  });
  const hashedPassword = await bcrypt.hash("sanchit@1234", 10);
    await User.create({
    name: "Sanchit",
    email: "sanchit@admin.com",
    password: hashedPassword
    });
    console.log("✅ Admin user created: Email - sanchit@admin.com | Password - sanchit@1234");


  console.log("✅ Sample data inserted successfully!");
  process.exit();
})
.catch(err => {
  console.error("❌ Error during seeding:", err);
  process.exit(1);
});
