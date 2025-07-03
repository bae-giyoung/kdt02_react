import { useEffect, useState } from "react"

export default function BoxOffice() {
    const [tdata, setTdata] = useState([]);
    const [tag, setTag] = useState([]);

    const getFetchData = async (date) => { // fetch를 async await으로 사용하기!!
        const apiKey = import.meta.env.VITE_MV_API; // .env파일: .으로 시작되는 파일은 히든 파일, 탐색기에서 숨겨진 파일
        const url = `https://kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?key=${apiKey}&targetDt=${date}`
        const resp = await fetch(url)
        const data = await resp.json()
        setTdata(data.boxOfficeResult.dailyBoxOfficeList);
    }

    useEffect(()=>{
        const date = new Date();
        date.setDate(date.getDate() - 1);
        const yeterday = date.getFullYear() + (date.getMonth() < 10 ? "0"+date.getMonth() : date.getMonth()) + (date.getDate() < 10 ? "0"+ date.getDate() : date.getDate());
        getFetchData(yeterday);
    }, [])

    useEffect(()=>{console.log(tdata);
        let tm = tdata.map(item => 
            <tr key={item.movieCd} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {item.rank}
                </th>
                <td className="px-6 py-4">
                    {item.movieNm}
                </td>
                <td className="px-6 py-4">
                    {item.salesAmt}
                </td>
                <td className="px-6 py-4">
                    {item.scrnCnt}
                </td>
                <td className="px-6 py-4">
                    {item.salesAcc}
                </td>
                <td className="px-6 py-4">
                    {item.showCnt}
                </td>
                <td className="px-6 py-4">
                    {item.rankInten}
                </td>
            </tr>
        )
        setTag(tm)
    }, [tdata])

    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
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
                            증감률
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {tag}
                </tbody>
            </table>
        </div>
    )
}