import { useSearchParams } from "react-router-dom"
import { useEffect, useState } from "react";
import getcode from '../jsondatas/getcode.json'

export default function FcstList() {
    const [tdata, setTdata] = useState([]);
    const [lists, setLists] = useState([]);
    const [sparams] = useSearchParams();
    const gubun = sparams.get('gubun');
    const date = sparams.get('date');
    const x = sparams.get('x');
    const y = sparams.get('y');
    const options = getcode.filter(item => item["예보구분"] == `${gubun}예보`)
                            .map(item => <option value={item["항목명"]} key={item["항목명"]}>{item["항목명"]}</option>);

    // 항목명 찾을 데이터 구조
    //

    const getData = async () => {
        const apikey = import.meta.env.VITE_DATA_API;
        const baseTime = gubun == '초단기' ? '0630' : '0500';
        const baseUrl = gubun == '초단기'
                        ? 'https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtFcst?'
                        : 'https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst?';
        const url = `${baseUrl}serviceKey=${apikey}&pageNo=1&numOfRows=1000&dataType=JSON&base_date=${date}&base_time=${baseTime}&nx=${x}&ny=${y}`;
        
        const resp = await fetch(url);
        const data = await resp.json();

        console.log(url, data.response.body.items.item);
        setTdata(data.response.body.items.item);
    }

    const makeLists = () => {
        const listTags = tdata.map((item, idx) => 
            <tr key={idx} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                <td className="px-6 py-4">
                    {item["category"]}
                </td>
                <td className="px-6 py-4">
                    {item["fcstDate"]}
                </td>
                <td className="px-6 py-4">
                    {item["fcstTime"]}
                </td>
                <td className="px-6 py-4">
                    {item["fcstValue"]}
                </td>
            </tr>
        )
        setLists(listTags);
    }

    // 첫 로딩시 fetch
    useEffect(() => {
        getData();
    },[])

    // 데이터 받아 오면
    useEffect(() => {
        if(tdata.length == 0) return;
        makeLists();
    },[tdata])

    // 셀렉트 값이 변경되면

    return (
        <>
            <div className="w-full grid grid-cols-2 gap-4 mb-5">
                <h3>{gubun} 예보 {date}</h3>
                <select className='block p-2 ps-2 text-sm text-gray-900 border border-gray-300 rounded-sm bg-white focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'>
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