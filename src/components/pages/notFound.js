import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const NF = styled.div`
color: white;
text-align: center;
`;

const H = styled.h1`
color: white;
text-align: center;
`;

const ToggleButton = styled.button`
    font-size: 2em;
    margin-bottom: 2em;
    background-color: darkgrey;
    padding: 0.25em 1em;
    border-radius: 3px;
`;



const NotFound = () => (
  <NF>
    <H>404 - Not found!</H>
    <Link to="/">
     <ToggleButton>Go Home</ToggleButton> 
    </Link>
  </NF>
);

export default NotFound;