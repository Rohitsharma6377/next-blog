import { fetchDataFromDB } from '@/utils/helper';
import React from 'react';

// Dummy blog data
const dummyBlogs = [
    {
        id: 1,
        title: 'Understanding EMI: A Comprehensive Guide',
        excerpt: 'Explore the essential concepts of Equated Monthly Installments (EMIs) and how they affect your loans.',
        date: '2024-09-01',
        image: '/images/blog/online-colors.jpg',
    },
    {
        id: 2,
        title: 'Top Tips for Home Loan Approval',
        excerpt: 'Get to know the key tips that can help you secure approval for your home loan quickly.',
        date: '2024-09-05',
        image: '/images/blog/online-colors.jpg',
    },
    {
        id: 3,
        title: 'Managing Your Finances Effectively',
        excerpt: 'Learn how to manage your finances with smart budgeting techniques and investment strategies.',
        date: '2024-09-10',
        image: '/images/blog/online-colors.jpg',
    },
    {
        id: 1,
        title: 'Understanding EMI: A Comprehensive Guide',
        excerpt: 'Explore the essential concepts of Equated Monthly Installments (EMIs) and how they affect your loans.',
        date: '2024-09-01',
        image: '/images/blog/online-colors.jpg',
    },
    {
        id: 2,
        title: 'Top Tips for Home Loan Approval',
        excerpt: 'Get to know the key tips that can help you secure approval for your home loan quickly.',
        date: '2024-09-05',
        image: '/images/blog/online-colors.jpg',
    },
    {
        id: 3,
        title: 'Managing Your Finances Effectively',
        excerpt: 'Learn how to manage your finances with smart budgeting techniques and investment strategies.',
        date: '2024-09-10',
        image: '/images/blog/online-colors.jpg',
    },
];

const Blog = ({ blog }) => (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <img 
            src={blog.image} 
            alt={blog.title} 
            className="w-full h-40 object-cover transition-transform transform hover:scale-105" 
        />
        <div className="p-4">
            <h2 className="text-xl font-semibold text-gray-800">{blog.title}</h2>
            <p className="text-gray-600 mt-2">{blog.excerpt}</p>
            <p className="text-gray-500 text-sm mt-4">{blog.date}</p>
        </div>
    </div>
);

const InterestingReads = () => {
    return (
        <>
            <div className="container mx-auto mt-5 p-6">
                <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">Interesting Reads</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {dummyBlogs.map(blog => (
                        <Blog key={blog.id} blog={blog} />
                    ))}
                </div>
            </div>
        </>
    );
};

export default InterestingReads;



export async function getServerSideProps(context) {
    const { req } = await context;
    const pageUrl = `${req.url}`;
    
    let page;
    try {
      page = await fetchDataFromDB({url: `/api/user/page?url=${pageUrl}`});
    }
    catch (err) {
      console.error("Error fetching data:", err);
    }
    
    return { props: { page: page || [] } };
}