import React, { createContext, useContext, useState, useCallback } from 'react';
import api from '../services/api';

const FeedContext = createContext();

const FeedProvider = ({ children }) => {
    const [feeds, setFeeds] = useState([]);
    const [page, setPage] = useState(0);
    const [totalFeeds, setTotalFeeds] = useState(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(null);
    const [error, setError] = useState(null);

    const getFeeds = useCallback(async () => {
        try {
            setError(null);
            setLoading(true);
            const res = await api.get("/feeds", {
                params: {
                    page,
                    pageSize: 12
                }
            });

            if (res.status === 200) {
                setFeeds(res.data);
                setTotalFeeds(res.headers["x-total-count"]);
            }
        } catch (error) {
            console.log(error.response);
            setError("Error" + error)
        } finally {
            setLoading(false);
        }
    }, []);

    return (
        <FeedContext.Provider value={{ feeds, totalFeeds, loading, getFeeds }}>
            {children}
        </FeedContext.Provider>
    )
}

function useFeed() {
    const context = useContext(FeedContext);

    if (!context) throw new Error('useFeed must be used within an FeedProvider');

    return context;
}

export { FeedProvider, useFeed };