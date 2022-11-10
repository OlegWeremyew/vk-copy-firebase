import React, {FC} from 'react';
import {UserItems} from "./user-items";
import {Menu} from "./menu";
import {User} from "./user";

export const Sidebar: FC = () => {
  return (
    <div>
      <User/>
      <UserItems/>
      <Menu/>
    </div>
  );
};
