/** Design reminder: sections should feel like calm editorial chapters with deliberate vertical rhythm. */
'use client';

import styled from 'styled-components';

const Section = styled.section<{ $soft?: boolean }>`
  padding-block: clamp(3rem, 8vw, 6rem);
  background: ${({ theme, $soft }) => ($soft ? theme.colors.surface : 'transparent')};
`;

export default Section;
