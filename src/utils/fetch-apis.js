import { POSTS_ENDPOINT } from "./constants";

export const getPostsUsingFetchAPI = async (setPosts) => {
  try {
    // Fetch API
    const response = await fetch(POSTS_ENDPOINT);
    const data = await response.json();
    setPosts(data);
  } catch (error) {
    console.log("Something went wrong: " + error);
  }
};
