import express from "express";
import cors from "cors";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import nodemailer from "nodemailer";
import cookieParser from "cookie-parser";

import dotenv from "dotenv";
dotenv.config({ path: "./server/.env" });

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "https://digital-marketing-agency-eight.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (like Postman)
      if (!origin) return callback(null, true);

      if (allowedOrigins.indexOf(origin) === -1) {
        const msg =
          "The CORS policy for this site does not allow access from the specified Origin.";
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    credentials: true,
  })
);

app.use(cookieParser());

const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET;
const MONGODB_URI = process.env.MONGO_URI;
console.log("Loaded MONGO_URI:", process.env.MONGO_URI);

// Email configuration
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// MongoDB connection
mongoose
  .connect(MONGODB_URI)
  .then(async () => {
    console.log("✅ Connected to MongoDB");
    await initializeData(); // ensure admin, services, and portfolio are inserted
  })
  .catch((err) => console.error("MongoDB connection error:", err));

// MongoDB Schemas
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: "user", enum: ["user", "admin"] },
  created_at: { type: Date, default: Date.now },
});

const portfolioItemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image_url: { type: String, required: true },
  category: { type: String, required: true },
  client: String,
  challenge: String,
  strategy: String,
  results: String,
  created_at: { type: Date, default: Date.now },
});

const serviceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  fields: [{ type: mongoose.Schema.Types.Mixed }],
  created_by: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  created_at: { type: Date, default: Date.now },
});

const serviceRequestSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  service_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Service",
    required: true,
  },
  form_data: { type: mongoose.Schema.Types.Mixed, required: true },
  status: { type: String, default: "pending" },
  created_at: { type: Date, default: Date.now },
});

const contactMessageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
});

// Models
const User = mongoose.model("User", userSchema);
const PortfolioItem = mongoose.model("PortfolioItem", portfolioItemSchema);
const Service = mongoose.model("Service", serviceSchema);
const ServiceRequest = mongoose.model("ServiceRequest", serviceRequestSchema);
const ContactMessage = mongoose.model("ContactMessage", contactMessageSchema);

