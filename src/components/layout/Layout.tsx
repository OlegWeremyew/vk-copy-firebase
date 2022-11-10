import React, {FC} from 'react';
import {Header} from "./header";
import {Sidebar} from "./sidebar";
import {ILayout} from "./types";
import {Grid} from "@mui/material";
import {useAuth} from "../providers";

export const Layout: FC<ILayout> = ({children}) => {

  const {user} = useAuth()

  return (
    <>
      {user && <Header/>}
      <Grid container spacing={2} marginX={5} marginTop={2} paddingX={2}>
        {user && (
          <Grid item md={2.5}>
            <Sidebar/>
          </Grid>
        )}
        <Grid item md={user ? 9 : 12}>
          {children}
        </Grid>
      </Grid>
    </>
  );
};
