import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSearch } from "@fortawesome/free-solid-svg-icons"


const Search = () => {
    return (
        <div className="search bg-white p-2 d-flex align-items-center rounded-5">
            <FontAwesomeIcon className="px-3 py-1" icon={faSearch} />
            <input className="border-0 search-input" spellCheck="false" type="text" placeholder="Search..." />
        </div>
    )
}

export default Search