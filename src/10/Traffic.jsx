import {useState, useEffect} from "react"
import TrafficNav from "./TrafficNav";

export default function Traffic() {
    // fetch data 저장
    const [tdata, setTdata] = useState([]);
    
    // 대분류
    const [c1, setC1] = useState([]);

    // // 풀이 진행 중! - 선택 대분류
    // const [selC1, setSelC1] = useState();

    // // 대분류가 선택되었을 때
    // useEffect(()=> {
    //     if(!tdata || !c1) return;
    //     console.log(selC1);
    // },[selC1])

    // 중분류(사고유형)
    const [c2, setC2] = useState([]);

    // 필터된 정보
    const [info, setInfo] = useState([]);

    // 필터된 정보 태그
    const [infoTag, setInfoTag] = useState([]);

    const getFetchData = async () => {
        const baseUrl = "https://api.odcloud.kr/api/15070282/v1/uddi:8449c5d7-8be5-4712-9093-968fc0b2d9fc";
        const url = `${baseUrl}?page=1&perPage=18&serviceKey=${import.meta.env.VITE_DATA_API}`;
        const resp = await fetch(url); // 각 비동기 작업이 끝날 때까지 기다려줌
        const data = await resp.json();
        setTdata(data.data); console.log(data.data)
    }

    // 컴포넌트가 처음 mount되면 fetch
    useEffect(()=>{
        getFetchData();
    },[])

    // 전체 데이터가 fetch 되었을 때 대분류 출력
    useEffect(()=>{
        if(tdata.length == 0) return;
        const c1Set = [...new Set(tdata.map(item => item["사고유형대분류"]))]
        setC1(c1Set);
    },[tdata]);

    const handler1 = (cate1) => {
        if(c1.length == 0) return;
        const c2Set = [...new Set(tdata.filter(item => item["사고유형대분류"] == cate1).map(item => item["사고유형"]))]
        setC2(c2Set);
    }

    const handler2 = (cate2) => {
        if(c2.length == 0) return;
        console.log(cate2);
        const inf = tdata.filter(item => item["사고유형"] == cate2); // 대분류와 사고유형의 관계가 어떻게 되지? 다른 대분류의 사고유형은 서로 중복이 아닌게 확실한가? 제대로 필터링이 안될지도?......! -> 확인하기!!!!!
        setInfo(inf);
    }

    useEffect(()=>{// 중분류를
        console.log(c2); //return문 내부에서 표현식으로 하지 말고 useEffect 내부에서 태그 정하는 걸로 수정하자! -> 사이드 이펙트 
    },[c2])

    useEffect(()=>{
        if(info.length == 0) return;
        console.log(info);
        let infoList = info.map(item => Object.entries(item))[0]; // 기타 대분류도 이상하게 나옴..... 다시 생각하기.....
        setInfoTag(infoList.map(item => 
            <p>{item[0]}: {item[1]}</p>
        ))
        console.log(infoList)
    },[info])

    return (
        <div className="w-9/10">
            <div className="h-10 flex justify-between gap-4 items-center font-extrabold">
                <p className="text-xl">교통사고 대분류:</p>
                <div className="flex gap-2">
                {
                    c1.map(cate => <TrafficNav title={cate} handler={()=>handler1(cate)} key={cate} />)
                    //c1.map(cate => <TrafficNav title={cate} c={c1} selC={selC1} setSelC={setSelC1} handler={()=>handler1(cate)} key={cate} />)
                }
                </div>
            </div>
            <div className="h-10 flex justify-between gap-4 items-center font-extrabold mt-4">
                <p className="text-xl">교통사고 중분류:</p>
                <div className="flex gap-2">
                {
                    c2.map(cate => <TrafficNav title={cate} handler={()=>handler2(cate)} key={cate} />)
                }
                </div>
            </div>
            <div>
                {infoTag}
            </div>
        </div>
    )
}