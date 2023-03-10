import React, { useEffect } from "react";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Mesh, MeshStandardMaterial, } from "three";

export default function Motorbike({ color }) {
  const gltf = useLoader(
    GLTFLoader,
    process.env.PUBLIC_URL + "models/motorbike/scene.gltf"
  );

  useEffect(() => {
    gltf.scene.scale.set(2.3, 2.3, 2.3);
    gltf.scene.position.set(0, -0.335, -2);
    const newMaterial = new MeshStandardMaterial({ color: color });
    gltf.scene.traverse((object) => {
      console.log(object.name)
      if (object.name === 'transform177') {
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
