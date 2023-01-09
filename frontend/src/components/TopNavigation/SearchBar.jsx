import { useEffect, useState } from "react"
import SearchIcon from '@mui/icons-material/Search';
import { useSelector } from "react-redux";
import { getCurrentWorkArea } from "../../store/workareaReducer";


const SearchBar = () => {
    const currentWorkarea = useSelector(getCurrentWorkArea);
    const [showSearch, setShowSearch] =useState(false);

    const openSearch = () => {
        if (showSearch) return;
        setShowSearch(false)
    }

    // useEffect()
    return (
        <div id="top-searchbar">
            {/* <input id="search-input" type="text" placeholder="Search within workarea" /> */}
            <button id="search-input-btn">
                <SearchIcon/>
                <span className="search-wa-btn-text">Search {currentWorkarea?.name}</span>
            </button>
        </div>
    )

}

export default SearchBar