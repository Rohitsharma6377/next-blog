import { useState } from 'react';


const FAQs = ({ data }) => {
    const [activeIndex, setActiveIndex] = useState(null);

    const toggleCollapse = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <div className="container mx-auto p-6">
            <h2 className="text-3xl font-bold text-center mb-6">Frequently Asked Questions</h2>
            <div className="space-y-4">
                {data.map((faq, index) => (
                    <div key={index} className="card rounded-lg">
                        <div 
                            className="p-2 cursor-pointer flex justify-between items-center" 
                            onClick={() => toggleCollapse(index)}
                        >
                            <h5 className="text-lg font-medium">{faq.question}</h5>
                            <span className={`transition-transform ${activeIndex === index ? 'rotate-45' : 'rotate-0'} text-3xl font-bold`}>+</span>
                        </div>
                        {activeIndex === index && (
                            <div className="p-2">
                                <p>{faq.answer}</p>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FAQs;