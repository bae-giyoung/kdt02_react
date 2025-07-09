import { useEffect, useState, useRef } from "react"
import TailCard from "../component/TailCard"
import TailSearch from "../component/TailSearch"

export default function Gallery() {
    const [tdata, setTdata] = useState([])
    const [schKeyword, setSchKeyword] = useState('')
    const [gallItems, setGallItems] = useState([])
    const schKey = useRef()

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
        if(data.response.body.numOfRows != 0) setTdata(data.response.body.items.item)
    }

    // 키워드 검색시 요청
    useEffect(() => { 
        if(schKeyword == '') return;
        getData()
    },[schKeyword])

    // 검색 결과 태그
    useEffect(() => { 
        if(tdata.length == 0) return;
        const tm = tdata.map((t, idx) => <TailCard 
                                            title={t.galTitle}
                                            info={t.galPhotographyLocation}
                                            imgsrc={t.galWebImageUrl}
                                            kwds={t.galSearchKeyword}
                                            key={idx}/>)
        setGallItems(tm)
    },[tdata])

    // 검색 결과 태그
    //const gallItems = tdata.map((t, idx) => <TailCard item={t} key={idx}/>)

    return (
        <div className="w-full flex flex-col justify-center items-center">
            <h3 className="text-2xl font-extrabold">한국관광공사 사진 정보</h3>
            <TailSearch keyRef={schKey} onOk={searchData} onCancel={resetInput}/>
            <div className="w-full grid grid-cols-2 gap-3 lg:grid-cols-3 mt-6">
                {gallItems}
            </div>
        </div>
    )
}
