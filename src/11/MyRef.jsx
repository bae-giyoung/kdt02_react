import { useState, useEffect, useRef } from "react";
import TailButton from "../05/TailButton";

export default function MyRef() {
    // 컴포넌트 변수
    let cnt = 0;

    // 상태 변수
    const [scnt, setScnt] = useState(0);
    
    // ref 변수
    const rcnt = useRef(0); // 변수에 접근할 때는 .current로 접근! 값에 접근할 때는 .current.value로 접근!

    const handleCnt = () => {
        cnt = cnt+1;
        console.log(cnt);
    }

    const handleScnt = () => {
        setScnt(scnt+1);
    }

    const handleRcnt = () => {
        rcnt.current = rcnt.current + 1;
        console.log(rcnt.current)
    }

    return (
        <div>
            <div className="grid grid-cols-3 gap-4 justify-center font-extrabold">
                <div className="text-orange-700">컴포넌트 변수: {cnt}</div>
                <div className="text-blue-800">state 변수: {scnt}</div>
                <div className="text-lime-900">ref 변수: {rcnt.current}</div>
            </div>
            <div className="grid grid-cols-3 gap-4 justify-center mt-8">
                <TailButton caption="컴포넌트 변수" color="orange" onHandle={handleCnt}/>
                <TailButton caption="state 변수" color="blue" onHandle={handleScnt}/>
                <TailButton caption="ref 변수" color="lime" onHandle={handleRcnt}/>
            </div>
        </div>
    )
}