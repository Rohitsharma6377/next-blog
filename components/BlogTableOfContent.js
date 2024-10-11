import { useEffect, useState, useRef } from "react";

const BlogPostWithTOC = ({ blogContent }) => {
  const [headings, setHeadings] = useState([]);
  const contentRef = useRef(null);

  useEffect(() => {
    if (contentRef.current) {
      // Parse blogContent as a DOM element
      const parser = new DOMParser();
      const doc = parser.parseFromString(blogContent, "text/html");

      // Capture all <h2> elements in the blogContent
      const headingElements = Array.from(doc.querySelectorAll("h2"));
      
      
      // Map to an array of the text between <h2> and </h2> tags
      const headingsArray = headingElements.map((heading) => heading.innerText);
      console.log('////////////', headingsArray);

      // Update state with the extracted headings
      setHeadings(headingsArray);
    }
  }, [blogContent]);

  return (
    <div>
      {/* Table of Contents */}
      <div className="toc">
        <p className="text-md md:text-xl font-semibold pb-3">TABLE OF CONTENTS</p>
        <ul>
          {headings.map((heading, index) => (
            <li key={index} className="paragraph py-0 hover:text-action transition duration-300 ease-in-out text-left">
              {`${index + 1}. ${heading}`} {/* Display numbered list of headings */}
            </li>
          ))}
        </ul>
      </div>

      {/* Blog Content */}
      <div className="blog-content" ref={contentRef} dangerouslySetInnerHTML={{ __html: blogContent }} />
    </div>
  );
};

export default BlogPostWithTOC;