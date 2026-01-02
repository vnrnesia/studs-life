"use client";

import React from "react";
import { Carousel } from "@/components/ui/apple-cards-carousel";
import { VideoCard } from "./VideoCard";
import JsonLd from "@/components/JsonLd";
import { Review, WithContext } from "schema-dts";

interface Testimonial {
  category: string;
  title: string;
  src: string;
  content: string;
  studentName: string;
  university: string;
}

export default function TestimonialsCarousel({ title }: { title?: React.ReactNode }) {
  const cards = data.map((card, index) => (
    <VideoCard key={card.src} card={card} index={index} />
  ));

  const reviewSchema: WithContext<Review>[] = rawTestimonials.map((item) => ({
    "@context": "https://schema.org",
    "@type": "Review",
    author: {
      "@type": "Person",
      name: item.studentName,
    },
    reviewBody: item.content, 
    reviewRating: {
      "@type": "Rating",
      ratingValue: "5",
      bestRating: "5",
    },
    itemReviewed: {
      "@type": "Organization",
      name: "Student's Life",
      image: item.src,
    },
  }));

  return (
    <div className="w-full h-full">
      {reviewSchema.map((schema, idx) => (
        <JsonLd<Review> key={idx} data={schema} />
      ))}
      <Carousel items={cards} title={title} />
    </div>
  );
}

const DummyContent = ({ content, studentName, university }: { content: string; studentName: string; university: string }) => {
  return (
    <div className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4">
      <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
        <span className="font-bold text-neutral-700 dark:text-neutral-200">
          {studentName} ({university})
        </span>{" "}
        <br /><br />
        {content}
      </p>
    </div>
  );
};

// Define raw data with string content first
const rawTestimonials = [
  {
    category: "Studying in Prague",
    title: "Studs Life helped me get into my dream university.",
    src: "https://images.unsplash.com/photo-1523240715630-975bb4799fd3?q=80&w=2070&auto=format&fit=crop",
    videoUrl: "https://www.youtube.com/shorts/ezst-qhEB6E",
    studentName: "Alexander B.",
    university: "Charles University",
    content: "The process was so smooth! From the initial consultation to getting my visa, the team was incredibly supportive. I never felt lost or stressed because they handled everything. Now I'm enjoying my student life in Prague thanks to Studs Life.",
  },
  {
    category: "Studying in Moscow",
    title: "The best decision for my academic career.",
    src: "https://images.unsplash.com/photo-1541339907198-e08756ebafe3?q=80&w=2070&auto=format&fit=crop",
    videoUrl: "https://www.youtube.com/shorts/ezst-qhEB6E",
    studentName: "Mariya S.",
    university: "HSE University",
    content: "I wanted to study Economics at HSE but didn't know where to start. Studs Life provided me with a clear roadmap and assisted with all the documentation. Their expertise made a huge difference. I highly recommend them to anyone looking to study in Russia.",
  },
  {
    category: "Studying in Istanbul",
    title: "Seamless transition and amazing support.",
    src: "https://images.unsplash.com/photo-1527891751199-7225231a68dd?q=80&w=2070&auto=format&fit=crop",
    videoUrl: "https://www.youtube.com/shorts/ezst-qhEB6E",
    studentName: "Dmitry K.",
    university: "Istanbul University",
    content: "Turkish education is top-notch, and Studs Life made sure I got the best. They helped me find a great dormitory and even picked me up from the airport. The adaptation process was much easier with their guidance.",
  },
  {
    category: "Studying in Warsaw",
    title: "Professional and reliable education partners.",
    src: "https://images.unsplash.com/photo-1492533268752-9457b01d4323?q=80&w=2070&auto=format&fit=crop",
    videoUrl: "https://www.youtube.com/shorts/ezst-qhEB6E",
    studentName: "Elena V.",
    university: "University of Warsaw",
    content: "I was worried about the language barrier and visa requirements for Poland, but the Studs Life team had all the answers. They are true professionals who care about your success. I'm now halfway through my Master's degree!",
  },
  {
    category: "Studying in Kazan",
    title: "High quality education at an affordable price.",
    src: "https://images.unsplash.com/photo-1517486808906-6ca8b3f0484c?q=80&w=2070&auto=format&fit=crop",
    videoUrl: "https://www.youtube.com/shorts/ezst-qhEB6E",
    studentName: "Ruslan M.",
    university: "Kazan Federal University",
    content: "Kazan is a beautiful city for students. Studs Life helped me secure a scholarship which covered a significant part of my tuition. Their connections with universities are impressive and genuinely benefit the students.",
  },
];

// Map raw data for the carousel component (inserting React components)
const data = rawTestimonials.map((item) => ({
  ...item,
  content: <DummyContent content={item.content} studentName={item.studentName} university={item.university} />,
}));
