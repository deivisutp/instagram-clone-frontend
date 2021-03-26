import React, { useRef, useCallback } from 'react';
import { Link, useHistory } from 'react-router-dom';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

import getValidationErrors from '../../util/getValidationErrors';

import logo from '../../assets/logo.svg';
import Input from '../../Components/Input';

import {
    Container,
    FormContainer,
    Form,
    Footer
} from './styles';
import { useAuth } from '../../hooks/auth';

const SignIn = () => {
    const history = useHistory();
    const formRef = useRef(null);

    const { signIn } = useAuth();

    const handleSubmit = useCallback(async (data) => {
        try {
            formRef.current.setErrors({});

            const schema = Yup.object().shape({
                username: Yup.string().required("Username is mandatory"),
                password: Yup.string().required("Password is mandatory"),
            });

            await schema.validate(data, { abortEarly: false });

            const { username, password } = data;

            signIn(username, password);

            history.push('/');

        } catch (error) {
            if (error instanceof Yup.ValidationError) {
                const errors = getValidationErrors(error);

                formRef.current.setErrors(errors);
                return;
            }

            toast.error(error.response.data.message);
        }
    }, [history, signIn]);

    return (
        <Container>
            <FormContainer>
                <Form ref={formRef} onSubmit={handleSubmit}>
                    <img src={logo} alt="photogram" />
                    <span>Login to share your moments with your friends</span>

                    <hr />

                    <Input name="username" placeholder="Inform an username" />
                    <Input type="password" name="password" placeholder="Inform a password" />

                    <button type="submit">Signin</button>

                    <hr />

                    <span className="footer">
                        Share your best moments with your friends.
                    </span>
                </Form>

                <Footer>
                    <p>
                        If you don't have an account <Link to="signup">Sign Up</Link>
                    </p>
                </Footer>
            </FormContainer>
        </Container>
    );
}

export default SignIn;