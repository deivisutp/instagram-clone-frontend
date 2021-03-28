import React, { useEffect } from 'react';
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

const Main = () => {
    const { user } = useAuth();
    const { follows, loading, getFollows, removeFollow } = useFollow();

    useEffect(() => {
        getFollows();
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
                    <p>Feed</p>
                </ContainerFeeds>
            </Container>
        </Layout>
    );
}

export default Main;