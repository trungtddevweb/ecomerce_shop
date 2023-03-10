import PropTypes from 'prop-types'
import classNames from 'classnames'
import images from '~/assets/imgs'
import { forwardRef } from 'react'
import { useState } from 'react'

const Image = forwardRef(({ className, src, alt, fallback: customFallback = images.noImage, ...props }, ref) => {
    const [fallback, setFallback] = useState('')


    const handleError = () => {
        setFallback(customFallback);
    };
    return (
        <img alt={alt} className={classNames(className)} onError={handleError} {...props} src={src || fallback} ref={ref} />
    )
})
Image.propTypes = {
    className: PropTypes.string,
    src: PropTypes.string,
    alt: PropTypes.string,
    fallback: PropTypes.string,
}

export default Image