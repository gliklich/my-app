import React from 'react';

import styles from './NotFoundBlock.module.scss';

const NotFound: React.FC = () => {
  return (
    <div className={styles.root}>
      <h1>Ничего не найдено :(</h1>
      <p>К сожалению данная страница отсутствие в нашем интернет магазине</p>
    </div>
  );
};

export default NotFound;
