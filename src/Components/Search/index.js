import React from 'react';
import { useSearch } from '../../hooks/search';
import Profile from '../Profile';

import Spinner from '../Spinner';

import {
    Container,
    ContainerResult,
    ContainerProfile,
    ContainerEmpty
} from './styles';

const SearchContainer = ({ toggleClose }) => {
    const { loading, users } = useSearch();

    return (
        <Container>
            {loading ? (
                <Spinner style={{ marginTop: "10px" }} />
            ) : (
                <ContainerResult>
                    {users.length > 0 ? (
                        users.map((user) => (
                            <ContainerProfile key={user.id} onClick={toggleClose}>
                                <Profile
                                    direction="row"
                                    img={user.avatar_url}
                                    username={user.username}
                                    name={user.name}
                                />
                            </ContainerProfile>
                        ))
                    ) : (
                        <ContainerEmpty>
                            <p>Have no results</p>
                        </ContainerEmpty>
                    )}
                </ContainerResult>
            )}
        </Container>
    );
}

export default React.memo(SearchContainer);