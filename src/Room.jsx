import React, { useEffect } from "react";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Mesh } from "three";

export default function Room() {
    const gltf = useLoader(
        GLTFLoader,
        process.env.PUBLIC_URL + "models/room/scene.gltf"
    );

    useEffect(() => {
        gltf.scene.scale.set(1.5, 2, 1);
        gltf.scene.position.set(0, -0.335, 0);
        gltf.scene.traverse((object) => {
            if (object instanceof Mesh) {
                object.castShadow = true;
                object.receiveShadow = true;
                object.material.envMapIntensity = 0;
            }
        });
    }, [gltf]);

    return <primitive object={gltf.scene} />;
}
