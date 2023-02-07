import React from 'react';
import ContentLoader from 'react-content-loader';

const Skeleton = () => (
  <ContentLoader
    className="pizza-block"
    speed={2}
    width={280}
    height={466}
    viewBox="0 0 280 466"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb">
    <circle cx="140" cy="140" r="130" />
    <rect x="0" y="281" rx="10" ry="10" width="280" height="27" />
    <rect x="0" y="321" rx="10" ry="10" width="280" height="80" />
    <rect x="0" y="418" rx="10" ry="10" width="91" height="35" />
    <rect x="125" y="414" rx="25" ry="25" width="153" height="45" />
  </ContentLoader>
);

export default Skeleton;
