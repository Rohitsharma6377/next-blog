import Head from "next/head";

const Meta = ({ title, description }) => {
  return (
    <Head>
      <title>{title || "Traveler's - Amazing Travel Story!"}</title>
      <meta name="description" content={description || "Make A Trip With Us!!"} />
    </Head>
  );
};

export default Meta;