import React, {KeyboardEvent, useEffect, useState, ChangeEvent} from 'react';
import {addDoc, collection, onSnapshot} from "firebase/firestore";
import {IMessage} from "../../types";
import {useAuth} from "../../providers";
import {
  Alert, Avatar,
  Fab,
  Grid,
  List,
  ListItem,
  ListItemText,
  TextField
} from "@mui/material";
import {Send as SendIcon} from "@material-ui/icons";
import {CardUI} from "../../ui";

export const Messages = () => {

  const {db, user} = useAuth()

  const [message, setMessage] = useState<string>("")
  const [messages, setMessages] = useState<IMessage[]>([] as IMessage[])
  const [error, setError] = useState('')


  const addMessageOnButtonClick = async () => {

    try {
      await addDoc(collection(db, 'messages'), {
        user: user,
        message: message,
      })
    } catch (error: any) {
      setError(error?.message || 'error')
    }

    setMessage("")
  }

  const onChangeTextInput = (e: ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value)
  }

  const addMessageKeyboardHandler = async (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      try {
        await addDoc(collection(db, 'messages'), {
          user,
          message,
        })
      } catch (error: any) {
        setError(error?.message || 'error')
      }

      setMessage("")
    }
  }

  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'messages'), doc => {
      const array: IMessage[] = []
      doc.forEach((d: any) => {
        array.unshift(d.data())
      })
      setMessages(array)
    })

    return () => unsub()
  }, [])

  if (!messages) {
    return null
  }

  return (
    <>
      {error && (<Alert severity='error'>{error}</Alert>)}
      <CardUI>
        <List style={{height: "65vh", overflowY: 'auto'}}>
          {messages.map((message: IMessage, index: number) => (
            <ListItem key={index}>
              <Grid container sx={
                message?.user?._id === user?._id
                  ? {
                    textAlign: 'right',
                    backgroundColor: 'lightblue',
                    borderRadius: "25px",
                    paddingRight: "35px",
                  }
                  : {
                    paddingRight: "35px",
                  }
              }
              >
                <Grid item xs={12}
                      sx={{
                        display: 'flex',
                        justifyContent: message?.user?._id === user?._id ? 'flex-end' : 'flex-start',
                        paddingTop: '10px',
                      }}>
                  <Avatar
                    src={message?.user?.avatar}
                    sx={{width: 30, height: 30}}
                  />
                </Grid>
                <Grid item xs={12}>
                  <ListItemText
                    primary={message?.message || "oleg"}
                    sx={message?.user?._id === user?._id ? {color: '#000000'} : {}}
                  />
                </Grid>
                <Grid item xs={12}>
                  <ListItemText secondary={message?.user?.name}/>
                </Grid>
              </Grid>
            </ListItem>
          ))}
        </List>
        <Grid container sx={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
          <Grid item xs={10.8} sx={{paddingRight: 5}}>
            <TextField
              fullWidth
              label="Расскажи что у тебя нового"
              variant='outlined'
              value={message}
              margin='normal'
              onKeyPress={addMessageKeyboardHandler}
              onChange={onChangeTextInput}
            />
          </Grid>
          <Grid item xs={1} alignItems='right'>
            <Fab
              color='primary'
              arial-lable='add'
              onClick={addMessageOnButtonClick}
            >
              <SendIcon/>
            </Fab>
          </Grid>
        </Grid>

      </CardUI>
    </>
  );
};
