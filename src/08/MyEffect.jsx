import { useEffect, useState } from "react"
import TailButton from "../component/TailButton";

export default function MyEffect() {
    const [cnt, setCnt] = useState(0)

    // ===== [useEffect] =====
    // 첫 번째 인자는 콜백함수: react가 호출해 주는 콜밸 함수
    // 두 번째 인자 dependency array: 는 언제 콜백 함수가 실행되는지 결정하는 기준
    //1. []: 컴포넌트가 만들어 질 때 딱 한 번만 실행
    useEffect(()=>{console.log('useEffect []: ', cnt)}, [])
    //2. [cnt]: 특정 스테이트 변수가 변경이 될 때 실행
    useEffect(()=>{console.log('useEffect [cnt]: ', cnt)}, [cnt])
    //3. 없음: 어떤 스테이트 변수던지 스테이트 변수가 변경이 되어 화면이 다시 그려질 때, 화면에 변화가 일어나면 무조건 실행!!!
    useEffect(()=>{console.log('useEffect: ', cnt)})

    // 이 컴포넌트에서는 맨 처음 화면이 그려질 때 3가지 useEffect문 모두 실행됨

    const up = () => {
        setCnt(cnt+1) // 비동기 작업
        //console.log("up", cnt) // 동기작업인 console.log()가 먼저 실행된다. > 원하는 대로 코드가 동작하지 않을 수 있음 > Side Effect!!
    }
    const down = () => cnt-1 < 0 ? setCnt(0) : setCnt(cnt-1)

    return (
        <div>
            <div className="font-extrabold">
                MyEffect cnt: {cnt}
            </div>
            <TailButton color='orange' caption='+' onHandle={up}/>
            <TailButton color='blue' caption='-' onHandle={down}/>
        </div>

    )
}
