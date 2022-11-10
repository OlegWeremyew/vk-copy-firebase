import React, {FC, useState, KeyboardEvent, ChangeEvent} from 'react';
import {Alert, Box, TextField} from "@mui/material";
import {useAuth} from "../../../providers";
import {addDoc, collection} from "firebase/firestore";

export const AddPost: FC = () => {

  const {user, db} = useAuth()

  const [content, setContent] = useState("")
  const [error, setError] = useState('')

  const onChangeTextInput = (e: ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value)
  }

  const addPostHandler = async (e: KeyboardEvent<HTMLInputElement>) => {

    if (e.key === 'Enter' && user) {
      try {
        await addDoc(collection(db, 'posts'), {
          author: user,
          content,
          createdAt: "Только что",
        })
      } catch (error: any) {
        setError(error?.message || 'error')
      }

      setContent("")
    }
  }

  return (
    <>
      {error && (<Alert severity='error'>{error}</Alert>)}
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
    </>

  );
};