// Initialize admin user and sample data
const initializeData = async () => {
  try {
    // --- Create admin user if not exists ---
    const adminExists = await User.findOne({ email: "admin@gmail.com" });
    if (!adminExists) {
      const hashedPassword = await bcrypt.hash("admin@123", 10);
      const admin = new User({
        name: "Admin",
        email: "admin@gmail.com",
        password: hashedPassword,
        role: "admin",
      });
      await admin.save();
      console.log("✅ Admin user created");
    }

    const admin = await User.findOne({ email: "admin@gmail.com" });

    // --- Services initialization ---
    const servicesData = [
      {
        name: "SEO Optimization",
        description: "Improve your website's search engine rankings",
        created_by: admin._id,
        fields: [
          {
            name: "website_url",
            label: "Website URL",
            type: "url",
            required: true,
          },
          {
            name: "target_keywords",
            label: "Target Keywords",
            type: "text",
            required: true,
          },
          {
            name: "budget",
            label: "Monthly Budget ($)",
            type: "number",
            required: true,
          },
        ],
      },
      {
        name: "Social Media Marketing",
        description: "Grow your brand presence on social platforms",
        created_by: admin._id,
        fields: [
          {
            name: "platforms",
            label: "Platforms",
            type: "select",
            options: ["Instagram", "Facebook", "Twitter", "LinkedIn", "TikTok"],
            required: true,
          },
          {
            name: "content_type",
            label: "Content Type",
            type: "select",
            options: ["Posts", "Stories", "Reels", "Video"],
            required: true,
          },
          {
            name: "budget",
            label: "Monthly Budget ($)",
            type: "number",
            required: true,
          },
        ],
      },
      {
        name: "PPC / Google Ads",
        description: "Run high-performing paid advertising campaigns",
        created_by: admin._id,
        fields: [
          {
            name: "campaign_type",
            label: "Campaign Type",
            type: "select",
            options: [
              "Search Ads",
              "Display Ads",
              "Shopping Ads",
              "YouTube Video Ads",
            ],
            required: true,
          },
          {
            name: "daily_budget",
            label: "Daily Budget ($)",
            type: "number",
            required: true,
          },
          {
            name: "target_audience",
            label: "Target Audience",
            type: "text",
            required: true,
          },
        ],
      },
      {
        name: "Content Marketing",
        description:
          "Create valuable and engaging content to attract customers",
        created_by: admin._id,
        fields: [
          {
            name: "content_type",
            label: "Content Type",
            type: "select",
            options: [
              "Blog Writing & SEO Content",
              "Video Marketing",
              "Infographics",
              "Full Content Strategy",
            ],
            required: true,
          },
          {
            name: "niche",
            label: "Niche / Industry",
            type: "text",
            required: true,
          },
          {
            name: "budget",
            label: "Monthly Budget ($)",
            type: "number",
            required: true,
          },
        ],
      },
      {
        name: "Web Design & Development",
        description: "Build a professional and responsive website",
        created_by: admin._id,
        fields: [
          {
            name: "project_type",
            label: "Project Type",
            type: "select",
            options: [
              "Landing Page Design",
              "Full Website Development",
              "E-commerce Website",
              "Website Redesign",
            ],
            required: true,
          },
          {
            name: "website_purpose",
            label: "Purpose of Website",
            type: "text",
            required: true,
          },
          {
            name: "budget",
            label: "Total Budget ($)",
            type: "number",
            required: true,
          },
        ],
      },
      {
        name: "Branding & Graphic Design",
        description: "Create a strong brand identity with creative designs",
        created_by: admin._id,
        fields: [
          {
            name: "branding_type",
            label: "Branding Service Type",
            type: "select",
            options: [
              "Logo Design",
              "Brand Kit",
              "Social Media Graphics",
              "Complete Brand Identity",
            ],
            required: true,
          },
          {
            name: "brand_name",
            label: "Brand Name",
            type: "text",
            required: true,
          },
          {
            name: "color_preferences",
            label: "Color Preferences",
            type: "text",
            required: false,
          },
        ],
      },
      {
        name: "Email Marketing",
        description: "Engage customers with targeted email campaigns",
        created_by: admin._id,
        fields: [
          {
            name: "email_service_type",
            label: "Email Service Type",
            type: "select",
            options: [
              "One-time Campaign Setup",
              "Drip Campaign Automation",
              "Newsletter Design",
              "Full Email Strategy",
            ],
            required: true,
          },
          {
            name: "audience_size",
            label: "Audience Size",
            type: "number",
            required: true,
          },
          {
            name: "budget",
            label: "Monthly Budget ($)",
            type: "number",
            required: true,
          },
        ],
      },
    ];

    for (const service of servicesData) {
      const exists = await Service.findOne({ name: service.name });
      if (!exists) {
        await Service.create(service);
        console.log(`✅ Service added: ${service.name}`);
      }
    }

    // --- Portfolio initialization ---
    const portfolioData = [
      {
        title: "E-commerce SEO Success",
        description: "Increased organic traffic by 300% for online retailer",
        image_url:
          "https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg",
        category: "SEO",
        client: "TechStore Inc",
        challenge:
          "TechStore Inc struggled with declining organic search visibility.",
        strategy:
          "Performed SEO audit, optimized site, created content, built backlinks.",
        results: "300% traffic increase and +40% monthly revenue.",
      },
      {
        title: "Social Media Campaign",
        description: "Built engaged community of 50K+ followers",
        image_url:
          "https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg",
        category: "Social Media",
        client: "Fashion Brand",
        challenge: "Needed brand awareness in competitive market.",
        strategy: "6-month campaign with influencers & interactive content.",
        results: "50K followers, +220% engagement, +30% sales uplift.",
      },
      {
        title: "Google Ads Performance",
        description: "Achieved 400% ROAS for SaaS startup",
        image_url:
          "https://images.pexels.com/photos/590016/pexels-photo-590016.jpeg",
        category: "Paid Ads",
        client: "CloudTech Solutions",
        challenge:
          "The SaaS startup was struggling with low-quality leads and high acquisition costs through traditional campaigns.",
        strategy:
          "We rebuilt the Google Ads funnel, implemented advanced keyword targeting, and set up conversion tracking with A/B testing.",
        results:
          "ROAS improved to 400%, customer acquisition cost dropped by 45%, and lead quality improved significantly.",
      },
      {
        title: "Content Strategy Win",
        description: "Generated 1M+ content views and 500 leads",
        image_url:
          "https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg",
        category: "Content Marketing",
        client: "Wellness Company",
        challenge:
          "The client’s content lacked engagement and wasn’t ranking well on search engines.",
        strategy:
          "We developed a targeted content calendar, optimized articles for SEO, and promoted them through social media collaborations.",
        results:
          "Content reached over 1M+ views, drove 500 qualified leads, and boosted organic search traffic by 60%.",
      },
    ];

    for (const portfolio of portfolioData) {
      const exists = await PortfolioItem.findOne({ title: portfolio.title });
      if (!exists) {
        await PortfolioItem.create(portfolio);
        console.log(`✅ Portfolio item added: ${portfolio.title}`);
      }
    }
  } catch (error) {
    console.error("❌ Error initializing data:", error);
  }
};

