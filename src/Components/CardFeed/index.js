import React, { useCallback, useState } from 'react';
import { FaComment, FaHeart } from 'react-icons/fa';
import { FiHeart } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import ModalMoreOptions from '../Modal/ModalMoreOptions';
import Profile from '../Profile';

import {
    Card,
    CardControls,
    CardHeader,
    ContainerPhoto,
    PhotoCard
} from './styles';

const CardFeed = ({ feed }) => {

    const { isAuthor, isLiked, photo } = feed;
    const [like, setLike] = useState(isLiked);

    const toggleLike = useCallback((photo_id) => {
        setLike(!like);
    }, [like]);

    return (
        <Card>
            <CardHeader>
                <Profile
                    direction="row"
                    img={photo.uploadedBy.avatar_url}
                    username={photo.uploadedBy.username}
                />

                <ModalMoreOptions
                    isAuthor={isAuthor || false}
                    photo={photo}
                />
            </CardHeader>

            <ContainerPhoto>
                <PhotoCard src={photo.photo_url} alt={photo.photo_url} />
            </ContainerPhoto>

            <CardControls>
                {like ? (
                    <FaHeart
                        onClick={() => toggleLike(photo.id)}
                        size={20}
                        style={{ color: "#FC4850", marginRight: 10 }}
                    />
                ) : (
                    <FiHeart
                        onClick={() => toggleLike(photo.id)}
                        size={20}
                        style={{ marginRight: 10 }}
                    />
                )}

                <Link to={`/photo/${photo.id}`}>
                    <FaComment size={20} color="#2c2c2c" />
                </Link>

            </CardControls>
        </Card>
    );
}

export default React.memo(CardFeed);