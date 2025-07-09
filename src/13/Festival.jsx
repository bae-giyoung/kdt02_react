import { useState, useEffect, useRef } from "react"
import TailCard from "../component/TailCard";

export default function Festival() {
    const [tdata, setTdata] = useState([]);
    const [options, setOptions] = useState([]);
    const [gallTags, setGallTags] = useState([]);

    const selGu = useRef();

    const getData = async () => {
        const apikey = import.meta.env.VITE_DATA_API;
        const baseUrl = 'https://apis.data.go.kr/6260000/FestivalService/getFestivalKr?';
        const url = `${baseUrl}serviceKey=${apikey}&pageNo=1&numOfRows=50&resultType=json`;

        const resp = await fetch(url);
        const data = await resp.json();

        setTdata(data.getFestivalKr.item);
    }

    // 첫 페이지 로딩 시 데이터 가져옴
    useEffect(() => {
        getData();
    },[])

    // tdata를 받아오고 난 이후 -> 셀렉트박스에 들어가 options 설정 -> 태그로 만들어서 options 스테이트변수로 설정
    useEffect(() => {
        if(tdata.length == 0) return;
        let tags = tdata.map(item => item["GUGUN_NM"]).sort();
        tags = [...new Set(tags)];
        tags = tags.map(item => <option key={item} value={item}>{item}</option>)
        setOptions(tags);
    },[tdata])

    const filterFetivals = () => {
        if(tdata.length == 0) return;
        let tags = tdata.filter(item => item["GUGUN_NM"] == selGu.current.value)
                        .map((item, idx) => <TailCard key={idx} 
                                                        title={item.TITLE}
                                                        info={item.TRFC_INFO}
                                                        imgsrc={item.MAIN_IMG_THUMB}
                                                        kwds={item.MIDDLE_SIZE_RM1}/>)
        setGallTags(tags)
    }

  return (
    <div className="w-full flex flex-col items-center">
        <h3 className="text-2xl font-extrabold text-blue-900">부산축제정보</h3>
        <form id="" className="w-8/10 flex flex-col items-center mt-5">
            <div className="w-full flex justify-center items-center">
                <label htmlFor="area" className="mr-4">지역 선택</label>
                <select id="area" ref={selGu} onChange={filterFetivals}
                        className='w-60 block p-2 ps-2 mx-2 text-sm text-gray-900 border border-gray-300 rounded-sm bg-white focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'>
                    <option value=''>-- 지역 선택 --</option>
                    {options.length != 0 ? options : ''}
                </select>
            </div>
            <div className="w-full grid grid-cols-2 lg:grid-cols-3 gap-3 mt-5">
                {gallTags}
            </div>
        </form>
    </div>
  )
}
