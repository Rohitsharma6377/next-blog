// components/News.js
import Link from 'next/link';
import React from 'react';

function News() {
    const news = [
        {
            url: 'https://www.moneycontrol.com/news/business/personal-finance/reduce-emis-by-shifting-your-home-loan-to-a-bank-that-offers-lower-interest-rate-6068361.html',
            coverImg: 'news-6.jpg',
            title: 'Reduce EMIs by shifting your home loan to a bank that offers lower interest',
        },
        {
            url: 'https://economictimes.indiatimes.com/wealth/personal-finance-news/high-home-loan-demand-triggers-interest-rate-war/articleshow/79035338.cms',
            coverImg: 'news-1.jpg',
            title: 'High home loan demand triggers interest rate war',
        },
        {
            url: 'https://economictimes.indiatimes.com/wealth/personal-finance-news/diwali-dhamaka-sbi-announces-25-bps-concession-on-home-loans/articleshow/78784854.cms',
            coverImg: 'news-2.jpg',
            title: 'Diwali dhamaka: SBI announces 25 bps concession on home loans',
        },
        {
            url: 'https://economictimes.indiatimes.com/wealth/personal-finance-news/home-loan-enquiries-top-last-years-level/articleshow/78268739.cms',
            coverImg: 'news-3.jpg',
            title: 'Home loan enquiries top last year\'s level',
        },
        {
            url: 'https://economictimes.indiatimes.com/wealth/personal-finance-news/easier-housing-loans-promise-of-liquidity-what-rbi-announcements-mean-for-you/articleshow/78587215.cms',
            coverImg: 'news-4.jpg',
            title: 'Easier housing loans promise of liquidity: What RBI announcements mean for you',
        },
        {
            url: 'https://timesofindia.indiatimes.com/business/india-business/bank-of-baroda-union-bank-cut-home-loan-rates/articleshow/78973494.cms',
            coverImg: 'news-5.jpg',
            title: 'Bank of Baroda, Union Bank cut home loan rates',
        },
    ];

    return (
        <div className="container mx-auto py-5">
            <h2 className="text-2xl font-bold mb-4">Latest News</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {news.slice(0, 6).map((item, index) => {
                    const altText = item.coverImg.replace('.jpg', '').replace(/_/g, ' ').replace(/-/g, ' ');
                    return (
                        <div className="bg-white rounded-lg shadow-lg overflow-hidden" key={index}>
                            <Link href={item.url} target="_blank" rel="noopener noreferrer" className="block">
                                <img src={`news/${item.coverImg}`} alt={altText} className="w-full h-48 object-cover" />
                                <div className="p-4">
                                    <h3 className="text-lg font-semibold">{item.title}</h3>
                                    <button className="mt-2 bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-600 transition">
                                        Read More
                                    </button>
                                </div>
                            </Link>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default News;
