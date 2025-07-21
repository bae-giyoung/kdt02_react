import { useEffect, useState, useRef } from "react"
import TailCard from "../component/TailCard"
import TailSearch from "../component/TailSearch"
import { IoSearchCircle } from "react-icons/io5";

export default function Gallery() {
    const [tdata, setTdata] = useState([])
    const [schKeyword, setSchKeyword] = useState('')
    const [gallItems, setGallItems] = useState([])
    const schKey = useRef()
    const isInit = useRef(true)

    const searchData = (e) => {
        e.preventDefault();
        setSchKeyword(schKey.current.value);
    }

    const resetInput = (e) => {
        e.preventDefault();
        schKey.current.value = '';
        schKey.current.focus();
    }

    const getData = async () => { 
        if(schKeyword == '') return;
        const apikey = import.meta.env.VITE_DATA_API;
        const baseUrl = 'https://apis.data.go.kr/B551011/PhotoGalleryService1/gallerySearchList1?';
        const kw = encodeURI(schKeyword);
        const url = `${baseUrl}serviceKey=${apikey}&numOfRows=10&pageNo=1&MobileOS=ETC&MobileApp=AppTest&arrange=A&keyword=${kw}&_type=json`;
        console.log(url)
        
        const resp = await fetch(url)
        const data = await resp.json()
        console.log(data.response.body.items.item, data.response)

        if(isInit.current) isInit.current = false;
        if(data.response.body.numOfRows != 0) setTdata(data.response.body.items.item);
        else setTdata(["no-data"]);
    }

    // 키워드 검색시 요청
    useEffect(() => { 
        if(schKeyword == '') return;
        getData()
    },[schKeyword])

    // 검색 결과 태그
    useEffect(() => { 
        if(isInit.current) return;

        let tm = null;
        if(tdata[0] == "no-data") {
            tm = <div className="col-span-2 lg:col-span-3 w-full h-full flex flex-col justify-center items-center gap-4">
                        <IoSearchCircle className="w-28 h-28 text-gray-300" />
                        <p className="font-extrabold text-gray-400 text-xl">해당하는 데이터가 존재하지 않습니다.</p>
                    </div>
        } else {
            tm = tdata.map((t, idx) => <TailCard 
                                            title={t.galTitle}
                                            info={t.galPhotographyLocation}
                                            imgsrc={t.galWebImageUrl}
                                            kwds={t.galSearchKeyword}
                                            key={idx}/>)
        }

        setGallItems(tm)
    },[tdata])

    return (
        <div className="w-full h-full flex flex-col justify-center items-center">
            <h3 className="text-2xl font-extrabold">한국관광공사 사진 정보</h3>
            <TailSearch keyRef={schKey} onOk={searchData} onCancel={resetInput}/>
            <div className="w-full h-full grid grid-cols-2 gap-3 lg:grid-cols-3 mt-6 flex-auto">
                {gallItems}
            </div>
        </div>
    )
}
