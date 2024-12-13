import * as THREE from 'three';

export const createGroundTextures = async () => {
  return new Promise<{ baseTexture: THREE.Texture; normalMap: THREE.Texture }>(async (resolve, reject) => {
    try {
      const textureLoader = new THREE.TextureLoader();
      
      console.log('Loading base texture...');
      const baseTexture = await new Promise<THREE.Texture>((resolve, reject) => {
        textureLoader.load(
          '/Textura01.jpg',
          (texture) => {
            texture.encoding = THREE.sRGBEncoding;
            texture.flipY = false;
            texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
            texture.repeat.set(2, 2);
            console.log('Base texture loaded successfully');
            resolve(texture);
          },
          undefined,
          (error) => reject(new Error(`Failed to load base texture: ${error.message}`))
        );
      });

      console.log('Loading BTC logo...');
      const btcLogo = await new Promise<THREE.Texture>((resolve, reject) => {
        textureLoader.load(
          '/bitcoin-btc-logo.png',
          (texture) => {
            texture.encoding = THREE.sRGBEncoding;
            texture.flipY = false;
            console.log('BTC logo loaded successfully');
            resolve(texture);
          },
          undefined,
          (error) => reject(new Error(`Failed to load BTC logo: ${error.message}`))
        );
      });

      console.log('Creating combined texture...');
      const canvas = document.createElement('canvas');
      canvas.width = 2048; 
      canvas.height = 2048;
      const ctx = canvas.getContext('2d');
      
      if (!ctx) {
        throw new Error('Failed to get canvas context');
      }

      if (!baseTexture.image) {
        throw new Error('Base texture image is not loaded');
      }

      ctx.drawImage(baseTexture.image, 0, 0, canvas.width, canvas.height);

      if (!btcLogo.image) {
        throw new Error('BTC logo image is not loaded');
      }

      const logoSize = canvas.width / 2; 
      const x = (canvas.width - logoSize) / 2;
      const y = (canvas.height - logoSize) / 2;
      ctx.globalAlpha = 0.7;
      ctx.drawImage(btcLogo.image, x, y, logoSize, logoSize);
      ctx.globalAlpha = 1.0;

      console.log('Creating final textures...');
      const combinedTexture = new THREE.CanvasTexture(canvas);
      combinedTexture.encoding = THREE.sRGBEncoding;
      combinedTexture.wrapS = combinedTexture.wrapT = THREE.RepeatWrapping;
      combinedTexture.repeat.set(2, 2);
      combinedTexture.needsUpdate = true;
      combinedTexture.flipY = false;
      combinedTexture.minFilter = THREE.LinearMipmapLinearFilter;
      combinedTexture.magFilter = THREE.LinearFilter;
      combinedTexture.generateMipmaps = true;

      const normalMap = await new Promise<THREE.Texture>((resolve, reject) => {
        textureLoader.load(
          '/Textura01.jpg',
          (texture) => {
            texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
            texture.repeat.set(2, 2);
            texture.encoding = THREE.LinearEncoding;
            texture.flipY = false;
            console.log('Normal map loaded successfully');
            resolve(texture);
          },
          undefined,
          (error) => reject(new Error(`Failed to load normal map: ${error.message}`))
        );
      });

      console.log('All textures created successfully');
      resolve({
        baseTexture: combinedTexture,
        normalMap: normalMap
      });
    } catch (error) {
      console.error('Error in createGroundTextures:', error);
      reject(error);
    }
  });
};

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

  ctx.fillStyle = backgroundColor;
  ctx.fillRect(0, 0, size, size);

  ctx.strokeStyle = lineColor;
  ctx.lineWidth = 1;

  for (let i = 0; i <= size; i += gridSize) {
    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.lineTo(i, size);
    ctx.globalAlpha = 0.3;
    ctx.stroke();
  }

  for (let i = 0; i <= size; i += gridSize) {
    ctx.beginPath();
    ctx.moveTo(0, i);
    ctx.lineTo(size, i);
    ctx.globalAlpha = 0.3;
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

  ctx.fillStyle = 'rgb(128, 128, 255)';
  ctx.fillRect(0, 0, size, size);

  const numSquares = size / gridSize;
  
  for (let i = 0; i <= numSquares; i++) {
    ctx.fillStyle = 'rgb(140, 140, 255)';
    ctx.fillRect(i * gridSize - 1, 0, 2, size);
    
    ctx.fillRect(0, i * gridSize - 1, size, 2);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  return texture;
};