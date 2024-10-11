import LoginPage from "@/pages/login";
import { fetchDataFromDB } from "@/utils/helper";

export default function RegisterPage() {
  return <LoginPage />;
}


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