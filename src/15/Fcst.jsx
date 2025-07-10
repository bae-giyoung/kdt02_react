import { useState, useEffect, useRef } from "react"
import { Navigate, useNavigate } from "react-router-dom";
import getxy from '../jsondatas/getxy.json'
import TailButton from "../component/TailButton";

export default function Fcst() {
    const dtRef = useRef();
    const areaRef = useRef();
    const areaTag = getxy.map(item => item['1단계']).map(item => <option value={item} key={item}>{item}</option>);
    const navigate = useNavigate(); // 함수를 반환 받음

    const handleLink = (gubun) => {
        const tm = getxy.filter(item => item["1단계"] == areaRef.current.value)[0];
        let x = tm["격자 X"]
        let y = tm["격자 Y"]
        console.log(areaRef, tm, x, y)
        console.log(gubun, dtRef.current.value, areaRef.current.value)
        
        // get방식으로 params 전달
        navigate(`/fcstlist?gubun=${gubun}&date=${dtRef.current.value.replaceAll('-','')}&x=${x}&y=${y}`);
    }

    useEffect(()=>{
        let today = new Date().toISOString().split('T')[0];
        dtRef.current.value = today;
        console.log(today)
    },[])

    return (
        <div className="w-8/10">
            <h3>일기예보 선택</h3>
            <form className="w-full grid grid-cols-2 gap-4 mt-5">
                <input ref={dtRef} type="date"
                            className='block p-2 ps-2 text-sm text-gray-900 border border-gray-300 rounded-sm bg-white focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'/>
                <select ref={areaRef} name="" id="selCity"
                            className='block p-2 ps-2 text-sm text-gray-900 border border-gray-300 rounded-sm bg-white focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'>
                    <option value=''>----시/도 선택----</option>
                    {areaTag}
                </select>
            </form>
            <div className="w-full grid grid-cols-2 gap-4 mt-5">
                <TailButton caption="초단기예보" color="blue" onHandle={() => handleLink("초단기")}/>
                <TailButton caption="단기예보" color="blue" onHandle={() => handleLink("단기")}/>
            </div>
        </div>
    )
}
