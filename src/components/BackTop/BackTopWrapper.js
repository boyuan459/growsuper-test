import styled from 'styled-components';

const BackTopWrapper = styled.div`
    position: fixed;
    right: 30px;
    bottom: 50px;
    width: 45px;
    height: 45px;
    padding: 7px;
    border-radius: 5px;
    background: rgb(75, 75, 75, 0.7);
    display: ${props => props['show'] ? 'block' : 'none'};
    transition: all 1s;
    cursor: pointer;
    z-index: 999;
`;

export default BackTopWrapper;
