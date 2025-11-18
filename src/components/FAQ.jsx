import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const FAQSection = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: "How do I schedule a laundry pickup?",
      answer:
        "You can schedule your pickup directly on our website or through our customer service line. Just select a time that fits your schedule, and our team will handle the rest.",
    },
    {
      question: "What areas do you service?",
      answer:
        "We currently serve multiple residential and commercial locations across the city. Contact us to confirm availability in your area.",
    },
    {
      question: "Are my clothes safe?",
      answer:
        "Absolutely! Our team follows strict quality control and safety measures to ensure your clothes are handled with care and returned spotless.",
    },
    {
      question: "Do you offer same-day delivery?",
      answer:
        "Yes, we offer express and same-day delivery options depending on your location and pickup time.",
    },
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 px-6 md:px-16 bg-white text-gray-800">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-blue-700 mb-10">
          Questions / Answers
        </h2>
        <p className="text-gray-600 mb-10">
          Find quick answers to the most common questions about our laundry services.
        </p>
      </div>

      <div className="max-w-3xl mx-auto space-y-6">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-xl shadow-sm p-6 hover:shadow-md transition"
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="flex justify-between items-center w-full text-left"
            >
              <span className="text-lg font-semibold text-gray-700">
                {faq.question}
              </span>
              {activeIndex === index ? (
                <FaChevronUp className="text-blue-600" />
              ) : (
                <FaChevronDown className="text-blue-600" />
              )}
            </button>

            {activeIndex === index && (
              <p className="mt-4 text-gray-600 leading-relaxed">
                {faq.answer}
              </p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQSection;
