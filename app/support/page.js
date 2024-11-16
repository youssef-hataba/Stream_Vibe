"use client";
import Image from 'next/image';
import PhoneInput from 'react-phone-input-2';
import { useState } from 'react';

export default function SupportPage() {
  const faqs = [
    { id: 1, question: "What is StreamVibe?", answer: "StreamVibe is a streaming service that allows you to watch movies and shows on demand." },
    { id: 2, question: "How much does StreamVibe cost?", answer: "The cost varies based on your subscription plan. Please check our pricing page for details." },
    { id: 3, question: "What content is available on StreamVibe?", answer: "StreamVibe offers a wide range of movies, TV shows, documentaries, and more." },
    { id: 4, question: "How can I watch StreamVibe?", answer: "You can watch StreamVibe on various devices including smartphones, tablets, and smart TVs." },
    { id: 5, question: "How do I sign up for StreamVibe?", answer: "Visit our sign-up page to create an account and start streaming today." },
    { id: 6, question: "What is the StreamVibe free trial?", answer: "StreamVibe offers a 7-day free trial for new users." },
    { id: 7, question: "How do I contact StreamVibe customer support?", answer: "You can reach customer support via email or our help center." },
    { id: 8, question: "What are the StreamVibe payment methods?", answer: "StreamVibe accepts credit cards, debit cards, and some digital payment options." },
  ];
  
  const [activeIndex, setActiveIndex] = useState(null);
  const toggleFaq = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 w-1200 h-580 mt-300 gap-8 p-8">
      {/*  Left Side */}
      <div className="flex flex-col items-start gap-10">
        <h1 className="text-4xl md:text-6xl font-bold text-white">Welcome to our support page!</h1>
        <p className="font-light text-lg md:text-2xl text-gray-300 leading-7">We&apos;re here to help you with any problems you may be having with our product.</p>
          <Image
              width={429}
              height={380}
              src="/photoContainer.jpg"
              alt="photo1"
              className="border border-6 rounded-lg border-black-15"
            />
      </div>

      {/* Right Side  */}
      <div className="bg-black-6 border border-black-15 rounded-lg shadow-lg space-y-4 p-8 w-full max-w-800">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300">First Name</label>
            <input type="text" placeholder="Enter First Name" className="w-full mt-1 p-2 rounded-md bg-black-8 text-gray-300" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300">Last Name</label>
            <input type="text" placeholder="Enter Last Name" className="w-full mt-1 p-2 rounded-md bg-black-8 text-gray-300" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300">Email</label>
            <input type="text" placeholder="Enter Your Email" className="w-full mt-1 p-2 rounded-md bg-black-8 text-gray-300" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300">Phone Number</label>
          <PhoneInput
            country={'eg'} 
            inputClass="w-full mt-1 p-2 rounded-md bg-black-8 text-gray-300"
            containerClass="phone-input-container"
            />
          </div>

        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300">Message</label>
          <textarea placeholder="Enter your Message" className="w-full mt-1 p-2 rounded-md bg-black-8 text-gray-300 h-24"></textarea>
        </div>
        <div className="flex w-720 h-49 items-center">
          <input type="checkbox" className="w-512 h-24 text-primary border bg-black-8 rounded " />
          <label className="ml-2 text-sm text-gray-300">I agree with Terms of Use and Privacy Policy</label>
          <button className="w-138 h-49 p-2 ml-10 mt-4 bg-red-600 text-white rounded-md hover:bg-red-700">Send Message</button>
        </div>
      </div>
       {/* FAQ Section */}
      <div className="col-span-1 md:col-span-2 mt-12">
        <h2 className="text-3xl font-bold text-white mb-4">Frequently Asked Questions</h2>
        <div className="flex w-full gap-8 mb-6">
          <p className="text-gray-400 mb-6">
            Got questions? We&apos;ve got answers! Check out our FAQ section to find answers to the most common questions about StreamVibe.
          </p>
          <button className="mt-0 py-2 px-4 bg-red-600 text-white font-semibold rounded">Ask a Question</button>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {faqs.map((faq, index) => (
            <div key={faq.id} className="border border-gray-700 rounded">
              <button
                className="w-full grid justify-between items-center p-4 text-left focus:outline-none"
                onClick={() => toggleFaq(index)}>
                <span className="text-lg text-white">{faq.question}</span>
                <span className="text-xl text-white">{activeIndex === index ? '−' : '+'}</span>
              </button>
              {activeIndex === index && (
                <div className="p-4 border-t border-gray-700">
                  <p className="text-gray-400">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
