/** Design reminder: galleries should feel expansive and tactile, like a digital showroom spread. */
'use client';

import Image from 'next/image';
import { useState } from 'react';
import styled from 'styled-components';

const Wrap = styled.div`
  display: grid;
  gap: 1rem;
`;

const Primary = styled.div`
  position: relative;
  overflow: hidden;
  border-radius: ${({ theme }) => theme.radii.lg};
  min-height: 420px;
  background: ${({ theme }) => theme.colors.surface};
`;

const Thumbs = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 0.75rem;
`;

const Thumb = styled.button<{ $active: boolean }>`
  position: relative;
  overflow: hidden;
  border-radius: ${({ theme }) => theme.radii.md};
  border: 1px solid ${({ theme, $active }) => ($active ? theme.colors.text : theme.colors.border)};
  min-height: 88px;
  background: ${({ theme }) => theme.colors.surface};
`;

export default function ProductGallery({ images, title }: { images: string[]; title: string }) {
  const [activeImage, setActiveImage] = useState(images[0]);

  return (
    <Wrap>
      <Primary>
        <Image src={activeImage} alt={title} fill style={{ objectFit: 'cover' }} sizes="(max-width: 768px) 100vw, 50vw" />
      </Primary>
      <Thumbs>
        {images.map((image) => (
          <Thumb key={image} $active={image === activeImage} onClick={() => setActiveImage(image)}>
            <Image src={image} alt={title} fill style={{ objectFit: 'cover' }} sizes="120px" />
          </Thumb>
        ))}
      </Thumbs>
    </Wrap>
  );
}
