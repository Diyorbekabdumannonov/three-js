import React from 'react'
import { Canvas } from "@react-three/fiber";
import { EffectComposer, Bloom, ChromaticAberration, } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
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
            <spotLight
                color={[0, 0, 0]}
                intensity={0.5}
                angle={0.9}
                penumbra={0.5}
                position={[4, 4, 0]}
                castShadow
                shadow-bias={-0.0001}
            />
            <spotLight
                color={[0, 0, 0]}
                intensity={1}
                angle={0.6}
                penumbra={0.5}
                position={[-4, 4, 0]}
                castShadow
                shadow-bias={-0.0001}
            />
            <EffectComposer>
                <Bloom
                    blendFunction={BlendFunction.ADD}
                    intensity={1.3}
                    width={300}
                    height={300}
                    kernelSize={5}
                    luminanceThreshold={0.15}
                    luminanceSmoothing={0.025}
                />
                <ChromaticAberration
                    blendFunction={BlendFunction.NORMAL}
                    offset={[0.0005, 0.0012]}
                />
            </EffectComposer>
        </Canvas>
    )
}