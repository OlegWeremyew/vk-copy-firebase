import React, {ChangeEvent, FC, SyntheticEvent, useEffect, useState} from 'react';
import {TextField, ButtonGroup, Button, Grid, Alert} from "@mui/material";
import type {IUserData} from "./types";
import {createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile} from 'firebase/auth';
import {useAuth} from "../../providers";
import {useNavigate} from "react-router-dom";

export const Auth: FC = () => {

  const {ga, user} = useAuth()

  const navigate = useNavigate()

  const [isRegForm, setIsRegForm] = useState(false)
  const [userData, setUserData] = useState<IUserData>({
    email: '',
    password: '',
    name: '',
  })
  const [error, setError] = useState('')

  const {email, password, name} = userData

  const handleLogin = async (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (isRegForm) {
      try {
        const response = await createUserWithEmailAndPassword(ga, email, password)
        await updateProfile(
          response.user, {
            displayName: name
          })
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
      name: ','
    })
  }

  const onChangeNameInputValue = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setUserData({...userData, name: e.target.value})
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
            type='text'
            label='name'
            variant='outlined'
            value={name}
            onChange={(e) => onChangeNameInputValue(e)}
            sx={{display: 'block', marginBottom: 3, marginTop: 2}}
          />
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
            <Button sx={{width: '50%'}} type='submit' onClick={() => setIsRegForm(false)}>Auth</Button>
            <Button sx={{width: '50%'}} type='submit' onClick={() => setIsRegForm(true)}>Register</Button>
          </ButtonGroup>
        </form>
      </Grid>
    </>
  )
    ;
};
