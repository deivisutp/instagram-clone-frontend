import React, { useState, useCallback, useEffect } from 'react';
import { FiUpload } from 'react-icons/fi';

import { StyledModal } from './styles';

import Upload from '../Upload';
import { useUpload } from '../../hooks/upload';

const ModalUploadPhoto = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [opacity, setOpacity] = useState(0);

    const { data, resetValues } = useUpload();

    function toggleModal(e) {
        setIsOpen(!isOpen);
    }

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

    useEffect(() => {
        if (data) {
            toggleModal();
            //addFeed(data);
            resetValues();
        }
    }, [data, resetValues, toggleModal]);

    return (
        <>
            <FiUpload size={25} onClick={toggleModal} />

            <StyledModal
                isOpen={isOpen}
                afterOpen={afterOpen}
                beforeClose={beforeClose}
                onEscapeKeydown={toggleModal}
                opacity={opacity}
                backgroundProps={{ opacity }}
            >
                <Upload />
            </StyledModal>
        </>
    );
}

export default ModalUploadPhoto;