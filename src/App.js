import React, { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import {
  EffectComposer,
  Bloom,
  ChromaticAberration,
} from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import {
  CubeCamera,
  Environment,
  OrbitControls,
  PerspectiveCamera,
} from "@react-three/drei";
import "./style.css";
import { Car } from "./Car";
import { Ground } from './Ground'
import { LoadingManager, ObjectLoader } from "three";

function App() {
  const [color, setColor] = useState([1, 1, 2])
  const [loading, setLoading] = useState(true)

  const manager = new LoadingManager();
  manager.onLoad = function () {
    console.log('Loading complete!');
    setLoading(false)
  };
  const loader = new ObjectLoader(manager);
  loader.load('file.obj', function (object) {

    //

  });

  return (
    <Suspense fallback={null}>
      {loading ? 'loading' : ''}
      <Canvas>
        <OrbitControls
          target={[0, 0.35, 0]}
          maxPolarAngle={1.45}
        />
        <PerspectiveCamera makeDefault fov={50} position={[3, 2, 5]} />
        <CubeCamera resolution={256}>
          {(texture) => (
            <>
              <Environment map={texture} />
              <Car />
            </>
          )}
        </CubeCamera>
        <Ground />
        <spotLight
          color={color}
          intensity={1.5}
          angle={0.6}
          penumbra={0.5}
          position={[5, 5, 0]}
          castShadow
          shadow-bias={-0.0001}
        />
        <spotLight
          color={color}
          intensity={2}
          angle={0.6}
          penumbra={0.5}
          position={[-5, 5, 0]}
          castShadow
          shadow-bias={-0.0001}
        />
        <EffectComposer>
          {/* <DepthOfField focusDistance={0.0035} focalLength={0.01} bokehScale={3} height={480} /> */}
          <Bloom
            blendFunction={BlendFunction.ADD}
            intensity={1.3} // The bloom intensity.
            width={300} // render width
            height={300} // render height
            kernelSize={5} // blur kernel size
            luminanceThreshold={0.15} // luminance threshold. Raise this value to mask out darker elements in the scene.
            luminanceSmoothing={0.025} // smoothness of the luminance threshold. Range is [0, 1]
          />
          <ChromaticAberration
            blendFunction={BlendFunction.NORMAL} // blend mode
            offset={[0.0005, 0.0012]} // color offset
          />
        </EffectComposer>
      </Canvas>
    </Suspense>
  );
}

export default App;
