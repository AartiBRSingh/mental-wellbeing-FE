import { baseURL } from "@/app/baseURL";
import BlogDetail from "@/app/components/BlogDetail";
import { notFound } from "next/navigation";

export async function generateMetadata({ params, searchParams }) {
  const id = searchParams.id;

  const post = await fetchPost(id);

  if (!post) {
    return null;
  }

  const metaDescription = generateMetaDescription(post.content);

  return {
    title: post.title,
    description: metaDescription,
    openGraph: {
      title: post.title,
      description: metaDescription,
      type: "article",
      url: `${baseURL}/blogs/${params.slug}?id=${id}`,
      ...(post.image && {
        images: [
          {
            url: post.image,
            width: 1200,
            height: 630,
            alt: post.title,
          },
        ],
      }),
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: metaDescription,
      ...(post.image && {
        images: [post.image],
      }),
    },
    alternates: {
      canonical: `${baseURL}/blogs/${params.slug}?id=${id}`,
    },
  };
}

function generateMetaDescription(content, length = 160) {
  const strippedContent = content.replace(/<[^>]*>/g, "");
  return strippedContent.length > length
    ? strippedContent.substring(0, length) + "..."
    : strippedContent;
}

async function fetchPost(id) {
  try {
    const res = await fetch(`${baseURL}/posts/${id}`, {
      next: { revalidate: 300 },
    });

    if (!res.ok) return null;
    return await res.json();
  } catch (error) {
    console.error("Error fetching post:", error);
    return null;
  }
}

export default function BlogDetailPage({ params, searchParams }) {
  const id = searchParams.id;
  if (!id) {
    notFound();
  }

  return <BlogDetail postId={id} />;
}
