import {Avatar, Box, ImageList, ImageListItem} from '@mui/material';
import React, {FC} from 'react';
import {IPost} from "../../../types";
import {Link} from "react-router-dom";

interface IPosts {
  posts: IPost[]
}

export const Posts: FC<IPosts> = ({posts}) => {
  return (
    <>
      {posts.map((post: IPost) => (
        <Box
          key={post.author._id}
          sx={{
            border: '1px solid #CCCCCC',
            borderRadius: "10px",
            padding: 2,
            marginTop: 4,
          }}>
          <Link
            to={`/profile/${post.author._id}`}
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
              height: 50,
            }}>
              <Avatar
                src={post.author.avatar}
                alt={`user ${post.author.name}`}
                sx={{
                  borderRadius: "50%",
                  width: 46,
                  height: 46,
                }}
              />
            </Box>
            <div>
              <div style={{fontSize: 14,}}>{post.author.name} </div>
              <div style={{fontSize: 14, opacity: '0.6'}}>{post.createdAt}</div>
            </div>
          </Link>
          <p>
            {post.content}
          </p>
          {post.images?.length && (
            <ImageList variant='masonry' cols={3} gap={8}>
              {
                post.images.map((image: string, index: number) => (
                  <ImageListItem key={index}>
                    <img
                      src={image}
                      alt={''}
                      loading="lazy"
                    />
                  </ImageListItem>
                ))
              }
            </ImageList>
          )}
        </Box>
      ))}
    </>
  )
};
