import axios from "axios";
import { POSTS_ENDPOINT } from "./constants";

export const getPostsUsingAxios = async (setPosts) => {
  // .then
  //   axios
  //     .get(POSTS_ENDPOINT)
  //     .then(({ data }) => {
  //       return data;
  //     })
  //     .catch((error) => {
  //       console.log("something went wrong: " + error);
  //     });

  // async await
  try {
    const { data } = await axios.get(POSTS_ENDPOINT);
    setPosts(data);
    return data;
  } catch (error) {
    console.log("something went wrong: " + error);
  }
};

export const createNewPost = async () => {
  const newPost = {
    userId: "unclebigbay",
    title: "New post title",
    body: "Body contents....",
  };
  const res = await axios.post(POSTS_ENDPOINT, newPost);
  console.log(res);
};

export const updatePost = async (postId) => {
  const newPost = {
    userId: "unclebigbay",
    title: "Updated title",
    // body: "Updated Body contents....",
  };
  const res = await axios.put(POSTS_ENDPOINT + "/" + postId, newPost);
  console.log(res);
};
