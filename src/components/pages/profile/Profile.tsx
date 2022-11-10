import React from 'react';
import {useAuth} from "../../providers";
import {CardUI} from "../../ui";
import {Avatar} from "@mui/material";

export const Profile = () => {

  const {user} = useAuth()

  return (
    <CardUI>
      <Avatar
        src={user?.avatar}
        alt={`user ${user?.name}`}
      />
     <h1>{user?.name}</h1>
    </CardUI>
  );
};
