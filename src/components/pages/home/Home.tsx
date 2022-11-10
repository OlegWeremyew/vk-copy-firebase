import React, {FC, useState} from 'react';
import {Box} from "@mui/material";
import {AddPost} from "./add-post";
import {IPost} from "../../types";
import {Posts} from "./posts";
import {initialPostState} from "./data";

export const Home: FC = () => {

  const [posts, setPosts] = useState<IPost[]>(initialPostState)

  return (
    <Box>
      <AddPost setPosts={setPosts}/>
      <Posts posts={posts}/>
    </Box>
  );
};
