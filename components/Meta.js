import Head from "next/head";

const Meta = ({ title, description }) => {
  return (
    <Head>
      <title>{title || "TrueLoans - Get Home Loan!"}</title>
      <meta name="description" content={description || "Get your home loan today!!"} />
    </Head>
  );
};

export default Meta;