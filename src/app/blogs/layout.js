export const metadata = {
  title: {
    template: "%s",
    default: "Blog | ShareYrHeart",
  },
  description:
    "Explore our latest articles on mental health, wellness, and personal growth",
  openGraph: {
    siteName: "ShareYrHeart",
  },
};

export default function BlogsLayout({ children }) {
  return <div className="blog-layout">{children}</div>;
}
