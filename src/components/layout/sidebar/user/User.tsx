import React, {FC} from 'react';
import {Avatar, Button, Card, Chip} from "@mui/material";
import {useAuth} from "../../../providers";
import {signOut} from 'firebase/auth';

export const User: FC = () => {

  const {user, ga} = useAuth()

  return (
    <Card
      variant='outlined'
      sx={{
        padding: 2,
        backgroundColor: "#F1F7FA",
        border: 'none',
        borderRadius: 3,
        marginBottom: 5,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <Chip
        avatar={
          <Avatar
            alt=''
            src={user?.avatar}
          />
        }
        label={user?.name || "Без имени"}
        variant='outlined'
      />
      <Button
        variant='outlined'
        onClick={() => signOut(ga)}
      >
        Выйти
      </Button>
    </Card>
  );
};