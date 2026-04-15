/** Design reminder: containers should privilege breathing room and editorial alignment over cramped grids. */
'use client';

import styled from 'styled-components';

const Container = styled.div`
  width: min(100%, 1200px);
  margin: 0 auto;
  padding-inline: clamp(1rem, 2vw, 2rem);
`;

export default Container;
