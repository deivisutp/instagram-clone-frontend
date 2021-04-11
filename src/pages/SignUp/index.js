import React, { useRef, useCallback } from 'react';
import { Link, useHistory } from 'react-router-dom';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

import api from '../../services/api';

import getValidationErrors from '../../util/getValidationErrors';

import gif from '../../assets/mobilegif.gif';
import logo from '../../assets/logo.svg';
import Input from '../../Components/Input';

import {
    Container,
    Gif,
    FormContainer,
    Form,
    Footer
} from './styles';

const SignUp = () => {
    const history = useHistory();
    const formRef = useRef(null);

    const handleSubmit = useCallback(async (data) => {
        try {
            formRef.current.setErrors({});

            const schema = Yup.object().shape({
                name: Yup.string().required("Name is mandatory"),
                email: Yup.string().required("E-mail is mandatory").email("E-mail invalid"),
                username: Yup.string().required("Username is mandatory"),
                password: Yup.string().required("Password is mandatory").min(6, "The password must have more than 5 digits"),
            });

            await schema.validate(data, { abortEarly: false });

            await api.post('/users', data);

            toast.success('Successfull registered!');

            history.push('/signin');

        } catch (error) {
            if (error instanceof Yup.ValidationError) {
                const errors = getValidationErrors(error);

                formRef.current.setErrors(errors);
                return;
            }

            toast.error(error);
        }
    }, [history]);

    return (
        <Container>
            <Gif src={gif} alt="gif" />

            <FormContainer>
                <Form ref={formRef} onSubmit={handleSubmit}>
                    <img src={logo} alt="photogram" />
                    <span>Register to share foto and videos with your friends</span>

                    <hr />

                    <Input name="name" placeholder="Insert your full name" />
                    <Input name="email" placeholder="Insert your e-mail" />
                    <Input name="username" placeholder="Inform an username" />
                    <Input type="password" name="password" placeholder="Inform a password" />

                    <button type="submit">Register</button>

                    <hr />

                    <span className="footer">
                        To register, please acept our conditions, data and cookies policy
                    </span>
                </Form>

                <Footer>
                    <p>
                        If you have an account <Link to="signin">Sign In</Link>
                    </p>
                </Footer>
            </FormContainer>
        </Container>
    );
}

export default SignUp;