// Middleware
app.use(cors());
app.use(express.json());

// Auth middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) {
    return res.sendStatus(401);
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// Admin middleware
const requireAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ error: "Admin access required" });
  }
  next();
};

// Routes

// User registration
app.post("/api/auth/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = new User({ name, email, password: hashedPassword });
    await user.save();

    // Generate token
    const token = jwt.sign(
      { userId: user._id, email, role: user.role },
      JWT_SECRET
    );

    res
      .status(201)
      .json({ token, user: { id: user._id, name, email, role: user.role } });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// User login
app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    // Check password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    // Generate token
    const token = jwt.sign(
      { userId: user._id, email, role: user.role },
      JWT_SECRET
    );

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// Get portfolio items
app.get("/api/portfolio", async (req, res) => {
  try {
    const result = await PortfolioItem.find().sort({ created_at: -1 });
    res.json(result);
  } catch (error) {
    console.error("Portfolio fetch error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// Add portfolio item (admin only)
app.post(
  "/api/portfolio",
  authenticateToken,
  requireAdmin,
  async (req, res) => {
    try {
      const { title, description, image_url, category, client } = req.body;

      const portfolioItem = new PortfolioItem({
        title,
        description,
        image_url,
        category,
        client,
      });

      await portfolioItem.save();
      res.status(201).json(portfolioItem);
    } catch (error) {
      console.error("Portfolio creation error:", error);
      res.status(500).json({ error: "Server error" });
    }
  }
);

// Delete portfolio item (admin only)
app.delete(
  "/api/portfolio/:id",
  authenticateToken,
  requireAdmin,
  async (req, res) => {
    try {
      await PortfolioItem.findByIdAndDelete(req.params.id);
      res.json({ message: "Portfolio item deleted" });
    } catch (error) {
      console.error("Portfolio deletion error:", error);
      res.status(500).json({ error: "Server error" });
    }
  }
);
//protfolio details
// Get single portfolio item (view details)
app.get("/api/portfolio/:id", async (req, res) => {
  try {
    const item = await PortfolioItem.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ error: "Portfolio item not found" });
    }
    res.json(item);
  } catch (error) {
    console.error("Portfolio details fetch error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// Get services
app.get("/api/services", async (req, res) => {
  try {
    const result = await Service.find().sort({ created_at: -1 });
    res.json(result);
  } catch (error) {
    console.error("Services fetch error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// Add service (admin only)
app.post("/api/services", authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { name, description, fields } = req.body;

    const service = new Service({
      name,
      description,
      fields: fields || [
        {
          name: "budget",
          label: "Monthly Budget ($)",
          type: "number",
          required: true,
        },
        {
          name: "timeline",
          label: "Project Timeline",
          type: "select",
          options: ["1 month", "3 months", "6 months", "12 months"],
          required: true,
        },
        {
          name: "goals",
          label: "Primary Goals",
          type: "textarea",
          required: true,
        },
      ],
      created_by: req.user.userId,
    });

    await service.save();
    res.status(201).json(service);
  } catch (error) {
    console.error("Service creation error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// Delete service (admin only)
app.delete(
  "/api/services/:id",
  authenticateToken,
  requireAdmin,
  async (req, res) => {
    try {
      await Service.findByIdAndDelete(req.params.id);
      res.json({ message: "Service deleted" });
    } catch (error) {
      console.error("Service deletion error:", error);
      res.status(500).json({ error: "Server error" });
    }
  }
);

// Get service requests (user vs admin)
app.get("/api/my-requests", authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;

    // Check if user is admin
    const user = await User.findById(userId);

    let result;
    if (user.email === "admin@gmail.com") {
      // Admin sees all requests
      result = await ServiceRequest.find({})
        .populate("service_id", "name")
        .populate("user_id", "name email")
        .sort({ created_at: -1 });
    } else {
      // Normal user sees only their requests
      result = await ServiceRequest.find({ user_id: userId })
        .populate("service_id", "name")
        .sort({ created_at: -1 });
    }

    res.json(result);
  } catch (error) {
    console.error("Requests fetch error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

app.post("/api/service-requests", authenticateToken, async (req, res) => {
  try {
    const { serviceId, formData } = req.body;
    const userId = req.user.userId;

    const serviceRequest = new ServiceRequest({
      user_id: userId,
      service_id: serviceId,
      form_data: formData,
    });

    await serviceRequest.save();

    // Get user and service details for email
    const user = await User.findById(userId);
    const service = await Service.findById(serviceId);

    // Send email notification to admin
    const mailOptions = {
      from: `"Digital Marketing Management" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: `New Service Request: ${service.name}`,
      html: `
        <h2>New Service Request Received</h2>
        <p><strong>Service:</strong> ${service.name}</p>
        <p><strong>Client:</strong> ${user.name} (${user.email})</p>
        <p><strong>Request Details:</strong></p>
        <ul>
          ${Object.entries(formData)
            .map(
              ([key, value]) =>
                `<li><strong>${key.replace("_", " ")}:</strong> ${value}</li>`
            )
            .join("")}
        </ul>
        <p><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
      `,
    };

    try {
      await transporter.sendMail(mailOptions);
      console.log("Email notification sent to admin");
    } catch (emailError) {
      console.error("Email sending error:", emailError);
    }

    res.status(201).json({
      id: serviceRequest._id,
      message: "Service request submitted successfully",
    });
  } catch (error) {
    console.error("Service request error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

const getMailContent = (serviceName, clientName) => {
  switch (serviceName) {
    case "SEO Optimization":
      return {
        subject: "SEO Optimization Completed",
        text: `Hi ${clientName},\n\nYour SEO Optimization request has been successfully completed. Please find the attached quotation for SEO services.\n\nRegards,\nDigital Agency`,
      };
    case "Social Media Marketing":
      return {
        subject: "Social Media Marketing Completed",
        text: `Hi ${clientName},\n\nWe’ve completed your Social Media Marketing request. Please check the quotation for social media campaigns.\n\nRegards,\nDigital Agency`,
      };
    case "Paid Advertising":
      return {
        subject: "Paid Advertising Completed",
        text: `Hi ${clientName},\n\nYour Paid Advertising campaign has been marked complete. Attached is your quotation.\n\nRegards,\nDigital Agency`,
      };
    case "Content Marketing":
      return {
        subject: "Content Marketing Completed",
        text: `Hi ${clientName},\n\nYour Content Marketing request is complete. Please find the quotation attached.\n\nRegards,\nDigital Agency`,
      };
    default:
      return {
        subject: "Service Completed",
        text: `Hi ${clientName},\n\nYour requested service has been completed.\n\nRegards,\nDigital Agency`,
      };
  }
};

// Update request status (Admin only)
app.put("/api/requests/:id/status", authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const user = await User.findById(req.user.userId);
    if (user.email !== "admin@gmail.com") {
      return res.status(403).json({ error: "Only admin can update status" });
    }

    const updatedRequest = await ServiceRequest.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    )
      .populate("service_id", "name")
      .populate("user_id", "name email");

    if (!updatedRequest) {
      return res.status(404).json({ error: "Request not found" });
    }

    // ✅ Send mail only if status = completed
    if (status === "completed") {
      const serviceName = updatedRequest.service_id?.name || "Service";
      const clientEmail = updatedRequest.user_id?.email;
      const clientName = updatedRequest.user_id?.name;

      const { subject, text } = getMailContent(serviceName, clientName);

      await transporter.sendMail({
        from: `"Digital Agency" <${process.env.EMAIL_USER}>`,
        to: clientEmail,
        subject,
        text,
        // attachments: [{ filename: "quotation.pdf", path: "./quotations/seo.pdf" }]
      });
    }

    res.json({
      message: "Status updated successfully",
      request: updatedRequest,
    });
  } catch (error) {
    console.error("Status update error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// Get all service requests (Admin only)
app.get("/api/admin/requests", authenticateToken, async (req, res) => {
  try {
    if (req.user.email !== "admin@gmail.com") {
      return res.status(403).json({ error: "Access denied. Admins only." });
    }

    const result = await ServiceRequest.find()
      .populate("user_id", "name email")
      .populate("service_id", "name")
      .sort({ created_at: -1 });

    res.json(result);
  } catch (error) {
    console.error("Admin requests fetch error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// Update service request status (Admin only)
app.put(
  "/api/admin/requests/:id/status",
  authenticateToken,
  async (req, res) => {
    try {
      if (req.user.email !== "admin@gmail.com") {
        return res.status(403).json({ error: "Access denied. Admins only." });
      }

      const { id } = req.params;
      const { status } = req.body;

      const request = await ServiceRequest.findByIdAndUpdate(
        id,
        { status },
        { new: true }
      )
        .populate("user_id", "name email")
        .populate("service_id", "name");

      if (!request) {
        return res.status(404).json({ error: "Request not found" });
      }

      res.json({ message: "Status updated", request });
    } catch (error) {
      console.error("Update status error:", error);
      res.status(500).json({ error: "Server error" });
    }
  }
);

// Get all service requests (admin only)
app.get(
  "/api/admin/service-requests",
  authenticateToken,
  requireAdmin,
  async (req, res) => {
    try {
      const result = await ServiceRequest.find()
        .populate("user_id", "name email")
        .populate("service_id", "name")
        .sort({ created_at: -1 });

      res.json(result);
    } catch (error) {
      console.error("Admin requests fetch error:", error);
      res.status(500).json({ error: "Server error" });
    }
  }
);

// Submit contact form
app.post("/api/contact", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    const contactMessage = new ContactMessage({ name, email, message });
    await contactMessage.save();

    // Send email notification to admin
    const mailOptions = {
      from: `"Digital Marketing Management" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: `New Contact Message from ${name}`,
      html: `
        <h2>New Contact Message</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
        <p><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
      `,
    };

    try {
      await transporter.sendMail(mailOptions);
      console.log("Contact email notification sent to admin");
    } catch (emailError) {
      console.error("Email sending error:", emailError);
    }

    res
      .status(201)
      .json({ id: contactMessage._id, message: "Message sent successfully" });
  } catch (error) {
    console.error("Contact form error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to API",
    version: "1.0.0",
    documentation: "/api/docs",
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
