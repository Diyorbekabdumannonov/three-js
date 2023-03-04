import React, { useState } from 'react'
import gravelGrey from './assets/GravelGrey_RHS_01.png'
import pineGreen from './assets/D3G2_PineGreen_1.png'
import duneBrown from './assets/D3G2_DesertDune_1.png'
import glacierBlue from './assets/D3G2_Lagoon_1.png'
import graniteBlack from './assets/D3G2_Granite_1.png'
import { useContext } from 'react'
import { AppContext } from './App'

export default function Sidebar() {
    const { setDefaultColor } = useContext(AppContext)
    const colours = [
        { name: 'Gravel Grey', img: gravelGrey, color: '#454b51' },
        { name: 'Pine Green', img: pineGreen, color: '#314e39' },
        { name: 'Dune Brown', img: duneBrown, color: '#c1bba3' },
        { name: 'Glacier Blue', img: glacierBlue, color: '#729DC8' },
        { name: 'Granite Black', img: graniteBlack, color: '#405059' },
    ]

    const [colorsIsOpen, setColorIsOpen] = useState(true)

    return (
        <>
            <div className="sidebar w-400">
                <div className="category">
                    <h1>Style</h1>
                    <h1>Comfort</h1>
                    <h1>Protection</h1>
                </div>
                <div className="overflow-hidden">
                    <div className="controls">
                        <h1 className="title" onClick={() => setColorIsOpen(!colorsIsOpen)}>
                            <span>COLOURS</span>
                            <span className={colorsIsOpen ? 'arrow' : 'arrowUp'}>
                                {'>'}
                            </span>
                        </h1>
                        {colorsIsOpen && <div className="colors">
                            {colours.map(item => {
                                return <button className="btn" onClick={() => setDefaultColor(item.color)}>
                                    <img className="img" src={item.img} alt={item.img} />
                                    <span> {item.name}</span>
                                </button>
                            })}
                        </div>}
                    </div>
                </div>
            </div>
        </>
    )
}