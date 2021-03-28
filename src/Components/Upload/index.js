import React, { useState, useRef, useCallback } from 'react';
import { useUpload } from '../../hooks/upload';

import {
    Container,
    ImagePreview,
    MessagePreview,
    Body,
    Button
} from './styles';

const Upload = () => {
    const inputFile = useRef(null);
    const inputBody = useRef(null);

    const { loading, error, uploadPhotoAction, resetValues } = useUpload();

    const [image, setImage] = useState('');
    const [body, setBody] = useState('');
    const [disabled, setDisabled] = useState(true);

    const handlerUpload = useCallback((e) => {
        e.preventDefault();

        const dataImage = {
            file: inputFile.current.files[0],
            body
        };

        setDisabled(true);
        uploadPhotoAction(dataImage);
    }, [body, uploadPhotoAction]);

    const handleInputFile = useCallback((file) => {
        resetValues();

        if (file.target.files[0]) {
            setImage(URL.createObjectURL(file.target.files[0]));
            setDisabled(false);
        } else {
            setImage('');
        }

        inputBody.current.focus();
    }, [resetValues]);

    const handleBody = useCallback((e) => {
        setBody(e.target.value);
    }, []);

    return (
        <Container onSubmit={handlerUpload} enctype="multipart/form-data">
            {image ? (
                <ImagePreview
                    src={image}
                    title="image preview"
                    onClick={() => inputFile.current.click()}
                />
            ) : (
                <MessagePreview onClick={() => inputFile.current.click()} >
                    Select your photo
                </MessagePreview>
            )}

            <input
                ref={inputFile}
                type="file"
                onChange={handleInputFile}
                accept="image/*"
                style={{ display: 'none' }}
            />

            <Body
                placeholder="Insert the description"
                value={body}
                onChange={handleBody}
                ref={inputBody}
            ></Body>

            <Button type="submit" disabled={disabled} error={error} >
                {loading ? "Loading..." : error ? "Image size not allowed" : "Publish"}
            </Button>
        </Container>
    );
}

export default React.memo(Upload);