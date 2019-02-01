import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
    box-shadow: -3px 3px 8px 0 #c3c3c3;
    border-radius: 2px;
    padding: 16px;
`;

const Image = styled.img`
    border-radius: 50%;
`;

const Info = () => (
    <Wrapper>
        <h1>Check out my GH profile</h1>
        <a href="https://github.com/kasanielaski">
            <Image
                src="https://avatars3.githubusercontent.com/u/17852363?s=460&v=4"
                alt="gh profile"
            />
        </a>
    </Wrapper>
);

export default Info;
