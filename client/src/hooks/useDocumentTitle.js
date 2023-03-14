import { useEffect } from 'react'
import { Helmet } from 'react-helmet'


function useDocumentTitle(title, description) {
    useEffect(() => {
        if (title) {
            document.title = title;
            return;
        }
        // Reset the title to the default value when title is undefined or null
        document.title = "My React App";
    }, [title]);

    return <Helmet><title>{title || "My React App"}</title></Helmet>;
};

export default useDocumentTitle