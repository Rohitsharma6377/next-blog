'use client'

import AddUpdateBlog from "@/app/admin/(routes)/(blogs)/add-blog/page";

export default function Page({ params }) {
  return <AddUpdateBlog blogId={params.slug} />
}