import React from 'react'
import { Canvas } from "@react-three/fiber";
import { CubeCamera, Environment, OrbitControls, PerspectiveCamera, } from "@react-three/drei";

import Motorbike from "./Motorbike";
import Room from './Room'
import { useContext } from 'react';
import { AppContext } from './App';

export default function MainCanvas() {
    const { defaultColor } = useContext(AppContext)

    return (
        <Canvas className="sidebar">
            <OrbitControls
                target={[0, 0.35, 0]}
                maxPolarAngle={1.45}
            />
            <PerspectiveCamera makeDefault fov={50} position={[3, 2, 5]} />
            <Room />
            <CubeCamera resolution={256}>
                {(texture) => (
                    <>
                        <Environment map={texture} />
                        <Motorbike color={defaultColor} />
                    </>
                )}
            </CubeCamera>
        </Canvas>
    )
}