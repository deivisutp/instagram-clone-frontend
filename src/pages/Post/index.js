import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import Profile from '../../Components/Profile';
import api from '../../services/api';

import TimeAgo from 'react-timeago';
import englishString from 'react-timeago/lib/language-strings/en';
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter';

import Layout from '../Layout';

import avatar from '../../assets/avatar.png';

import {
    Container,
    ContainerPhoto,
    Img,
    ContainerPost,
    HeaderPost,
    ContainerComments,
    TimeAgo as TimeStyle,
    ContainerOptions,
    ContainerComment
} from './styles';

const formatter = buildFormatter(englishString);

const Post = () => {

    const { photo_id } = useParams();
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]);
    const [isLiked, setIsLiked] = useState(false);
    const [isAuthor, setIsAuthor] = useState(false);

    useEffect(() => {
        async function getPost() {
            const res = await api.get(`/photos/${photo_id}`);

            if (res.status === 200) {
                const { isAuthor, isLiked, photo } = res.data;

                setPost(photo);
                setComments(photo.getComments);
                setIsLiked(isLiked);
                setIsAuthor(isAuthor);
            }
        }
        getPost();
    }, [photo_id]);

    if (!post) {
        return (
            <Container>
                <p>Loading...</p>
            </Container>
        );
    } else {
        return (
            <Layout>
                <Container>
                    <ContainerPhoto>
                        <Img src={post.photo_url} alt={post.body} />
                    </ContainerPhoto>

                    <ContainerPost>
                        <HeaderPost>
                            <Profile
                                img={post.uploadedBy.avatar_url}
                                username={post.uploadedBy.username}
                            />

                            <p>{post.body}</p>
                        </HeaderPost>

                        <ContainerComments>
                            {comments.length > 0 ? comments.map((comment) => (
                                <div key={comment.id} style={{ marginBottom: "10px" }}>
                                    <Profile
                                        img={comment.postedBy.avatar_url}
                                        username={comment.postedBy.username}
                                    />

                                    <p style={{ marginBottom: "5px 0" }}>{comment.body}</p>

                                    <TimeStyle>
                                        <TimeAgo
                                            date={`${comment.createdAt}`}
                                            formatter={formatter}
                                        />
                                    </TimeStyle>
                                </div>
                            )) : (
                                <p>Without comments</p>
                            )}
                        </ContainerComments>

                        <ContainerOptions>
                            <span>{post.LikesCount} Likes</span>
                            <div>Like button</div>
                        </ContainerOptions>

                        <ContainerComment>
                            Comment button
                        </ContainerComment>
                    </ContainerPost>
                </Container>
            </Layout>
        );
    }
}

export default Post;