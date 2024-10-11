// import Grid from '../parts/Grid';

const ComparisonPage = () => {
    const gridData = [
        { text: 'Lender A', rate: '5.5%', fees: '2%', tenure: '30 years', ltv: '80%' },
        { text: 'Lender B', rate: '6.0%', fees: '1.5%', tenure: '25 years', ltv: '75%' },
        // Add more data as needed
    ];

    return (
        <div className="container mx-auto p-4">
            {/* <Grid grid={gridData} /> */}
        </div>
    );
};
