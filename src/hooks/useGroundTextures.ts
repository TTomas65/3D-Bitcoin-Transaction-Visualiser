import { useState, useEffect } from 'react';
import * as THREE from 'three';
import { createGroundTextures } from '../utils/textureUtils';

interface GroundTextures {
  baseTexture: THREE.Texture | null;
  normalMap: THREE.Texture | null;
}

export function useGroundTextures() {
  const [textures, setTextures] = useState<GroundTextures>({
    baseTexture: null,
    normalMap: null,
  });

  useEffect(() => {
    const { baseTexture, normalMap } = createGroundTextures();
    
    // Set texture repeat for tiling effect
    [baseTexture, normalMap].forEach(texture => {
      texture.repeat.set(4, 4);
      texture.needsUpdate = true;
      // Enable mipmapping for better texture quality at angles
      texture.minFilter = THREE.LinearMipMapLinearFilter;
      texture.magFilter = THREE.LinearFilter;
      // Ensure proper texture wrapping
      texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    });

    setTextures({
      baseTexture,
      normalMap,
    });

    return () => {
      baseTexture.dispose();
      normalMap.dispose();
    };
  }, []);

  return textures;
}