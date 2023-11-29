import React, { useEffect, useState } from "react";
import { getPostsUsingFetchAPI } from "../utils/fetch-apis";
import {
  createNewPost,
  getPostsUsingAxios,
  updatePost,
} from "../utils/axios.apis";

const Playground = () => {
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    // getPostsUsingFetchAPI(setPosts);
    // getPostsUsingAxios(setPosts);
  }, []);

  return (
    <div className='p-5'>
      <button onClick={() => createNewPost()}>Create new post</button>
      <button onClick={() => updatePost(2)} className='mx-2 bg-yellow-200'>
        Update post
      </button>
      {posts?.length > 0 ? (
        <>
          {posts.map(({ id, userId, title, body }, i) => {
            return (
              <div key={id} className='mt-5 border-b border-slate-400'>
                <h2>
                  {i + 1} {title}
                </h2>
                <h3>{body}</h3>
                <p>Written by {userId}</p>
              </div>
            );
          })}
        </>
      ) : (
        <p>No posts yet</p>
      )}
    </div>
  );
};

export default Playground;
