import { Skeleton } from "@mui/material"

const SkeletonFallback = ({ width, height, animation = "wave", variant, ...props }) => {
    return (
        <Skeleton
            width={width}
            height={height}
            animation={animation}
            variant={variant}
            {...props}
        />
    )
}

export default SkeletonFallback