import React from "react"
import ContentLoader from "react-content-loader"

const ImageSkeleton = () => (
    <ContentLoader
        speed={2}
        width={400}
        height={170}
        viewBox="0 0 400 170"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
    >
        <rect x="37" y="170" rx="10" ry="10" width="170" height="170" />
    </ContentLoader>
)

export default ImageSkeleton

