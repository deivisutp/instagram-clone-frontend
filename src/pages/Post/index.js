import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';

import Profile from '../../Components/Profile';
import api from '../../services/api';

import { FaHeart } from 'react-icons/fa';
import { FiHeart } from 'react-icons/fi';

import { toast } from 'react-toastify';

import TimeAgo from 'react-timeago';
import englishString from 'react-timeago/lib/language-strings/en';
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter';

import Layout from '../Layout';

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

    const toggleLike = useCallback(async (photo_id) => {
        const res = await api.post(`/likes/${photo_id}`);

        if (res.status === 200) {
            setIsLiked(!isLiked);
        } else {
            toast.error("It was not possible to change it");
        }
    }, [isLiked]);

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
                            {isLiked ? (
                                <FaHeart
                                    onClick={() => toggleLike(post.id)}
                                    size={20}
                                    style={{ color: "#FC4850", marginRight: 10, cursor: 'pointer' }}
                                />
                            ) : (
                                <FiHeart
                                    onClick={() => toggleLike(post.id)}
                                    size={20}
                                    style={{ marginRight: 10, cursor: 'pointer' }}
                                />
                            )}
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