import mongoose from "mongoose";
import Product from "../models/product.model.js";
import { DB_URI } from "../config/env.js";

const sampleProducts = [
  {
    name: "Vans Old Skool Classic",
    brand: "Vans",
    description:
      "The iconic Old Skool, Vans' classic skate shoe and the first to bare the famous Sidestripe. Built with a durable suede and canvas upper, padded collar, and vulcanized rubber sole.",
    price: 65,
    category: "Classics",
    sizes: [7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12],
    colors: ["Black/White", "Navy", "Red"],
    images: [
      "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=800",
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800",
    ],
    stock: 50,
    featured: true,
    rating: 4.8,
    numReviews: 1250,
  },
  {
    name: "Vans Authentic",
    brand: "Vans",
    description:
      "The Vans Authentic was the first shoe designed by the Van Doren Rubber Company. Originally called #44 Deck Shoes, it's now an icon of simple, classic style.",
    price: 50,
    category: "Classics",
    sizes: [7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12],
    colors: ["True White", "Black", "Navy"],
    images: [
      "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=800",
      "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=800",
    ],
    stock: 75,
    featured: true,
    rating: 4.7,
    numReviews: 980,
  },
  {
    name: "Vans Sk8-Hi",
    brand: "Vans",
    description:
      "An iconic silhouette, the Vans Sk8-Hi features sturdy canvas and suede uppers, a padded collar for ankle support, and signature rubber waffle outsoles.",
    price: 70,
    category: "High-Tops",
    sizes: [7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12],
    colors: ["Black/White", "True White", "Dress Blues"],
    images: [
      "https://images.unsplash.com/photo-1543508282-6319a3e2621f?w=800",
      "https://images.unsplash.com/photo-1605348532760-6753d2c43329?w=800",
    ],
    stock: 60,
    featured: true,
    rating: 4.9,
    numReviews: 1540,
  },
  {
    name: "Vans Slip-On Pro",
    brand: "Vans",
    description:
      "A Vans classic upgraded with enhanced cushioning and support. Features Duracap reinforcement, UltraCush HD sockliners, and premium suede and canvas uppers.",
    price: 60,
    category: "Slip-Ons",
    sizes: [7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12],
    colors: ["Checkerboard", "Black/White", "All Black"],
    images: [
      "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=800",
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800",
    ],
    stock: 45,
    featured: false,
    rating: 4.6,
    numReviews: 720,
  },
  {
    name: "Vans Era",
    brand: "Vans",
    description:
      "Originally called Vans #95, the Era debuted in 1976 as the first skate shoe to include a padded collar for extra comfort. A true skateboarding classic.",
    price: 55,
    category: "Classics",
    sizes: [7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12],
    colors: ["True White", "Navy", "Black"],
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800",
      "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=800",
    ],
    stock: 55,
    featured: false,
    rating: 4.5,
    numReviews: 650,
  },
  {
    name: "Vans Old Skool Platform",
    brand: "Vans",
    description:
      "The iconic Old Skool gets a bold platform upgrade. Features a 34mm sidewall height for an elevated look while maintaining the classic skate style.",
    price: 75,
    category: "Sneakers",
    sizes: [6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11],
    colors: ["Black/White", "True White", "Leopard"],
    images: [
      "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=800",
      "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800",
    ],
    stock: 40,
    featured: true,
    rating: 4.7,
    numReviews: 890,
  },
  {
    name: "Vans Half Cab",
    brand: "Vans",
    description:
      "Born from Steve Caballero's innovation, the Half Cab is a low-top version of the Sk8-Hi. A legendary skate shoe with superior board feel and style.",
    price: 80,
    category: "Sneakers",
    sizes: [7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12],
    colors: ["Black/Black", "Navy/Gum", "Drizzle"],
    images: [
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800",
      "https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=800",
    ],
    stock: 35,
    featured: false,
    rating: 4.8,
    numReviews: 560,
  },
  {
    name: "Vans UltraRange EXO",
    brand: "Vans",
    description:
      "Built for adventure with UltraCush midsole for comfort, EXO Skeleton for support, and reverse waffle lug outsole for traction on any terrain.",
    price: 85,
    category: "Sneakers",
    sizes: [7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12],
    colors: ["Black/White", "Pewter/True White", "Dress Blues"],
    images: [
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800",
      "https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=800",
    ],
    stock: 30,
    featured: false,
    rating: 4.6,
    numReviews: 420,
  },
  {
    name: "Vans Checkerboard Classic Slip-On",
    brand: "Vans",
    description:
      "The legendary checkerboard pattern on the iconic Slip-On. A timeless design that's been a part of skate and street culture for decades.",
    price: 55,
    category: "Slip-Ons",
    sizes: [6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12],
    colors: ["Black/Off White Checkerboard", "Primary Check"],
    images: [
      "https://images.unsplash.com/photo-1533867617858-e7b97e060509?w=800",
      "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=800",
    ],
    stock: 80,
    featured: true,
    rating: 4.9,
    numReviews: 2100,
  },
  {
    name: "Vans Style 36 Decon SF",
    brand: "Vans",
    description:
      "A deconstructed take on the classic Style 36 with premium materials, enhanced cushioning, and a surf-inspired aesthetic. Perfect for everyday wear.",
    price: 68,
    category: "Limited Edition",
    sizes: [7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12],
    colors: ["Salt Wash Black", "Marshmallow", "Navy"],
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800",
      "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=800",
    ],
    stock: 25,
    featured: true,
    rating: 4.9,
    numReviews: 310,
  },
];

const seedProducts = async () => {
  try {
    await mongoose.connect(DB_URI);
    console.log("✅ Connected to database");

    // Drop the entire collection (including indexes)
    await mongoose.connection.db.dropCollection("products").catch(() => {
      console.log("⚠️  Collection doesn't exist yet");
    });
    console.log("🗑️  Dropped products collection");

    // Insert sample products
    await Product.insertMany(sampleProducts);
    console.log("✅ Sample products inserted successfully");
    console.log(`📦 Total products: ${sampleProducts.length}`);

    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding products:", error);
    process.exit(1);
  }
};

seedProducts();
