import React, { useEffect } from "react";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { EquirectangularReflectionMapping, LoadingManager, Mesh, MeshStandardMaterial, RepeatWrapping, Scene, TextureLoader } from "three";

export function Car({ color }) {
  const gltf = useLoader(
    GLTFLoader,
    process.env.PUBLIC_URL + "models/car/scene.gltf"
  );
  const scene = new Scene()

  useEffect(() => {
    gltf.scene.scale.set(2, 2, 2);
    gltf.scene.position.set(0, -0.335, 0);
    const newMaterial = new MeshStandardMaterial({ color: color });
    gltf.scene.traverse((object) => {
      console.log(object.name)
      if (object.name === 'Object_5') {
        object.material = newMaterial;
      }
      if (object.name === 'Object_25') {
        object.material = newMaterial;
      }
      if (object instanceof Mesh) {
        object.castShadow = true;
        object.receiveShadow = true;
        object.material.envMapIntensity = 20;
      }
    });
  }, [gltf, color]);

  return <primitive object={gltf.scene} />;
}
