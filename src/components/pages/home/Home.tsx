import React, {FC} from 'react';
import {Box} from "@mui/material";
import {AddPost} from "./add-post";
import {Posts} from "./posts";

export const Home: FC = () => {

  return (
    <Box>
      <AddPost/>
      <Posts/>
    </Box>
  );
};
