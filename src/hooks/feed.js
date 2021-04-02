import React, { createContext, useContext, useState, useCallback } from 'react';
import { toast } from 'react-toastify';
import api from '../services/api';

const FeedContext = createContext();

const FeedProvider = ({ children }) => {
    const [feeds, setFeeds] = useState([]);
    const [totalFeeds, setTotalFeeds] = useState(null);
    const [loading, setLoading] = useState(false);

    const getFeeds = useCallback(async (page = 0) => {
        try {
            setLoading(true);
            const res = await api.get("/feeds", {
                params: {
                    page,
                    pageSize: 12
                }
            });

            if (res.status === 200) {
                setFeeds((state) => [...state, ...res.data]);
                setTotalFeeds(res.headers["x-total-count"]);
            }
        } catch (error) {
            console.log(error.response);
        } finally {
            setLoading(false);
        }
    }, []);

    const deletePhotoAction = useCallback(async (photo) => {
        try {
            const res = await api.delete(`/photos/${photo.id}`, {
                params: { key: photo.key }
            });

            if (res.status === 200) {
                setFeeds((state) => state.filter((item) => item.photo.id !== photo.id));
            }
        } catch (error) {
            toast.error("Delete error");
        }
    }, []);

    const deleteFollowAction = useCallback(async (idUser) => {
        try {
            const res = await api.post(`/follows/${idUser}`);

            if (res.status === 200) {
                setFeeds((state) => state.filter((item) => item.photo.user_id !== idUser));
            }
        } catch (error) {
            toast.error("Unfollow error");
        }
    }, []);

    const addFeed = useCallback((data) => {
        setFeeds((state) => [data, ...state]);
    }, []);

    return (
        <FeedContext.Provider value={{ feeds, totalFeeds, loading, getFeeds, deletePhotoAction, deleteFollowAction, addFeed, setFeeds }}>
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