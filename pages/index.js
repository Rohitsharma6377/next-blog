import React from 'react'
import News from '../components/News';
import BannerSlider from '../components/Banner';
import BlogSlider from '@/components/BlogSlider';
import Head from 'next/head';
import { fetchDataFromDB } from '@/utils/helper';


const blogs = [
  {
    url: "",
    media_path: "blog/blog.avif",
    media_alt: "Blog Post 1",
    title: "Understanding React Hooks",
    description: "A deep dive into React Hooks and how they can simplify your code.",
  },
  {
    url: "",
    media_path: "blog/blog.avif",
    media_alt: "Blog Post 2",
    title: "CSS Grid vs Flexbox",
    description: "Comparing CSS Grid and Flexbox for layout design.",
  },
  {
    url: "",
    media_path: "blog/blog.avif",
    media_alt: "Blog Post 3",
    title: "JavaScript ES6 Features",
    description: "Exploring the new features introduced in ES6.",
  },
  {
    url: "",
    media_path: "blog/blog.avif",
    media_alt: "Blog Post 4",
    title: "Building Responsive Websites",
    description: "Techniques for making websites responsive across devices.",
  },
  {
    url: "",
    media_path: "blog/blog.avif",
    media_alt: "Blog Post 5",
    title: "Next.js: The Future of React",
    description: "An overview of Next.js and its benefits for React developers.",
  },
  {
    url: "",
    media_path: "blog/blog.avif",
    media_alt: "Blog Post 1",
    title: "Understanding React Hooks",
    description: "A deep dive into React Hooks and how they can simplify your code.",
  },
  {
    url: "",
    media_path: "blog/blog.avif",
    media_alt: "Blog Post 2",
    title: "CSS Grid vs Flexbox",
    description: "Comparing CSS Grid and Flexbox for layout design.",
  },
  {
    url: "",
    media_path: "blog/blog.avif",
    media_alt: "Blog Post 3",
    title: "JavaScript ES6 Features",
    description: "Exploring the new features introduced in ES6.",
  },
  {
    url: "",
    media_path: "blog/blog.avif",
    media_alt: "Blog Post 4",
    title: "Building Responsive Websites",
    description: "Techniques for making websites responsive across devices.",
  },
  {
    url: "",
    media_path: "blog/blog.avif",
    media_alt: "Blog Post 5",
    title: "Next.js: The Future of React",
    description: "An overview of Next.js and its benefits for React developers.",
  },
];


export default function HomePage({ blogs}) {
  return (
    <>
      <BannerSlider />
      <News/>
      <BlogSlider data={blogs}/>
    </>
  )
}


export async function getServerSideProps(context) {
  const { req } = await context;
  const pageUrl = `${req.url}`;
  
  let page, blogs;
  try {
    page = await fetchDataFromDB({url: `/api/user/page?url=${pageUrl}`});
    blogs = await fetchDataFromDB({url: `/api/user/blog`});
  }
  catch (err) {
    console.error("Error fetching data:", err);
  }
  
  return { props: { page: page || [], blogs: blogs || [] } };
}