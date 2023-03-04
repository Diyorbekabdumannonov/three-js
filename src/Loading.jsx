import React, { useState } from 'react'
import { LoadingManager, ObjectLoader } from "three";

export default function Loading() {
    const [loading, setLoading] = useState(true)

    const manager = new LoadingManager();
    manager.onLoad = function () {
        setLoading(false)
    };
    const loader = new ObjectLoader(manager);
    loader.load('', function (object) {
        setLoading(false)
    });
    return (
        <>
            {loading && <div className="loader">
                Loading...
            </div>}
        </>
    )
}