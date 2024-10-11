import AddUpdatePage from "@/app/admin/(routes)/(pages)/add-page/page";

export default function Page({ params }) {
  return <AddUpdatePage pageId={params.slug} />;
}