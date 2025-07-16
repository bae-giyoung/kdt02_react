import { useSearchParams } from "react-router-dom"
import { useEffect, useRef, useState } from "react";
import getcode from '../jsondatas/getcode.json'

export default function FcstList() {
    const [tdata, setTdata] = useState([]);
    const [lists, setLists] = useState([]);
    const selRef = useRef();
    const [sparams] = useSearchParams();
    const gubun = sparams.get('gubun');
    const date = sparams.get('date');
    const x = sparams.get('x');
    const y = sparams.get('y');

    
    // select 박스 option의 배열
    const options = getcode.filter(item => item["예보구분"] == `${gubun}예보`)
                            .map(item => <option value={item["항목값"]} key={item["항목명"]}>{item["항목명"]}</option>);
    
    // 데이터 받아오기
    const getData = async () => {
        const apikey = import.meta.env.VITE_DATA_API;
        const baseTime = gubun == '초단기' ? '0630' : '0500';
        const baseUrl = gubun == '초단기'
        ? 'https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtFcst?'
        : 'https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst?';
        const url = `${baseUrl}serviceKey=${apikey}&pageNo=1&numOfRows=1000&dataType=JSON&base_date=${date.replaceAll('-','')}&base_time=${baseTime}&nx=${x}&ny=${y}`;
        
        const resp = await fetch(url);
        const data = await resp.json();
        
        setTdata(data.response.body.items.item); // console.log(url, data.response.body.items.item);
    }
    
    // 예측값: 특정 예측값 자료구조
    const valDataSet = {
        "SKY" : {
            "1": "맑음(🌞)", "3": "구름많음(☁)", "4": "흐림(⛅)",
        },
        "PTY" : {
            "0": "없음(🌫)", "1": "비(☔)", "2": "비/눈(☔/⛄)", "3": "눈(⛄)",
            "4": "소나기(🌨)", "5": "빗방울(💧)", "7": "눈날림(☃)",
        },
    }
    
    // 예측값: 범위 데이터(강수량) 처리하기
    const getRangedValue = (val) => {
        let newVal = '강수없음';
        const nVal = parseFloat(val);

        if (nVal >= 0.1 && nVal < 1.0)
            newVal = '1mm 미만';
        else if (nVal >= 1.0 && nVal < 30.0)
            newVal = nVal + 'mm';
        else if (nVal >= 30.0 && nVal < 50.0)
            newVal = '30.0~50.0mm';
        else if (nVal >= 50.0)
            newVal = '50.0mm 이상';

        return newVal;
    }
    
    // 예측값: 적절한 예측 출력값 설정
    const getVal = (cate, val) => {
        if (Object.keys(valDataSet).includes(cate))
            return valDataSet[cate][val];
        else if (cate == 'RN1' || cate == 'PCP')
            return getRangedValue(val)
        else
            return (
                val.includes("없음")
                ? val
                : val + "" + getcode.filter(it => it["항목값"] == cate)[0]["단위"]
            );
    }

    // 리스트 태그 만들기(재사용)
    const makeLists = (data) => {
        const listTags = data.map((item, idx) => 
            <tr key={item["category"] + idx} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                <td className="px-6 py-4">
                    {getcode.filter(it => it["항목값"] == item["category"])[0]["항목명"]}
                </td>
                <td className="px-6 py-4">
                    {item["fcstDate"]}
                </td>
                <td className="px-6 py-4">
                    {item["fcstTime"]}
                </td>
                <td className="px-6 py-4">
                    {getVal(item["category"], item["fcstValue"])}
                </td>
            </tr>
        )
        setLists(listTags);
    }
    
    // 셀렉트 값 변경 시
    const changeCate = () => {
        if (!tdata.length) return;

        let newListData = tdata
        if (selRef.current.value != '') {
            newListData = tdata.filter(item => item["category"] == selRef.current.value);
        }

        makeLists(newListData); //console.log(selRef.current.value, newListData);
    }

    // 첫 로딩시 fetch
    useEffect(() => {
        getData();
    },[])

    // 데이터 받아 오면
    useEffect(() => {
        if (tdata.length == 0) return;
        makeLists(tdata);
    },[tdata])


    return (
        <>
            <div className="w-full grid grid-cols-2 gap-4 mb-5">
                <h3 className="text-left font-extrabold text-2xl">{gubun} 예보 ({date.replaceAll('-','.')})</h3>
                <select onChange={changeCate} ref={selRef}
                        className='block p-2 ps-2 text-sm text-gray-900 border border-gray-300 rounded-sm bg-white focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'>
                    <option value=''>-----선택-----</option>
                    {options}
                </select>
            </div>
            <div className="relative w-full overflow-x-auto">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-white uppercase bg-black dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                항목명
                            </th>
                            <th scope="col" className="px-6 py-3">
                                예측일자
                            </th>
                            <th scope="col" className="px-6 py-3">
                                예측시간
                            </th>
                            <th scope="col" className="px-6 py-3">
                                예측값
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {lists}
                    </tbody>
                </table>
            </div>
        </>
    )
}