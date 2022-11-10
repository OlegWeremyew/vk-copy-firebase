import React, {ChangeEvent, FC, SyntheticEvent, useEffect, useState} from 'react';
import {TextField, ButtonGroup, Button, Grid, Alert} from "@mui/material";
import type {IUserData} from "./types";
import {createUserWithEmailAndPassword, signInWithEmailAndPassword} from 'firebase/auth';
import {useAuth} from "../../providers";
import {useNavigate} from "react-router-dom";

export const Auth: FC = () => {

  const {ga, user} = useAuth()

  const navigate = useNavigate()

  const [isRegForm, setIsRegForm] = useState(false)
  const [userData, setUserData] = useState<IUserData>({
    email: '',
    password: '',
  })
  const [error, setError] = useState('')

  const {email, password} = userData

  const handleLogin = async (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (isRegForm) {
      try {
        await createUserWithEmailAndPassword(ga, email, password)
      } catch (error: any) {
        error?.message && setError(error?.message)
      }
    }
    if (!isRegForm) {
      try {
        await signInWithEmailAndPassword(ga, email, password)
      } catch (error: any) {
        error?.message && setError(error?.message)
      }
    }

    setUserData({
      email: '',
      password: '',
    })
  }

  const onChangeEmailInputValue = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setUserData({...userData, email: e.target.value})
  }

  const onChangePasswordInputValue = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setUserData({...userData, password: e.target.value})
  }

  useEffect(() => {
    if (user) {
      navigate('/')
    }
  }, [user])

  return (
    <>
      {error && (<Alert severity='error'>{error}</Alert>)}
      <Grid display='flex' justifyContent='center' alignItems='center'>
        <form onSubmit={handleLogin}>
          <TextField
            type='email'
            label='email'
            variant='outlined'
            value={email}
            onChange={(e) => onChangeEmailInputValue(e)}
            sx={{display: 'block', marginBottom: 3, marginTop: 2}}
            required
          />
          <TextField
            type='password'
            label='password'
            variant='outlined'
            value={password}
            onChange={(e) => onChangePasswordInputValue(e)}
            sx={{display: 'block', marginBottom: 3}}
            required
          />
          <ButtonGroup variant="contained" sx={{display: 'flex', justifyContent: 'center'}}>
            <Button type='submit' onClick={() => setIsRegForm(false)}>Auth</Button>
            <Button type='submit' onClick={() => setIsRegForm(true)}>Register</Button>
          </ButtonGroup>
        </form>
      </Grid>
    </>
  )
    ;
};
