//import { useEffect, useState } from 'react';
import MydivState2 from './MydivState2';
import { useAtom } from 'jotai';
import { cntAtom, cntAtom2 } from "./CountAtoms"; // 커스텀: 전역 변수들 선언한 파일

export default function MyDivState() {
    // "./CountAtoms"에서 가져온 전역변수 cntAtom, cntAtom2 !!!
    const [n1] = useAtom(cntAtom); // 배열을 구조분해해서 받으니 순서가 중요할 것 같다! -> 확인하기!
    const [n2] = useAtom(cntAtom2);

    return (
        <div className="w-9/10 h-4/5 bg-green-950 min-h-80
                    flex flex-col items-start justify-start gap-5
                    text-white text-2xl font-bold p-[5%]">
            div1 : n1 = {n1}, n2 = {n2}
            <MydivState2 />
        </div>
    )
}