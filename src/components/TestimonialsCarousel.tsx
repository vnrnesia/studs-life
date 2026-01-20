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

interface TestimonialsCarouselProps {
  title?: React.ReactNode;
  videoCategory?: string;
}

export default function TestimonialsCarousel({ title, videoCategory = "Video Testimonial" }: TestimonialsCarouselProps) {
  // Apply category from props (i18n)
  const localizedTestimonials = rawTestimonials.map(item => ({
    ...item,
    category: videoCategory
  }));

  const cards = localizedTestimonials.map((card, index) => (
    <VideoCard key={card.src} card={{ ...card, content: <DummyContent content={card.content} studentName={card.studentName} university={card.university} /> }} index={index} />
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
    category: "Video Testimonial",
    title: "Салим Х, 21 год",
    src: "https://img.youtube.com/vi/7eu1KOD8D_s/maxresdefault.jpg",
    videoUrl: "https://youtube.com/shorts/7eu1KOD8D_s",
    studentName: "Салим Х",
    university: "Student's Life",
    content: "Отзыв студента о поступлении и обучении через Student's Life.",
  },
  {
    category: "Video Testimonial",
    title: "Максат С, 28 лет",
    src: "https://img.youtube.com/vi/cAgj7GdKx8s/maxresdefault.jpg",
    videoUrl: "https://youtube.com/shorts/cAgj7GdKx8s",
    studentName: "Максат С",
    university: "Student's Life",
    content: "Студент делится своим опытом обучения с помощью Student's Life.",
  },
  {
    category: "Video Testimonial",
    title: "Александр Ц, 22 года",
    src: "https://img.youtube.com/vi/7eu1KOD8D_s/maxresdefault.jpg",
    videoUrl: "https://youtube.com/shorts/7eu1KOD8D_s",
    studentName: "Александр Ц",
    university: "Student's Life",
    content: "История успешного поступления через агентство Student's Life.",
  },
];
