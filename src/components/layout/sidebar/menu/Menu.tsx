import React, {FC} from 'react';
import {Card, List, ListItem, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import {dataMenu} from "./data";
import {useNavigate} from "react-router-dom";
import {IMenuItem} from "../../../types";

export const Menu: FC = () => {

  const navigation = useNavigate()

  return (
    <Card
      variant='outlined'
      sx={{
        padding: 2,
        backgroundColor: "#F1F7FA",
        borderRadius: 3,
        border: "none",
        marginBottom: 10,
        marginTop: 5,
      }}>
      <List>
        {dataMenu.map((menuItem: IMenuItem) => (
          <ListItem key={menuItem.title} disablePadding>
            <ListItemButton onClick={() => navigation(menuItem.link)}>
              <ListItemIcon
                sx={{
                  minWidth: 36,
                }}
              >
                <menuItem.icon/>
              </ListItemIcon>
              <ListItemText primary={menuItem.title}/>
            </ListItemButton>
          </ListItem>
        ))}

      </List>
    </Card>
  );
};
