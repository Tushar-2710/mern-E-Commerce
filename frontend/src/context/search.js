import { useState, useContext, createContext } from 'react'

const Searchcontext = createContext()

const SearchProvider = ({ children }) => {
    const [Search, setSearch] = useState({
        keyword: "",
        result: []
    })

    return (
        <Searchcontext.Provider value={[Search, setSearch]}>
            {children}
        </Searchcontext.Provider>
    )
}
const useSearch = () => useContext(Searchcontext)
export { useSearch, SearchProvider }