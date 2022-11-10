import {Avatar, Box, ImageList, ImageListItem} from '@mui/material';
import React, {FC, useEffect, useState} from 'react';
import {IPost} from "../../../types";
import {Link} from "react-router-dom";
import {onSnapshot, collection} from 'firebase/firestore';
import {useAuth} from "../../../providers";
import {initialPostState} from "../data";
import {CardUI} from "../../../ui";

export const Posts: FC = () => {

  const [posts, setPosts] = useState<IPost[]>(initialPostState)

  const {db} = useAuth()

  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'posts'), doc => {
      const array: IPost[] = [...posts]
      doc.forEach((d: any) => {
        array.push(d.data())
      })
      setPosts(array)
    })

    return () => unsub()
  }, [])

  return (
    <>
      {posts.map((post: IPost) => (
        <CardUI key={post.author._id}>
          <Link
            to={`/profile/${post.author._id}}`}
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
                post.images.map((image: string) => (
                  <ImageListItem key={`${Math.random()}`}>
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
        </CardUI>
      ))}
    </>
  )
};
