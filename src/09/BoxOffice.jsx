import { useEffect, useState, useRef } from "react"

export default function BoxOffice() {
    const [tdata, setTdata] = useState([]);
    const [tag, setTag] = useState([]);
    const [info, setInfo] = useState('');
    const dateRef = useRef(); // useRef => State변수가 변경이 되어 화면이 새로 그려질 때 화면에 반영됨!

    
    const getYesterday = () => {
        const date = new Date();
        date.setDate(date.getDate() - 1);
        const yeterday = date.getFullYear() + (date.getMonth() < 10 ? "0"+date.getMonth() : date.getMonth()) + (date.getDate() < 10 ? "0"+ date.getDate() : date.getDate());
        return yeterday;
    }

    const yeterday = getYesterday();
    
    const getFetchData = async (date) => { // fetch를 async await으로 사용하기!!
        const apiKey = import.meta.env.VITE_MV_API; // .env파일: .으로 시작되는 파일은 히든 파일, 탐색기에서 숨겨진 파일
        const url = `https://kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?key=${apiKey}&targetDt=${date}`;
        const resp = await fetch(url);
        const data = await resp.json();
        setTdata(data.boxOfficeResult.dailyBoxOfficeList);
    }
    
    const handleItem = (obj) => {
        setInfo(`개봉일: ${obj.openDt} | 상영스크린수: ${obj.scrnCnt} | 상영횟수: ${obj.showCnt}`); 
    }
    
    useEffect(()=>{
        getFetchData(yeterday);
    }, [])

    useEffect(()=>{
        let tm = tdata.map(item => // 각 요소를 찍어보니 $$typeof: Symbol(react.transitional.element), type: 'tr', key: '20211791', props: {…}이 나옴 -> 여기에 대해 더 알아보기!
            <tr key={item.movieCd} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b 
                        dark:border-gray-700 border-gray-200 hover:bg-gray-100 hover:text-black cursor-pointer"
                            onClick={()=>handleItem(item)}>
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {item.rank}
                </th>
                <td className="px-6 py-4">
                    {item.movieNm}
                </td>
                <td className="px-6 py-4">
                    {parseInt(item.salesAmt).toLocaleString()}
                </td>
                <td className="px-6 py-4">
                    {parseInt(item.audiCnt).toLocaleString()}
                </td>
                <td className="px-6 py-4">
                    {parseInt(item.salesAcc).toLocaleString()}
                </td>
                <td className="px-6 py-4">
                    {parseInt(item.audiAcc).toLocaleString()}
                </td>
                <td className="px-6 py-4">
                    {item.rankOldAndNew == 'OLD' ? '' : <span className="text-red-900 font-extrabold">NEW</span>}
                </td>
            </tr>
        )
        setTag(tm)
    }, [tdata])
    
    return (
        <>
        <div className="w-9/10 flex justify-end items-center mb-4">
            일자 기준
            <input className="ml-2 block p-2 ps-2 mx-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-white focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                type="date" ref={dateRef} defaultValue={yeterday} 
                onChange={() => getFetchData(dateRef.current.value.replaceAll("-",""))}>
            </input>
        </div>
        <div className="w-9/10 relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            순위
                        </th>
                        <th scope="col" className="px-6 py-3">
                            영화명
                        </th>
                        <th scope="col" className="px-6 py-3">
                            매출액
                        </th>
                        <th scope="col" className="px-6 py-3">
                            관객수
                        </th>
                        <th scope="col" className="px-6 py-3">
                            누적매출액
                        </th>
                        <th scope="col" className="px-6 py-3">
                            누적관객수
                        </th>
                        <th scope="col" className="px-6 py-3">
                            신규진입
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {tag}
                </tbody>
            </table>
        </div>
        <div className="flex flex-col justify-center items-center w-9/10 my-5 h-10 bg-gray-200">{info}</div>
        </>
    )
}