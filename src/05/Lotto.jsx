import { useState } from "react";
import TailBall from "../component/TailBall"
import TailButton from "../component/TailButton"

export default function Lotto() {
    const [lottoArr=[], setLotto] = useState();
    const handleNum = () => {
        let arr = [];

        while(arr.length < 6) {
            let num = Math.floor(Math.random()*45) + 1;
        
            if (arr.includes(num)) continue;
            
            arr.push(num);
        }

        arr.sort((a,b) => a - b);

        let bonusArr = [];

        while (bonusArr.length < 1) {
            let num = Math.floor(Math.random()*45) + 1;
            
            if (arr.includes(num)) continue;
            
            bonusArr.push(num);
        }

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