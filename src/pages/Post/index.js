import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import Profile from '../../Components/Profile';
import api from '../../services/api';

import {
    Container,
    ContainerPhoto,
    Img,
    ContainerPost,
    HeaderPost
} from './styles';

const Post = ({ post }) => {

    const { photo_id } = useParams();

    useEffect(() => {
        async function getPost() {
            const res = await api.get(`/photos/${photo_id}`);

            // if (res.status === 200)
        }
    }, []);

    return (
        <Container>
            <ContainerPhoto>
                <Img src={Post.photo.photo_url} alt={post.photo.body} />
            </ContainerPhoto>

            <ContainerPost>
                <HeaderPost>
                    <Profile
                        img={post.photo.uploadedBy.avatar_url}
                        username={post.photo.uploadedBy.username}
                    />
                </HeaderPost>
            </ContainerPost>
        </Container>
    );
}

export default Post;