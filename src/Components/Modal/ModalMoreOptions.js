import React, { useState, useCallback } from 'react';
import { FiMoreHorizontal } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useFeed } from '../../hooks/feed';
import { useFollow } from '../../hooks/follow';

import { StyledModal, MoreOptions } from './styles';

const ModalMoreOptions = ({ isAuthor, photo }) => {

    const { deletePhotoAction, deleteFollowAction } = useFeed();
    const { removeFollow } = useFollow();

    const [isOpen, setIsOpen] = useState(false);
    const [opacity, setOpacity] = useState(0);

    const toggleModal = useCallback(() => {
        setIsOpen(!isOpen);
    }, [isOpen]);

    const beforeClose = useCallback(() => {
        return new Promise(resolve => {
            setOpacity(0);
            setTimeout(resolve, 200);
        });
    }, []);

    const afterOpen = useCallback(() => {
        setTimeout(() => {
            setOpacity(1);
        }, 100);
    }, []);

    const handleDelete = useCallback((photo) => {
        deletePhotoAction(photo);
        toggleModal();
    }, [toggleModal, deletePhotoAction]);

    const handleFollow = useCallback((idUser) => {
        deleteFollowAction(idUser);
        removeFollow(idUser);
        toggleModal();
    }, [deleteFollowAction, removeFollow, toggleModal]);

    return (
        <>
            <FiMoreHorizontal size={20} style={{ cursor: 'pointer' }} onClick={toggleModal} />
            <StyledModal
                isOpen={isOpen}
                afterOpen={afterOpen}
                beforeClose={beforeClose}
                onBackgroundClick={toggleModal}
                onEscapeKeydown={toggleModal}
                opacity={opacity}
                backgroundProps={{ opacity }}
            >
                {isAuthor ? (
                    <MoreOptions>
                        <li>Go to the post</li>
                        <li className="red" onClick={() => handleDelete(photo)}>Remove</li>
                        <li onClick={toggleModal}>Cancel</li>
                    </MoreOptions>
                ) : (
                    <MoreOptions>
                        <li>
                            <Link to={`/photo/${photo.id}`}>Go to the post</Link>
                        </li>
                        <li className="red" onClick={() => handleFollow(photo.user_id)}>Unfollow</li>
                        <li onClick={toggleModal}>Cancel</li>
                    </MoreOptions>
                )}
            </StyledModal>
        </>
    );
}

export default React.memo(ModalMoreOptions);