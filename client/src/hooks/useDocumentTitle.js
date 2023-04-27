import { useEffect } from 'react'
import { Helmet } from 'react-helmet'

function useDocumentTitle(title, description) {
    useEffect(() => {
        if (title) {
            document.title = title
            return
        }
        document.title = 'My store'
    }, [title])

    return (
        <Helmet>
            <title>{title}</title>
        </Helmet>
    )
}

export default useDocumentTitle
