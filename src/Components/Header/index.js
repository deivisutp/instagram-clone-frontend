import React, { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaUser, FaSignOutAlt } from 'react-icons/fa';
import { useAuth } from '../../hooks/auth';

import SearchContainer from '../Search';

import logo from '../../assets/logo.svg';
import {
    Nav,
    Container,
    Img,
    ContainerSearch,
    Input,
    ContainerOptions
} from './styles';
import ModalUploadPhoto from '../Modal/ModalUploadPhoto';

const Header = () => {
    const { user, signOut } = useAuth();
    const [term, setTerm] = useState('');

    const handleSearch = useCallback(() => {

    }, []);

    return (
        <Nav>
            <Container>
                <Link to="/">
                    <Img src={logo} alt="logo" />
                </Link>


                <ContainerSearch>
                    <FaSearch color="#ccc" size={15} />
                    <Input placeholder="Search" value={term} onChange={(e) => setTerm(e.target.value)} />

                    {term.length > 0 && <SearchContainer />}
                </ContainerSearch>

                <ContainerOptions>
                    <ModalUploadPhoto />
                    <Link to={`/profile${user ? user.username : ''}`} style={{ marginLeft: '10px' }}>
                        <FaUser color="#222" size={25} />
                    </Link>

                    <FaSignOutAlt color="#222" size={25} onClick={signOut} />
                </ContainerOptions>
            </Container>
        </Nav>
    );
}

export default Header;