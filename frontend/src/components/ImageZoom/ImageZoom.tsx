import { MouseEvent, useRef, useState } from 'react';
import styles from './ImageZoom.module.css';

interface ImageZoomProps {
  src: string;
  alt?: string;
  imageContainerClassName?: string;
  imageClassName?: string;
  magnifyClassName?: string;
  zoom?: number;
}

export default function ImageZoom({ src, alt, imageContainerClassName, imageClassName, magnifyClassName, zoom }: ImageZoomProps) {
  const [showMagnifier, setShowMagnifier] = useState(false);
  const [backgroundPosition, setBackgroundPosition] = useState({ x: 0, y: 0 });
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (event: MouseEvent) => {
    const target = event.target as HTMLDivElement;
    const { left, top, width, height } = target.getBoundingClientRect();

    const backgroundPositionX = ((event.pageX - left - window.scrollX) / width) * 100;
    const backgroundPositionY = ((event.pageY - top - window.scrollY) / height) * 100;

    const cursorX = event.pageX - left - window.scrollX;
    const cursorY = event.pageY - top - window.scrollY;

    setBackgroundPosition({ x: backgroundPositionX, y: backgroundPositionY });
    setCursorPosition({ x: cursorX, y: cursorY });
  };

  let magnifierHeightSize = 100;
  let magnifierWidthSize = 100;

  const magnifierRef = useRef<HTMLDivElement>(null);
  if (magnifierRef.current) {
    const { height, width } = getComputedStyle(magnifierRef.current);
    magnifierHeightSize = parseInt(height);
    magnifierWidthSize = parseInt(width);
  }

  return (
    <section
      className={imageContainerClassName}
      onMouseEnter={() => setShowMagnifier(true)}
      onMouseLeave={() => setShowMagnifier(false)}
      onMouseMove={handleMouseMove}
      style={{ position: 'relative' }}
    >
      <img src={src} alt={alt} className={imageClassName} />
      {showMagnifier && (
        <div
          className={magnifyClassName ? magnifyClassName : styles.magnifier}
          ref={magnifierRef}
          style={{
            top: `${cursorPosition.y - (magnifierHeightSize / 2)}px`,
            left: `${cursorPosition.x - (magnifierWidthSize / 2)}px`,
            backgroundPosition: `${backgroundPosition.x}% ${backgroundPosition.y}%`,
            backgroundImage: `url(${src})`,
            backgroundSize: `${zoom ? zoom * 1000 : 1000}%`,
            position: 'absolute',
            pointerEvents: 'none',
          }}
        />
      )}
    </section>
  );
}
