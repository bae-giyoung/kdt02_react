import { useState } from "react";
import TailBall from "./TailBall"
import TailButton from "./TailButton"

export default function Lotto() {
    const [lottoArr=[], setLotto] = useState();
    const handleNum = () => {
        let arr = [];

        while(arr.length < 6) {
            let num = Math.floor(Math.random()*45) + 1;
        
            // 랜덤 수가 이미 있는 경우
            if (arr.includes(num)) continue;
            
            // 랜덤 수가 없으면 배열에 추가
            arr.push(num);
        }

        // 배열 정렬: 보너스 넘버 더하기 전에 정렬하기!
        arr.sort((a,b) => a - b);

        // 보너스 번호(정렬과 상관없는)
        let bonusArr = [];

        while (bonusArr.length < 1) {
            let num = Math.floor(Math.random()*45) + 1;
            
            // 랜덤 수가 이미 있는 경우
            if (arr.includes(num)) continue;
            
            // 랜덤 수가 없으면 배열에 추가
            bonusArr.push(num);
        }

        // 전체 배열
        arr = [...arr, ...bonusArr];
        setLotto(arr);
    }

    return (
        <div className="flex flex-col h-full justify-center items-center">
            <div className="flex justify-center items-center gap-4 w-2xl min-h-30 border-2 p-5 rounded-2xl">
                {
                    lottoArr.map((item, idx) => <TailBall num={item} isBonus={idx == lottoArr.length-1} key={idx} />)
                }
            </div>
            <TailButton caption="로또번호생성" color="blue" onHandle={handleNum}/>
        </div>
    )
}