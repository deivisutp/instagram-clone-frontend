import React, { useEffect, useState } from 'react';
import Profile from '../../Components/Profile';
import Spinner from '../../Components/Spinner';
import EmptyMessage from '../../Components/EmptyMessage';
import { useAuth } from '../../hooks/auth';
import { useFollow } from '../../hooks/follow';

import Layout from '../Layout';

import {
    Aside,
    ContainerOwner,
    ContainerFollows,
    ContainerFooter,
    ContainerFeeds,
    Container
} from './styles';
import { useFeed } from '../../hooks/feed';
import CardFeed from '../../Components/CardFeed';

const Main = () => {
    const [page, setPage] = useState(0);
    const { user } = useAuth();
    const { follows, loading, getFollows } = useFollow();
    const { feeds, loading: feedLoading, totalFeeds, getFeeds } = useFeed();

    useEffect(() => {
        getFollows();
        getFeeds(page);
    }, []);

    return (
        <Layout>
            <Container>
                <Aside>
                    <ContainerOwner>
                        <Profile
                            img={user && user.avatar_url}
                            direction="column"
                            username={user && user.username}
                            isOwner
                            name={user && user.name}
                        />
                    </ContainerOwner>

                    <ContainerFollows>
                        {follows &&
                            follows.map(follow => (
                                <Profile
                                    key={follow.id}
                                    direction="column"
                                    img={follow.avatar_url}
                                    usidebar
                                    username={follow.username}
                                    name={follow.name}
                                />
                            ))}

                        {follows && follows.length === 0 && loading === false && (
                            <EmptyMessage message="You are not following anyone." />
                        )}

                        {loading && <Spinner />}
                    </ContainerFollows>

                    <ContainerFooter>
                        Information - Help - API - Job - Privacy - Conditions - Path -
                        Profiles - Hashtags - Language
                </ContainerFooter>
                </Aside>

                <ContainerFeeds>
                    {feeds &&
                        feeds.map(feed => <CardFeed key={feed.photo.id} feed={feed} />)}

                    {!!feeds && feeds.length > 0 && (
                        <button type="button">See more...</button>
                    )}

                    {feedLoading && (
                        <Spinner />
                    )}
                </ContainerFeeds>
            </Container>
        </Layout>
    );
}

export default Main;