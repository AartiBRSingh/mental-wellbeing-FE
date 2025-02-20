import { useEffect, useState } from "react";
import Cookies from "js-cookie";

const useUserInteraction = () => {
  const [viewedPosts, setViewedPosts] = useState([]);

  useEffect(() => {
    const storedViews = Cookies.get("viewedPosts");
    if (storedViews) {
      try {
        const parsedViews = JSON.parse(storedViews);
        setViewedPosts(parsedViews);
      } catch (error) {
        console.error("Error parsing stored views:", error);
        Cookies.remove("viewedPosts");
      }
    }
  }, []);

  const trackPostView = (postId) => {
    if (!postId) return;

    setViewedPosts((prev) => {
      const updatedViews = [...new Set([...prev, postId])];
      try {
        Cookies.set("viewedPosts", JSON.stringify(updatedViews), {
          expires: 7,
          sameSite: "strict",
        });
      } catch (error) {
        console.error("Error saving viewed posts:", error);
      }
      return updatedViews;
    });
  };

  return { viewedPosts, trackPostView };
};

export default useUserInteraction;
