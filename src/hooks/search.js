import React, { createContext, useContext, useState, useCallback } from 'react';
import api from '../services/api';

const SearchContext = createContext();

const SearchProvider = ({ children }) => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    const searchAction = useCallback(async (term) => {
        try {
            if (term) {
                setLoading(true);
                const res = await api.get('/users/search/any', {
                    params: {
                        term,
                    }
                });

                if (res.status === 200) setUsers(res.data);
            }
        } catch (error) {
            throw Error(error);
        } finally {
            setLoading(false);
        }
    }, []);

    return (
        <SearchContext.Provider value={{ users, loading, searchAction, setUsers, setLoading }}>
            {children}
        </SearchContext.Provider>
    )
}

function useSearch() {
    const context = useContext(SearchContext);

    if (!context) throw new Error('useSearch must be used within an SearchProvider');

    return context;
}

export { SearchProvider, useSearch };