import React from 'react';
import styled, { keyframes } from 'styled-components';
import { useWindowSize } from '../../utils/useWindowSize';

function Orb() {
    const { width, height } = useWindowSize();

    return <OrbStyled width={width} height={height} />;
}

// ✅ Move keyframes outside the component
const moveOrb = (width, height) => keyframes`
  0% {
    transform: translate(0, 0);
  }
  50% {
    transform: translate(${width}px, ${height / 2}px);
  }
  100% {
    transform: translate(0, 0);
  }
`;

// ✅ Styled component outside with dynamic props
const OrbStyled = styled.div`
  width: 70vh;
  height: 70vh;
  position: absolute;
  border-radius: 50%;
  margin-left: -37vh;
  margin-top: -37vh;
  background: linear-gradient(180deg, #F56692 0%, #F2994A 100%);
  filter: blur(230px);
  animation: ${({ width, height }) => moveOrb(width, height)} 12s alternate linear infinite;
`;

export default Orb;
