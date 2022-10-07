import React from 'react';
import s from './NotFoundBlock.module.scss';

const NotFoundBlock = () => {
  return (
    <div className={s.root}>
      <h1>
        <span>😕</span>
        <br />
        Not found
      </h1>
      <p className={s.description}>Unfortunately, this page does not exist</p>
    </div>
  );
};

export default NotFoundBlock;
