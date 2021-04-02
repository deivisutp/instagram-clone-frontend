import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { Link, useParams } from 'react-router-dom';

import Layout from '../Layout';
import avatar from '../../assets/avatar.png';

import {
    Container,
    DescriptionContainer,
    ImageProfile,
    Username,
    Button,
    ButtonFollow,
    CountsContainer,
    Description,
    ContainerPhotos,
    Photo
} from './styles';
import api from '../../services/api';
import { useFeed } from '../../hooks/feed';

const Profile = () => {

    const { username } = useParams();

    const { deleteFollowAction } = useFeed();

    const [loading, setLoading] = useState(false);

    const [user, setUser] = useState(null);
    const [photos, setPhotos] = useState([]);
    const [isFollow, setIsFollow] = useState(false);
    const [isProfile, setIsProfile] = useState(false);
    const [count, setCount] = useState(null);

    useEffect(() => {
        async function getProfile() {
            const res = await api.get(`/users/${username}`, {
                params: {
                    page: 0,
                    pageSize: 12,
                }
            });

            const {
                isFollow: isfollowing,
                isProfile: isprofile,
                count_follows,
                count_followers,
                count_photos,
                user: userpayload } = res.data;

            setIsFollow(isfollowing);
            setIsProfile(isprofile);
            setCount({
                count_followers,
                count_follows,
                count_photos,
            });
            setUser(userpayload);
            setPhotos(userpayload.photoUploads);
        }

        getProfile();
    }, [username]);

    const loadingMemo = useMemo(() => {
        return user && user.id ? false : true;
    }, [user]);

    const handleFollowButton = useCallback(async (id) => {
        try {
            setLoading(true);
            deleteFollowAction(id);
            setIsFollow(!isFollow);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }, [deleteFollowAction, isFollow]);

    if (loadingMemo) {
        return <p>Loading...</p>
    }

    return (
        <Layout>
            <Container>
                <DescriptionContainer>
                    <ImageProfile
                        src={user.avatar_url || avatar}
                        alt={user.name}
                    />

                    <div>
                        <Username>{user.username}</Username>

                        {isProfile ? (
                            <Button>Edit profile</Button>
                        ) : isFollow ? (
                            <ButtonFollow
                                onClick={() => handleFollowButton(user.id)}
                                disabled={loading ? true : false}
                            >
                                {loading ? "Loading..." : "Following"}
                            </ButtonFollow>
                        ) : (
                            <ButtonFollow
                                onClick={() => handleFollowButton(user.id)}
                                disabled={loading ? true : false}
                            >
                                {loading ? "Loading..." : "Follow"}
                            </ButtonFollow>
                        )}

                        <CountsContainer>
                            <span>{count.count_photos} Posts</span>
                            <span>{count.count_followers} Followers</span>
                            <span>{count.count_follows} Following</span>
                        </CountsContainer>
                    </div>

                    <Description>
                        <p>{user.name}</p>
                        <span>{user.bio}</span>
                    </Description>
                </DescriptionContainer>

                <ContainerPhotos>
                    {photos.length > 0 && photos.map((photo) => (
                        <Link key={photo.id} to={`/photo/${photo.id}`}>
                            <Photo src={photo.photo_url} alt={photo.body} />
                        </Link>
                    ))}
                </ContainerPhotos>
            </Container>
        </Layout>
    );
}

export default Profile;