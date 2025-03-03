import React from "react";
import ContentLoader from "react-content-loader";

const Skeleton = () => (
  <ContentLoader
    speed={2}
    width={450}
    height={350}
    viewBox="0 0 450 350"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <rect
      x="0"
      y="0"
      rx="16"
      ry="16"
      width="400"
      height="338"
    />
  </ContentLoader>
);

export default Skeleton;
