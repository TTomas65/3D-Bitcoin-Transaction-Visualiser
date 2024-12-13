import * as THREE from 'three';

const createCheckerboardTexture = (
  size: number = 512,
  gridSize: number = 32,
  primaryColor: string = '#151515',
  secondaryColor: string = '#1a1a1a',
  lineColor: string = '#202020'
): THREE.Texture => {
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d')!;

  // Fill background
  ctx.fillStyle = primaryColor;
  ctx.fillRect(0, 0, size, size);

  // Draw checkerboard pattern
  const numSquares = size / gridSize;
  
  for (let i = 0; i < numSquares; i++) {
    for (let j = 0; j < numSquares; j++) {
      if ((i + j) % 2 === 0) {
        ctx.fillStyle = secondaryColor;
        ctx.fillRect(
          i * gridSize,
          j * gridSize,
          gridSize,
          gridSize
        );
      }
    }
  }

  // Draw grid lines
  ctx.strokeStyle = lineColor;
  ctx.lineWidth = 1;

  // Draw vertical lines
  for (let i = 0; i <= size; i += gridSize) {
    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.lineTo(i, size);
    ctx.stroke();
  }

  // Draw horizontal lines
  for (let i = 0; i <= size; i += gridSize) {
    ctx.beginPath();
    ctx.moveTo(0, i);
    ctx.lineTo(size, i);
    ctx.stroke();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  return texture;
};

const createCheckerboardNormalMap = (
  size: number = 512,
  gridSize: number = 32
): THREE.Texture => {
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d')!;

  // Fill with neutral normal
  ctx.fillStyle = 'rgb(128, 128, 255)';
  ctx.fillRect(0, 0, size, size);

  // Draw grid lines with slight elevation
  const numSquares = size / gridSize;
  
  for (let i = 0; i <= numSquares; i++) {
    // Vertical lines
    ctx.fillStyle = 'rgb(140, 140, 255)';
    ctx.fillRect(i * gridSize - 1, 0, 2, size);
    
    // Horizontal lines
    ctx.fillRect(0, i * gridSize - 1, size, 2);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  return texture;
};

export const createGroundTextures = () => {
  const baseTexture = createCheckerboardTexture();
  const normalMap = createCheckerboardNormalMap();

  return {
    baseTexture,
    normalMap,
  };
};