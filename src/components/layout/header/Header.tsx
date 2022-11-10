import React, {FC, useState} from 'react';
import vkLogo from '../../../assets/vk-logo.png'
import {Search} from '@mui/icons-material'

import styles from './Header.module.css'

export const Header: FC = () => {

  const [isSearchActive, setISearchActive] = useState(false)

  return (
    <header className={styles.header}>
      <div className={styles['image-wrapper']}>
        <img src={vkLogo} alt="logo"/>
      </div>

      <div className={styles.wrapper}>
        {!isSearchActive && (<Search/>)}
        <input
          type="text"
          placeholder="Поиск"
          onFocus={() => setISearchActive(true)}
          onBlur={() => setISearchActive(false)}
        />
      </div>
    </header>
  );
};
