import { useEffect, useState } from "react"


const SearchBar = () => {

    const [showSearch, setShowSearch] =useState(false);

    const openSearch = () => {
        if (showSearch) return;
        setShowSearch(false)
    }

    // useEffect()
    return (
        <div id="top-searchbar">
            <input id="search-input" type="text" placeholder="Search within workarea" />
        </div>
    )

}

export default SearchBar