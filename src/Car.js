import React, { useEffect } from "react";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { EquirectangularReflectionMapping, LoadingManager, Mesh, MeshStandardMaterial, RepeatWrapping, Scene, TextureLoader } from "three";

export function Car() {
  const gltf = useLoader(
    GLTFLoader,
    process.env.PUBLIC_URL + "models/car/scene.gltf"
  );
  const scene = new Scene()
  
  useEffect(() => {
    gltf.scene.scale.set(1, 1, 1);
    gltf.scene.position.set(0, -0.035, 0);
    const newMaterial = new MeshStandardMaterial({ color: 0xff0000 });
    gltf.scene.traverse((object) => {
      if (object.name === 'Object_28') {
        object.material = newMaterial;
      }
      if (object instanceof Mesh) {
        object.castShadow = true;
        object.receiveShadow = true;
        object.material.envMapIntensity = 20;
      }
    });
  }, [gltf]);

  return <primitive object={gltf.scene} />;
}
