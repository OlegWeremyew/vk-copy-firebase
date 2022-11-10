import React, {FC, ReactNode} from 'react';
import {Box} from "@mui/material";

interface ICard {
  children: ReactNode
}

export const CardUI: FC<ICard> = ({children}) => {
  return (
    <Box
      sx={{
        border: '1px solid #CCCCCC',
        borderRadius: "10px",
        padding: 2,
        marginTop: 4,
      }}>
      {children}
    </Box>
  );
};
