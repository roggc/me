import {useState,useEffect} from 'react'

const getWindowDimensions=()=>{
    const {innerWidth:windowWidth,innerHeight:windowHeight}=window
    return {windowWidth,windowHeight}
}

export const useWindowDimensions=()=>{
    const [windowDimensions,setWindowDimensions]=useState(getWindowDimensions())
    useEffect(()=>{
        const resize=()=>{
            setWindowDimensions(getWindowDimensions())
        }
        window.addEventListener('resize',resize)
        return ()=>window.removeEventListener('resize',resize)
    },[])
    return windowDimensions
}