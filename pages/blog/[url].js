import Image from "next/image";
import { useRouter } from "next/router";
import { baseUrl, fetchDataFromDB } from "@/utils/helper";
import { useEffect, useState } from "react";
import { EmailIcon, EmailShareButton, FacebookIcon, FacebookShareButton, TwitterIcon, TwitterShareButton, WhatsappIcon, WhatsappShareButton } from "react-share";
import BlogPostWithTOC from "@/components/BlogTableOfContent";
import LeadForm from "@/components/LeadForm";


export default function BlogPage({ blog }) {
  const [readingTime, setReadingTime] = useState("");
  const router = useRouter();
  const shareUrl = `${baseUrl}${router.asPath}`;

  useEffect(() => {
    const wordsPerMinute = 200;
    const words = document.body.innerText.split(/\s+/).filter(Boolean).length;
    const minutes = Math.floor(words / wordsPerMinute);
    const seconds = Math.round((words % wordsPerMinute) * 60 / wordsPerMinute);
    setReadingTime(`${minutes} min`);
  }, []);

  useEffect(() => {
    const progressBar = document.getElementById("scroll-progress");

    const updateProgressBar = () => {
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollPercent = (scrollTop / (documentHeight - window.innerHeight)) * 100;
      progressBar.style.width = scrollPercent + "%";
    };

    window.addEventListener("scroll", updateProgressBar);
    updateProgressBar();

    return () => {
      window.removeEventListener("scroll", updateProgressBar);
    };
  }, []);

  return (
    <>
      <div className="progress-container">
        <div className="progress-bar" id="scroll-progress"></div>
      </div>

      <div className="bg-gray-800 pt-12 pb-8 px-10 xl:px-64 md:px-32 grid grid-cols-1 md:grid-cols-3 justify-between items-center">

        <div className="col-span-2 text-left">
          <p className="text-gray-400 font-medium text-sm">{blog.category_name}</p>
          <h1 className="text-5xl font-bold font-sans text-white opacity-90 mb-2">
            {blog.title}
          </h1>

          <div className="flex items-center space-x-4 text-gray-400">
            <p className="font-semibold">
              {new Date(blog.created_at).toLocaleDateString("en-GB")}
            </p>
            <span className="text-lg">•</span>
            <p className="font-semibold">{readingTime} read</p>
          </div>

          <p className="font-semibold text-gray-400 mt-2">
            Author: {blog.author_name}
          </p>
        </div>

        <div className="col-span-1 flex justify-center mt-6 md:mt-0">
          <Image
            src={`/${blog.media_path}`}
            alt={blog.media_alt}
            className="w-80 md:w-96 max-h-[200px] rounded-lg"
            width={700}
            height={700}
          />
        </div>
      </div>

      <div className="grid grid-cols-12 gap-2 md:gap-4 container py-12">
        <div className="col-span-12 md:col-span-2">
          <div id="sticky-element">

            <p className="text-sm py-2">Share on Social Sites</p>
            <ul className="flex flex-wrap gap-2">
              <TwitterShareButton url={shareUrl}>
                <TwitterIcon size={32} round={true} />
              </TwitterShareButton>

              <FacebookShareButton url={shareUrl}>
                <FacebookIcon size={32} round={true} />
              </FacebookShareButton>

              <WhatsappShareButton url={shareUrl}>
                <WhatsappIcon size={32} round={true} />
              </WhatsappShareButton>

              <EmailShareButton url={shareUrl}>
                <EmailIcon size={32} round={true} />
              </EmailShareButton>
            </ul>

            <div className="border-b-2 w-full mt-3 mb-5"></div>
            <div className="hidden md:flex flex-col">
            {/* <p className="text-md md:text-xl font-semibold pb-3">TABLE OF CONTENTS</p>
            <ul>
              {["1. Audiences and targeting", "2. B2B or B2C", "3. Brand or non-branded", "4. A keyword's place in the search funnel"].map((item, index) => (
                <li key={index} className="paragraph py-0 hover:text-action transition duration-300 ease-in-out text-left">
                  {item}
                </li>
              ))}
            </ul> */}
            {/* <BlogPostWithTOC blogContent={blog.content}/> */}
            </div>
          </div>
        </div>
        <div className="col-span-12 md:col-span-7 content">
          <div dangerouslySetInnerHTML={{ __html: blog.content }} />
        </div>

        <div className="col-span-12 md:col-span-3">
          {blog.author_id && (
            <div className="py-4 border text-black shadow-md hover:shadow-xl rounded-md transition duration-300 ease-in-out bg-gray-light">
              <h3 className="text-xl font-semibold text-gray-800 mb-2 text-center">About Author</h3>
              <div className="flex justify-center">
                <Image
                  src={`/${blog.author_media_path}`}
                  alt={blog.author_media_alt}
                  width={128}
                  height={128}
                  className="rounded-full object-cover h-32 w-32 mb-2"
                />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2 text-center">{blog.author_name}</h3>
              <p className="px-2 text-center">{blog.author_bio}</p>
            </div>
          )}

          <section className="py-12">
            <div className="component bg-gray-light text-white rounded relative shadow-md hover:shadow-xl transition duration-300 ease-in-out pb-3 p-2 my-3">
              <div className="absolute top-0 left-3 md:left-1 h-6 text-2xl quoteLR pt-4 text-black">“</div>
              <p className="text-center px-6 md:px-2 pt-4 pb-2 text-black">Feel free to use images in our website by simply providing a source link to the page they are taken from.</p>
              <div className="text-right absolute bottom-5 right-3 md:right-1 leading-tight h-6 quoteLR text-2xl text-black">”</div>
            </div>
          </section>

          <section className="py-12">
            <div className="bg-gray-light text-white rounded-md shadow-md hover:shadow-lg transition duration-300 ease-in-out px-2 py-10">
              <LeadForm />
            </div>
          </section>
        </div>
      </div>
    </>
  );
}


export async function getServerSideProps(context) {
  const { req } = await context;
  const pageUrl = `${req.url}`;
  
  let page, blog;
  try {
    page = await fetchDataFromDB({url: `/api/user/page?url=${pageUrl}`});
    blog = await fetchDataFromDB({url: `/api/user/blog?url=${pageUrl.split('/blog')[1]}`});
  }
  catch (err) {
    console.error("Error fetching data:", err);
  }
  
  return { props: { page: page || [], blog: blog[0] || [] } };
}