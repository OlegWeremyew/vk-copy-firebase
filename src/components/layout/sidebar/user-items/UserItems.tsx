import React, {FC} from 'react';
import {Avatar, Box, Card, List, ListItem, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import {Link, useNavigate} from "react-router-dom";
import {QuestionAnswer} from "@material-ui/icons";
import {IUser} from "../../../types";
import {users} from "./data";

export const UserItems: FC = () => {

  const navigation = useNavigate()

  return (
    <Card
      variant='outlined'
      sx={{
        padding: 2,
        backgroundColor: "#F1F7FA",
        borderRadius: 3,
        border: "none",
      }}>
      {users.map((user: IUser) => (
        <Link
          key={user._id}
          to={`/profile`}
          style={{
            display: 'flex',
            alignItems: 'center',
            color: "#111111",
            textDecoration: "none",
            marginBottom: 12,
          }}
        >
          <Box sx={{
            position: 'relative',
            marginRight: 2,
            overflow: 'hidden',
            width: 70,
            height: 50,
          }}>
            <Avatar
              src={user.avatar}
              alt={`user ${user.name}`}
              sx={{
                borderRadius: "50%",
                width: 46,
                height: 46,
              }}
            />
            {user.isInNetwork && (
              <Box
                sx={{
                  border: "3px solid #F1F7FA",
                  position: "absolute",
                  width: 15,
                  height: 15,
                  backgroundColor: "#4FB14F",
                  bottom: 5,
                  left: 34,
                  borderRadius: "50%",
                }}
              />
            )}
          </Box>
          <span style={{fontSize: 14}}>{user.name}</span>
        </Link>
      ))}
      <List>
        <ListItem disablePadding>
          <ListItemButton onClick={() => navigation('/messages')}>
            <ListItemIcon>
              <QuestionAnswer/>
            </ListItemIcon>
            <ListItemText primary="Сообщения"/>
          </ListItemButton>
        </ListItem>
      </List>
    </Card>
  );
};
