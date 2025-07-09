import { useState } from "react"
import TailBall2 from "../component/TailBall2";
import TailButton from "../component/TailButton";

export default function Lotto2() {
    const [lottoTags, setLottoTags] = useState([]);

    const makeLotto = () => {
        let balls = [];

        while(balls.length < 7) {
            let num = Math.floor(Math.random()*45) + 1;
            if (balls.includes(num)) continue;
            balls.push(num);
        }

        // 보너스
        let bonus = balls.splice(-1);

        // 보너스 제외 정렬
        balls.sort((a, b) => a - b);

        balls = [...balls, '+', ...bonus];
        setLottoTags(balls);
        console.log(lottoTags);
    }

    return (
        <div className="flex flex-col h-full justify-center items-center">
            <div className="flex justify-center items-center gap-4 w-2xl min-h-30 border-2 p-5 rounded-2xl">
                {
                    lottoTags.map(item => item == "+" ? <span key={`n${item}`} className="font-extrabold text-3xl m-2">{item}</span> : <TailBall2 key={`n${item}`} num={item} />)
                }
            </div>
            <TailButton caption="로또번호 생성2" color="blue" onHandle={makeLotto}></TailButton>
        </div>
    )
}