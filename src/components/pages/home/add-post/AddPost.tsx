import React, {FC, useState, KeyboardEvent, ChangeEvent} from 'react';
import {Box, TextField} from "@mui/material";
import {IPost, TypeSetState} from "../../../types";
import {users} from "../../../layout/sidebar/user-items/data";

interface IAddPost {
  setPosts: TypeSetState<IPost[]>
}

export const AddPost: FC<IAddPost> = ({setPosts}) => {

  const [content, setContent] = useState("")

  const onChangeTextInput = (e: ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value)
  }

  const addPostHandler = (e: KeyboardEvent<HTMLInputElement>) => {

    if (e.key === 'Enter') {
      setPosts(prev => [{
        author: users[0],
        createdAt: "5 минут назад",
        content,
      }, ...prev,])
      setContent("")
    }
  }

  return (
    <Box sx={{
      border: '1px solid #CCCCCC',
      borderRadius: "10px",
      padding: 2,
    }}>
      <TextField
        label="Расскажи что у тебя нового"
        variant='outlined'
        inputProps={{
          sx: {
            border: 'none',
            borderRadius: "25px",
            backgroundColor: '#F9F9F9',
          }
        }}
        sx={{
          width: "100%",
        }}
        value={content}
        margin='normal'
        onKeyPress={addPostHandler}
        onChange={onChangeTextInput}
      />
    </Box>
  );
};
