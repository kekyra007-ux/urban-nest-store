/** Design reminder: form controls should feel soft, spacious, and quietly high-end. */
'use client';

import styled from 'styled-components';

const Input = styled.input`
  width: 100%;
  min-height: 52px;
  border-radius: ${({ theme }) => theme.radii.pill};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: rgba(255, 250, 244, 0.92);
  padding: 0 1rem;
  color: ${({ theme }) => theme.colors.text};
  transition: border-color 180ms ease, box-shadow 180ms ease;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.accent};
    box-shadow: 0 0 0 4px rgba(85, 107, 93, 0.12);
  }
`;

export default Input;
