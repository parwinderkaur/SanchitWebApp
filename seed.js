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
}).then(async () => {
  console.log("✅ MongoDB connected for seeding.");

  await Faq.deleteMany({});
  await Testimonial.deleteMany({});
  await Blog.deleteMany({});
  await Service.deleteMany({});
  await Contact.deleteMany({});
  await HomeSection.deleteMany({});
  await Setting.deleteMany({});
  await User.deleteMany({});

  await Faq.insertMany([
    {
      title: "How to book a consultation?",
      description: "You can book your session by sending us a message on WhatsApp or Instagram. We’ll confirm your timing and preferred service—be it tarot, numerology, or healing—and share payment details before the session."
    },
    {
      title: "What types of services do you offer?",
      description: "We offer tarot and oracle readings, numerology (including name and mobile number corrections), healing sessions, and personalized crystal recommendations. You can also shop for bracelets, pyramids, and spiritual tools."
    },
    {
      title: "Are consultations online or offline?",
      description: "All consultations are currently online, making it easy to connect from anywhere in India. Sessions are conducted via WhatsApp calls, Zoom, or voice notes—depending on what suits you best."
    },
    {
      title: "How do I know which crystal is right for me?",
      description: "Based on your energy and the challenges you're facing, we intuitively and practically suggest the most aligned crystals. For deeper accuracy, a quick tarot or numerology analysis can also guide the right pick."
    },
    {
      title: "Is it safe to wear crystals all the time?",
      description: "Yes, most crystals are safe for daily wear, but it depends on your energy. Some might over-stimulate if worn continuously. We'll guide you on cleansing and programming your stones for safe, effective use."
    }
  ]);
  
  await Testimonial.insertMany([
    { userName: "Meena Soni", description: "The crystal bracelet brought real peace to my life!" },
    { userName: "Kunal Bajaj", description: "Her tarot reading was spot on and deeply healing." },
    { userName: "Rashi Gupta", description: "Numerology advice changed the way I approach my goals." },
    { userName: "Vikram Seth", description: "Very knowledgeable in gems. Helped me choose the right one!" },
    { userName: "Tanya Kapoor", description: "Best guidance I’ve ever received, both spiritually and practically." }
  ]);
  
  await Blog.insertMany([  
    {
      title: "How to Choose the Right Crystal for You",
      image: "/media/blogs/blog-1.jpg",
      dateOfPost: new Date("2025-01-12"),
      description: "Choosing the right crystal can feel like an overwhelming task with so many options available—amethyst, rose quartz, citrine, tiger's eye, and many more. With countless choices, it might be difficult to know where to begin, and that's where this guide comes in. The process of selecting a crystal is often misunderstood as one based on logical thinking, but the truth is, crystals choose you. You must trust your intuition when selecting a crystal. Crystals have energies and vibrations that correspond to various aspects of life, including emotional, physical, and spiritual well-being. Whether you're drawn to a certain color, shape, or type of crystal, there's a reason why it resonates with you at that particular moment in your life. This guide will take you through the process of connecting with the energy of the stone, what your intuition is telling you, and how to identify the right one based on your needs. A key point to remember is that your body, mind, and spirit are in constant need of balance, and the right crystal can help bring that balance into your life. Not only will this blog help you in selecting the perfect crystal, but it will also guide you through the cleansing process and teach you how to incorporate crystals into your daily routine. Crystals are powerful allies that can aid in emotional healing, provide protection, or assist in meditation practices. Whether you're new to the world of crystals or already have a collection, this guide will provide you with the necessary knowledge and confidence to make the best choice. You'll learn how to trust your instincts, and once you do, the connection with your crystal will be much more than just a physical object. It will become a spiritual companion on your journey toward self-discovery and healing. So, let's begin your crystal journey with confidence, knowing that the crystal you choose will support your personal growth and enhance your spiritual path.",
    },
    {
      title: "Numerology Secrets: Your Name and Mobile Number Matter",
      image: "/media/blogs/blog-4.jpg",
      dateOfPost: new Date("2025-02-25"),
      description: "Did you know that your name and mobile number vibrate with specific energies? Numerology is the ancient art of studying numbers and their relationship to events in your life. Each letter of your name has a corresponding number, and each number holds a distinct vibration that influences the experiences, challenges, and successes you encounter. By understanding these vibrations, you can decode the energy patterns around you and begin to live in alignment with your true potential. Your name isn't just a label—it's a map to your destiny. The vibrational frequencies embedded in your name reveal key aspects of your personality, life path, and even the types of relationships you attract. Similarly, your mobile number holds significance as well. It's not just a random set of digits; each digit carries energy that can influence your communication, relationships, and overall vibrational frequency. This post dives deep into how numerology can help you align your life by making subtle changes to your name or mobile number. Whether you decide to change the spelling of your name or pick a new number, small shifts can dramatically shift the energy around you. Numerology is a powerful tool for attracting abundance, improving relationships, and fostering success. It can help you identify the best times to make big decisions, or it can give you guidance when you feel stuck. Understanding your name and mobile number's energy can help you attract the right opportunities, relationships, and luck into your life. For anyone serious about shifting their energy and attracting more abundance, numerology offers an accessible and insightful way to make positive changes. Read on to learn how small adjustments can create massive transformation, guiding you toward a more harmonious and successful life.",
    },
    {
      title: "Tarot vs Oracle: Which One Should You Pick?",
      image: "/media/blogs/blog-5.jpg",
      dateOfPost: new Date("2025-03-18"),
      description: "Tarot and oracle cards are both popular tools for divination, but they have distinct differences that can make one more suited to your personal needs. Tarot cards have a structured system, with 78 cards divided into the Major Arcana and Minor Arcana. Each card has a specific meaning, and the readings are often based on traditional interpretations. Tarot cards offer insights into your life’s challenges, opportunities, and potential paths, often focusing on deeper psychological or spiritual issues. Oracle cards, on the other hand, are much more flexible and intuitive. They come in many different decks, each with its own theme, such as angels, animals, or even abstract concepts. Oracle cards don't follow a set structure, so they offer more freedom in interpretation and allow for a broader range of messages. Whether you are seeking answers to specific questions or guidance on your general life path, both tarot and oracle cards can provide invaluable insights. But which one should you pick? This blog explains the differences between tarot and oracle cards, helping you decide which deck resonates with you the most. If you're facing a difficult life situation and need clear guidance, tarot may be your best choice, as its structure helps provide detailed answers. If you're looking for more gentle, intuitive guidance, an oracle deck may be better suited to your needs. Whether you're drawn to the history and structure of tarot or the creative freedom of oracle cards, this post will help you understand when and why to choose one over the other. Ultimately, the best deck is the one that connects most deeply with you, and this blog will give you the tools to find your perfect match.",
    },
    {
      title: "How Crystal Bracelets Can Shift Your Vibe",
      image: "/media/blogs/blog-6.jpg",
      dateOfPost: new Date("2025-04-02"),
      description: "Crystal bracelets have become increasingly popular, and for good reason. Wearing a crystal bracelet is more than just a fashion statement—it's an energetic tool that can help shift your vibrations, protect your energy, and attract positivity. Each crystal holds a unique vibrational frequency that corresponds to different aspects of your life. For example, rose quartz is known for promoting love and compassion, while black tourmaline is known for its protective properties. By wearing crystal bracelets, you can carry the energy of these stones with you wherever you go, allowing their vibrations to influence your mood, health, and overall well-being. In this blog, we'll explore how crystal bracelets can help you align with your goals and manifest your desires. You'll learn how to pick the right bracelet for your personal intentions, how to energize it, and how to wear it for maximum effect. We’ll also discuss the common combinations of crystals used in bracelets, such as combining citrine for success with amethyst for spiritual growth. Additionally, we’ll explore the different ways to wear your bracelet, such as on specific wrists or in conjunction with other healing tools. By the end of this post, you’ll have a better understanding of how to use crystal bracelets to raise your vibration and create a life filled with abundance, love, and protection. Whether you’re new to crystals or an experienced healer, this guide will offer insights into how you can harness the power of crystal bracelets to transform your energy and your life.",
    },
    {
      title: "Top 5 Healing Tools You Need in 2025",
      image: "/media/blogs/blog-8.jpg",
      dateOfPost: new Date("2025-04-10"),
      description: "In 2025, the world of spiritual healing is evolving, offering a blend of ancient practices and modern tools that can help you on your healing journey. Whether you're a seasoned spiritual practitioner or just starting, these top 5 healing tools will support your personal growth and provide you with the guidance you need to thrive. First, we’ll dive into the world of pyramids, an ancient tool known for its energy amplification properties. Pyramids help align the body’s energy and increase spiritual awareness, making them a powerful tool for meditation, protection, and manifestation. Next, we'll look at maalas—prayer beads that are used for counting mantras or affirmations. These beads have been used for centuries in meditation practices and offer a grounding, calming energy. Third, we’ll introduce sound therapy tools like tuning forks and singing bowls. Sound healing is an ancient practice that uses vibrations to cleanse and heal the body, mind, and spirit. In addition, we’ll explore crystal healing tools, such as wands and grids, which help to focus and amplify the energy of crystals for more effective healing. Lastly, we'll talk about modern tools like essential oils and diffusion systems that help purify the air, support emotional balance, and create a calming atmosphere. This blog will provide you with practical tips on how to use each of these tools and how to set your intention to achieve the best results. Whether you want to enhance your spiritual practice, heal emotional wounds, or manifest your desires, these tools will help you align with your higher self and create a life of balance and harmony.",
    }
]); 
  
  await Service.insertMany([
    { 
        title: "Tarot Reading", 
        description: "Tarot reading is an ancient form of divination, offering profound insights into your life's journey. Each card represents a unique symbol and energy, revealing hidden truths, obstacles, and opportunities. Whether seeking clarity on relationships, career paths, or personal growth, tarot readings offer a safe space for reflection. Through the interpretation of the cards, you will receive personalized guidance, helping you make informed decisions. This form of spiritual counseling uses intuitive techniques to answer questions and provide wisdom on how to navigate life's challenges. It offers a deeper connection to your inner self and the universe, enabling you to gain a clearer perspective on life. The reading will help you understand the emotional, mental, and spiritual aspects of your being, unlocking your potential for growth. The tarot deck holds a vast array of energies, and each reading offers a different experience, guiding you to a deeper sense of peace and understanding.", 
        price: 799, 
        image: "" 
    },
    { 
        title: "Oracle Card Reading", 
        description: "Oracle card reading is a beautiful and empowering tool for seeking divine guidance and inspiration. Unlike tarot cards, oracle cards have a broader range of themes, from angels to animals, helping you connect with a variety of spiritual sources. These cards serve as messengers, offering wisdom and insight on your life’s current situation, future possibilities, and lessons. The images and messages on the cards act as a mirror, reflecting your deepest emotions, fears, and desires. By connecting with the oracle, you are guided to make decisions with clarity and purpose. An oracle card reading serves as a powerful reminder to trust in your intuition, helping you find peace during difficult times. Whether you need direction, support, or encouragement, an oracle card reading is an invaluable tool to unlock divine messages and understanding. It invites you to embrace the spiritual world and its energies, creating a deeper connection with your true self.", 
        price: 699, 
        image: "" 
    },
    { 
        title: "Numerology Consultation", 
        description: "Numerology is the study of numbers and their mystical significance in your life. Each number holds a unique vibration that influences your personality, destiny, and life events. Through numerology, you can understand the deeper meaning of your birthdate, name, and other key numbers that shape your life path. This consultation offers a personalized analysis of your numbers, helping you gain clarity on important decisions. Numerology provides insight into your strengths, challenges, and life purpose, allowing you to align with your true potential. It offers practical guidance for improving various areas of your life, including relationships, career, health, and personal growth. By understanding your numbers, you can tap into the natural flow of the universe, making choices that support your highest good. Numerology also helps you identify patterns in your life, offering a deeper understanding of recurring themes and cycles. This consultation offers a path to self-awareness and empowerment, guiding you towards a life of balance, harmony, and fulfillment.", 
        price: 999, 
        image: "" 
    },
    { 
        title: "Name and Mobile Numerology", 
        description: "Name and mobile numerology offers an innovative way to improve your luck and energy by analyzing the numbers associated with your name and phone number. According to numerology, every name and phone number vibrates with a unique energy that affects your life. By understanding these energies, you can make adjustments to create more positive outcomes. This session helps you discover the hidden meaning behind your name, revealing its impact on your personal characteristics, relationships, and life events. Mobile numerology, on the other hand, focuses on the numbers within your phone number, which is believed to influence your communication style, relationships, and business interactions. Through this service, you will gain insights into how the numbers in your life can be optimized for success, luck, and abundance. Numerology also provides practical tips on how to select a new name or phone number that resonates better with your personal goals, offering a deeper connection to your life purpose.", 
        price: 599, 
        image: "" 
    },
    { 
        title: "Healing Session", 
        description: "A healing session is an energetic practice designed to cleanse and align your chakras, bringing balance and harmony to your body, mind, and spirit. During a session, a variety of healing techniques may be used, such as energy work, crystal healing, Reiki, and sound therapy. These techniques work together to release blockages, negative emotions, and stress, restoring the flow of energy throughout your system. By addressing both physical and emotional imbalances, healing sessions support overall well-being and spiritual growth. The goal is to help you feel more grounded, centered, and empowered, enabling you to live your life with greater ease and joy. Whether you’re dealing with health challenges, emotional trauma, or simply need to reconnect with your inner peace, a healing session offers a safe space for deep restoration. This session promotes relaxation, rejuvenation, and a sense of renewal, helping you feel more aligned with your true self and purpose. It’s an opportunity to release old patterns and embrace a healthier, more balanced way of living.", 
        price: 1199, 
        image: "" 
    },
    { 
        title: "Crystal Suggestion", 
        description: "Crystals have long been revered for their healing properties and spiritual significance. Each crystal carries its own unique energy and vibration, offering support and guidance in various aspects of life. In a crystal suggestion session, you will receive personalized recommendations for crystals based on your unique needs and life circumstances. Whether you're seeking to enhance your creativity, attract abundance, heal emotional wounds, or protect your energy, there is a crystal for every intention. The healing properties of crystals can help clear negative energy, promote physical healing, and support emotional well-being. By incorporating crystals into your daily life, you can tap into their powerful energies and align with your highest potential. This session helps you select the perfect crystals that resonate with your energy, providing you with a tangible tool to aid in your spiritual and personal growth. Crystals can be used in a variety of ways, such as wearing jewelry, placing them in your home, or carrying them with you throughout the day. Each crystal serves as a unique ally on your journey of transformation and healing.", 
        price: 499, 
        image: "" 
    },
    { 
        title: "Crystal and Gemstone Products", 
        description: "Our crystal and gemstone products offer a wide range of beautifully crafted items designed to harness the energy of healing stones. From bracelets and maalas to pyramids and pendulums, each item is carefully selected and energized to support your spiritual practice and personal growth. Whether you are looking for a meaningful gift, a tool for meditation, or a way to enhance your energy, our crystal products offer something for everyone. Each piece is made with love and intention, ensuring that it carries the highest vibration of healing and protection. Crystals and gemstones are not only beautiful but are also powerful tools for transformation. They can help you clear negative energy, enhance your intuition, attract abundance, and support your overall well-being. Wearing or carrying these stones allows you to stay connected to their healing properties throughout the day. Our collection features a wide variety of crystals, each with its own unique qualities, helping you create a harmonious and balanced environment in your life.", 
        price: 299, 
        image: "" 
    }
]);
  
  await Contact.insertMany([
    { name: "Ritu Sharma", email: "ritu@mail.com", contact: "9871234560", message: "Want to book a tarot session." },
    { name: "Saurabh Verma", email: "saurabhv@example.com", contact: "9823456789", message: "Need a crystal for financial growth." },
    { name: "Neha Arora", email: "neha.a@gmail.com", contact: "9990012345", message: "Looking for name numerology advice." }
  ]);

  await HomeSection.insertMany([
    {
      title: "Experienced Crystal and Gemstone Expert",
      paragraphNo: 1,
      description: "With over 15 years of expertise, we guide clients to the right crystals and gemstones for healing, protection, and abundance. Whether you're a beginner or an experienced spiritual seeker, we help you find what truly aligns with your energy.",
      image: "/media/images/hero-img.png"
    },{
      title: "Occult Wisdom for Deep Healing",
      paragraphNo: 2,
      description: "Blending 2–4 years of intense occult training with years of intuitive practice, we offer tarot, oracle, and numerology consultations that reveal hidden truths and bring emotional, mental, and spiritual clarity.",
      image: "/media/images/about-img.png"
    },{
      title: "Customized Crystal Solutions",
      paragraphNo: 3,
      description: "Every client’s energy is unique. We suggest crystals tailored to specific issues—be it career, health, relationships, or spiritual blockages—and provide high-quality products like bracelets, maalas, and pyramids.",
      image: "/media/images/about-img-2.png"
    },{
      title: "Trusted by Hundreds Across India",
      paragraphNo: 4,
      description: "Over the years, our work has helped people across India overcome personal and professional challenges. We maintain client confidentiality while offering genuine, empathetic guidance in every session.",
      image: "/media/vector/cunsulation.png"
    },{
      title: "Get in Touch for Consultations",
      paragraphNo: 5,
      description: "We’re just a message away! Consultations are available online via WhatsApp or Instagram DM. Book a tarot session, get a numerology analysis, or ask about crystals—we’ll guide you with clarity and compassion.",
      image: "/media/vector/personal-advice.png"
    },{
      paragraphNo: 6,
      title: "Healing Through Crystals",
      description: "Experience natural healing with personalized crystal and gemstone recommendations.",
      image: "/media/vector/career.png"
    }
  ]);  

  await Setting.create({
    primaryColor: '#fff7ad',
    secondaryColor: '#8B0000',
    tertiaryColor: '#FFF8DC',
    textColor: '#000000',
    logoImage: '/media/logo.png',
    accentColor: '#ffa9f9',
    textDarkColor: '#000000',
    textLightColor: '#ff00ed' ,
    email: "sanchit@crystalshealingvibes.com",
    number: "+91-9783395556",
    address: "Jaipur, India",
    instagramLink: "https://www.instagram.com/crystalshealingvibes",
    whatsappLink: "https://wa.me/919783395556",
    facebookLink: "https://www.facebook.com/share/187CFaXoB2",
    whatWeProvide: "At Crystals Healing Vibes, we guide you through the cosmos with personalized insights and empowering predictions. Explore your potential, unlock clarity, and align with the universe's rhythm. Your journey to self-discovery starts here."
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
}).catch(err => {
  console.error("❌ Error during seeding:", err);
  process.exit(1);
});