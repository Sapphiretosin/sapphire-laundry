import React from "react";

// Import tip images
import tip1 from "../assets/tip1.jpg";
import tip2 from "../assets/tip2.jpg";
import tip3 from "../assets/tip3.jpg";
import tip4 from "../assets/tip4.jpg";
import tip5 from "../assets/tip5.jpg";
import tip6 from "../assets/tip6.jpg";
import tip7 from "../assets/tip7.jpg";
import tip8 from "../assets/tip8.jpg";
import tip9 from "../assets/tip9.jpg";
import tip10 from "../assets/tip10.jpg";
import tip11 from "../assets/tip11.jpg";
import tip12 from "../assets/tip12.jpg";
import tip13 from "../assets/tip13.jpg";
import tip14 from "../assets/tip14.jpg";
import tip15 from "../assets/tip15.jpg";
import tip16 from "../assets/tip16.jpg";
import tip17 from "../assets/tip17.jpg";
import tip18 from "../assets/tip18.jpg";

const tips = [
  { title: "Always Sort Before Washing", description: "Sorted colors and whites. Sorting laundry by material or color helps preserve your clothes.", image: tip1 },
  { title: "How (and When) to Wash Your Sheets", description: "Plan to wash your sheets at least once a week. Use hot cycle for whites or stains, warm/cold for darks.", image: tip2 },
  { title: "Prep Clothes Before Placing in the Washer", description: "Remove pins, zippers, close snaps, turn clothes inside out. Place delicate items in mesh bags.", image: tip3 },
  { title: "How (and When) to Wash Down Pillows and Comforters", description: "Wash pillows every 3-6 months. Comforters up to twice a year. Dry on low heat with a tennis ball.", image: tip4 },
  { title: "Try DIY Fabric Softener", description: "Use vinegar or conditioner as DIY fabric softener to prevent residue and allergies.", image: tip5 },
  { title: "Blue Your Laundry to Brighten Whites", description: "Bluing can subtly brighten whites. Effective on antique linens and lace.", image: tip6 },
  { title: "Remove Stains Like an Expert", description: "Treat stains before washing. Blot liquids from outside in. Make sure stain is gone before drying.", image: tip7 },
  { title: "Increase Your Laundry Detergent's Efficacy With Borax", description: "Add 1/2 cup of borax to boost cleaning power naturally.", image: tip8 },
  { title: "Brighten Whites Without Bleach", description: "Wash whites separately. Use lemon, vinegar, or borax for extra brightening. Sunlight helps too.", image: tip9 },
  { title: "Clean Baby Clothes With Mild Soap", description: "Use gentle detergents. Avoid harsh chemicals. Pre-soak stains in cool water.", image: tip10 },
  { title: "Keep Up With Napkin Laundering", description: "Soak and rinse napkins properly. Dry and iron for best results.", image: tip11 },
  { title: "Hand Wash Delicate Fabrics", description: "Use lukewarm water and mild detergent. Gently reshape and dry flat.", image: tip12 },
  { title: "Know When to Dry Clean", description: "Delicate or embellished fabrics may require professional dry cleaning.", image: tip13 },
  { title: "Choose the Right Wash Cycle", description: "Use regular for sturdy clothes, delicate for lace and knitwear, hot for whites, cold for colors.", image: tip14 },
  { title: "Choose the Right Dryer Settings", description: "Use air fluff or automatic dry. Permanent press reduces wrinkles. Avoid over-drying.", image: tip15 },
  { title: "Wash Bath Towels Regularly", description: "Launder every 3-4 days. Use hot water and non-chlorine bleach for whites. Avoid fabric softener buildup.", image: tip16 },
  { title: "Maintain Your Washer and Dryer", description: "Clean washer and dryer regularly. Disinfect, remove lint, check exhaust ducts.", image: tip17 },
  { title: "Keep Clothing Clean Between Washes", description: "Apply toiletries before dressing. Address stains immediately. Hang clothes to release wrinkles.", image: tip18 },
];

const categories = ["Alterations & Repairs", "Carpet Cleaning", "Dry Cleaning Services", "Laundry Services", "Shoes Cleaning", "Steam Iron", "Uncategorized"];
const tags = ["Dry Cleaning", "Laundry Services", "Steam Ironing", "Sapphire Laundry"];

const BlogPost = () => {
  return (
    <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12 md:pt-32">
      <div className="grid md:grid-cols-3 gap-8">

        {/* Blog Content */}
        <div className="md:col-span-2 space-y-12">
          <h1 className="text-4xl font-bold text-gray-900">
            18 of Our Best Laundry Tips to Keep Your Clothes and Linens Looking Good as New
          </h1>
          <p className="text-gray-600">
            Care for your home's fabrics with this comprehensive guide to good washing and drying habits.
          </p>

          {tips.map((tip, idx) => (
            <div key={idx} className="space-y-4">
              <h2 className="text-2xl font-semibold text-blue-600">
                {idx + 1}. {tip.title}
              </h2>
              <img src={tip.image} alt={tip.title} className="w-full rounded-lg object-cover" />
              <p className="text-gray-700">{tip.description}</p>
            </div>
          ))}

          {/* Leave a Comment */}
          <div className="mt-16 space-y-4">
            <h3 className="text-2xl font-semibold">Leave a Comment</h3>
            <p className="text-gray-600">You must be logged in to post a comment.</p>
            <textarea
              placeholder="Write your comment..."
              className="w-full border border-gray-300 p-3 rounded mb-2 resize-none"
              rows={4}
              disabled
            />
            <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition">
              Post Comment
            </button>
          </div>
        </div>

        {/* Sidebar */}
        <div className="md:col-span-1 space-y-8">

          {/* Newsletter Signup */}
          <div className="bg-gray-50 p-6 rounded-lg shadow space-y-3">
            <h3 className="text-xl font-semibold">Newsletter Subscribe</h3>
            <p className="text-gray-600">Sign up and receive our special offers.</p>
            <input
              type="email"
              placeholder="Your e-mail address"
              className="w-full border border-gray-300 p-3 rounded"
            />
            <button className="w-full bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition">
              Subscribe
            </button>
          </div>

          {/* Categories */}
          <div className="bg-gray-50 p-6 rounded-lg shadow space-y-3">
            <h3 className="text-xl font-semibold">Categories</h3>
            <ul className="space-y-2">
              {categories.map((cat, idx) => (
                <li key={idx} className="text-gray-800 hover:text-blue-600 cursor-pointer">
                  {cat}
                </li>
              ))}
            </ul>
          </div>

          {/* Tags */}
          <div className="bg-gray-50 p-6 rounded-lg shadow space-y-3">
            <h3 className="text-xl font-semibold">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag, idx) => (
                <span key={idx} className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm cursor-pointer hover:bg-blue-200">
                  {tag}
                </span>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default BlogPost;
