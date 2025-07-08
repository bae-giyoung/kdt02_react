import { useState, useEffect } from "react"
import TrafficNav2 from "./TrafficNav2";

export default function Traffic2() {
    // 전체 데이터
    const [tdata, setTdata] = useState([]);

    // 대분류 데이터
    const [c1, setC1] = useState([]);

    // 선택된 대분류
    const [sel1, setSel1] = useState();

    // 사고 유형 데이터
    const [c2, setC2] = useState([]);

    // 선택된 사고 유형
    const [sel2, setSel2] = useState();

    // 선택된 자료
    const [info, setInfo] = useState();
    const [infoTag, setInfoTag] = useState();
    

    // 데이터 fetch 함수, 비동기 함수
    const getFetchData = async () => {
        const apikey = import.meta.env.VITE_DATA_API;
        const baseUrl = 'https://api.odcloud.kr/api/15070282/v1/uddi:8449c5d7-8be5-4712-9093-968fc0b2d9fc?';
        const url = `${baseUrl}page=1&perPage=18&serviceKey=${apikey}`;

        const resp = await fetch(url); // Resonse 객체
        const data = await resp.json();

        //console.log(resp, data, data.data);
        setTdata(data.data);
    }

    // 컴포넌트 생성될 때 맨 처음 한번 실행
    useEffect(() => {
        // 데이터 fetch
        getFetchData();
    },[]) // dependancy array

    // tdata가 fetch의 결과로 변경이 되었을 때
    useEffect(() => {
        // useState에 초기화 될 때는 실행 안 함
        if(tdata.length == 0) return;

        // fetch의 결과로 tdata가 변경이 되었을 때
        let tm = tdata.map(item => item["사고유형대분류"]);
        // 대분류 중복 제거
        tm = [...new Set(tm)];
        // 대분류 생성
        setC1(tm);
    },[tdata])

    // 대분류 중에서 특정 항목이 선택되면
    useEffect(() => {
        // 대분류가 최기화되어 선택된 값이 없을 때
        if(!sel1) return;

        // 사고유형 목록 생성
        let tm = tdata.filter(item => item["사고유형대분류"] == sel1).map(item => item["사고유형"]);
        tm = [...new Set(tm)];
        setC2(tm);
        setInfoTag(''); //!!!!
    },[sel1])

    // 사고 유형이 선택되었을 때
    useEffect(() => {
        if(!sel1 || !sel2 || !c2) return;

        let tm = tdata.filter(item => item["사고유형대분류"] == sel1 && item["사고유형"] == sel2);
        setInfo(tm[0]);
    },[sel2])

    // 사고 유형이 결정이 되면
    useEffect(() => {
        if(!info) return;
        //console.log(info);
        let tm = ["사고건수","사망자수","중상자수","경상자수","부상신고자수"]
        tm = tm.map(item => <div key={item} className="flex gap-2 items-center text-lg h-12 border p-2">
                                    <div className="bg-orange-900 text-white font-semibold p-1">{item}</div>
                                    <div>{parseInt(info[item]).toLocaleString()}</div>
                            </div>)
        setInfoTag(tm);
    },[info])

    return (
        <div className="w-9/10">
            {c1 && <TrafficNav2 title="대분류" c={c1} sel={sel1} setSel={setSel1} /> }   
            {c2 && sel1 && <TrafficNav2 title="사고유형" c={c2} sel={sel2} setSel={setSel2} /> }
            <div className="w-full flex gap-3 justify-center items-center mt-10">
                {infoTag}
            </div>
        </div>
    )
}
