import * as THREE from 'three';

const createCheckerboardTexture = (
  size: number = 512,
  gridSize: number = 32,
  backgroundColor: string = '#303030',
  lineColor: string = '#ffffff'
): THREE.Texture => {
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d')!;

  // Szürke háttér
  ctx.fillStyle = backgroundColor;
  ctx.fillRect(0, 0, size, size);

  // Fehér vonalak rajzolása
  ctx.strokeStyle = lineColor;
  ctx.lineWidth = 1;

  // Függőleges vonalak
  for (let i = 0; i <= size; i += gridSize) {
    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.lineTo(i, size);
    ctx.globalAlpha = 0.3; // Átlátszóság a vonalaknak
    ctx.stroke();
  }

  // Vízszintes vonalak
  for (let i = 0; i <= size; i += gridSize) {
    ctx.beginPath();
    ctx.moveTo(0, i);
    ctx.lineTo(size, i);
    ctx.globalAlpha = 0.3; // Átlátszóság a vonalaknak
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
  const textureLoader = new THREE.TextureLoader();
  
  const baseTexture = textureLoader.load('/Textura01.jpg');
  const normalMap = textureLoader.load('/Textura01.jpg');

  // Textúra ismétlés beállítása
  baseTexture.wrapS = baseTexture.wrapT = THREE.RepeatWrapping;
  normalMap.wrapS = normalMap.wrapT = THREE.RepeatWrapping;
  
  // Textúra ismétlések száma
  baseTexture.repeat.set(4, 4);
  normalMap.repeat.set(4, 4);

  // Textúra minőségi beállítások
  baseTexture.magFilter = THREE.LinearFilter;
  baseTexture.minFilter = THREE.LinearMipmapLinearFilter;
  normalMap.magFilter = THREE.LinearFilter;
  normalMap.minFilter = THREE.LinearMipmapLinearFilter;

  return {
    baseTexture,
    normalMap,
  };
};