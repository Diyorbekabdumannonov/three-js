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
import { LoadingManager, ObjectLoader } from "three";
import { Room } from './Room'
import gravelGrey from './assets/GravelGrey_RHS_01.png'
import pineGreen from './assets/D3G2_PineGreen_1.png'
import duneBrown from './assets/D3G2_DesertDune_1.png'
import glacierBlue from './assets/D3G2_Lagoon_1.png'
import graniteBlack from './assets/D3G2_Granite_1.png'
import blackoil from './assets/1990218.png'
import silveroil from './assets/1990236.png'
import blackFront from './assets/1990652.png'
import silverFront from './assets/1990653.png'

function App() {
  const [loading, setLoading] = useState(true)
  const [defaultColor, setDefaultColor] = useState('#454b51')
  const [colorsIsOpen, setColorIsOpen] = useState(true)
  const [reserVoirIsOpen, setReserVoirIsOpen] = useState(false)
  const [oilFilterIsOpen, setOilFilterIsOpen] = useState(false)

  const manager = new LoadingManager();
  manager.onLoad = function () {
    console.log('Loading complete!');
    setLoading(false)
  };
  const loader = new ObjectLoader(manager);
  loader.load('', function (object) {
    setLoading(false)
  });

  const colours = [
    { name: 'Gravel Grey', img: gravelGrey, color: '#454b51' },
    { name: 'Pine Green', img: pineGreen, color: '#314e39' },
    { name: 'Dune Brown', img: duneBrown, color: '#c1bba3' },
    { name: 'Glacier Blue', img: glacierBlue, color: '#729DC8' },
    { name: 'Granite Black', img: graniteBlack, color: '#405059' },
  ]

  const reservoir = [
    { name: 'Black Front Reservoir Cap', img: blackFront },
    { name: 'Silver Front Reservoir Cap', img: silverFront },
  ]
  const oilFilter = [
    { name: 'Black Front Reservoir Cap', img: blackoil },
    { name: 'Silver Front Reservoir Cap', img: silveroil },
  ]

  return (
    <Suspense fallback={null}>
      <div>
        {loading ? 'loading' : ''}
      </div>
      <div className="canvas-container">
        <div className="sidebar w-400">
          <div className="category">
            <h1>Style</h1>
            <h1>Comfort</h1>
            <h1>Protection</h1>
          </div>
          <div className="overflow-hidden">
            <div className="controls">
              <h1 className="title" onClick={() => setColorIsOpen(!colorsIsOpen)}>COLOURS</h1>
              {colorsIsOpen && <div className="colors">
                {colours.map(item => {
                  return <button className="btn" onClick={() => setDefaultColor(item.color)}>
                    <img className="img" src={item.img} alt={item.img} />
                    <span> {item.name}</span>
                  </button>
                })}
              </div>}
            </div>
            <div className="controls">
              <h1 className="title" onClick={() => setReserVoirIsOpen(!reserVoirIsOpen)}>RESERVOIR CAP</h1>
              {reserVoirIsOpen && <div className="colors">
                {reservoir.map(item => {
                  return <button className="btn h-350" onClick={() => setDefaultColor('#00FF00')}>
                    <img src={item.img} alt={item.img} className="img" />
                    <span>{item.name}</span>
                  </button>
                })}
              </div>}
            </div>
            <div className="controls">
              <h1 className="title" onClick={() => setOilFilterIsOpen(!oilFilterIsOpen)}>OIL FILLER CAP</h1>
              {oilFilterIsOpen && <div className="colors">
                {oilFilter.map(item => {
                  return <button className="btn h-350" onClick={() => setDefaultColor('#00FF00')}>
                    <img src={item.img} alt={item.img} className="img" />
                    <span>{item.name}</span>
                  </button>
                })}
              </div>}
            </div>
          </div>
        </div>
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
                <Car color={defaultColor} />
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
      </div >
    </Suspense >
  );
}

export default App;
