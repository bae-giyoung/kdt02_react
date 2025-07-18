import { useEffect, useRef, useState } from "react"
import TailSelect from "../component/TailSelect"
import TailButton from "../component/TailButton"
import zcode from "../18/code/zcode.json"
import zscode from "../18/code/zscode.json"
import kind from "../18/code/kind.json"
import kinddetail from "../18/code/kinddetail.json"
import stat from "../18/code/stat.json"
import chargertype from "../18/code/chgertype.json"
import busid from "../18/code/busid.json"
import TailCard from "../component/TailCard"
import TailPageNation from "../component/TailPageNation"
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function ChargingStation() {
    const [tdata, setTdata] = useState([]);
    const [lists, setLists] = useState([]);
    const [area, setArea] = useState([]);
    const [totalCnt, setTotalCnt] = useState(0);
    const [curPage, setCurPage] = useState(1);
    const cityRef = useRef();
    const areaRef = useRef();
    const kindRef = useRef();
    const showCnt = 12;
    const totalPage = Math.ceil(totalCnt / showCnt);
    // 뭔가 느린 느낌이라 확인해보기!!!!! form으로 안한 것도 생각해보기!

    const getSearchData = async (pageNo) => {
        const apikey = import.meta.env.VITE_DATA_API;
        const baseUrl = 'https://apis.data.go.kr/B552584/EvCharger/getChargerInfo?';
        const url = `${baseUrl}serviceKey=${apikey}&pageNo=${pageNo}&numOfRows=${showCnt}&zcode=${cityRef.current.value}&zscode=${areaRef.current.value}&kind=${kindRef.current.value}&dataType=JSON`;

        const resp = await fetch(url);
        const data = await resp.json();
        setTotalCnt(data.totalCount);
        setTdata(data.items.item);
    }

    const handleCity = () => {
        if(cityRef.current.value == "") return;
        setArea(zscode[cityRef.current.value]);
    }

    const handleArea = () => {
        if(areaRef.current.value == "") return;
        if(cityRef.current.value == "") {
            alert("지역을 선택하세요");
            cityRef.current.focus();
            return;
        }
    }

    const handleKind = () => {
        if(kindRef.current.value == "") return;
        if(cityRef.current.value == "") {
            alert("지역을 선택하세요");
            cityRef.current.focus();
            return;
        }
    }

    const validateFrm = () => {
        if(cityRef.current.value == "") {
            alert("지역을 선택하세요");
            cityRef.current.focus();
            return;
        }
    }

    const handleSearch = (pageNo=1) => {
        validateFrm();
        getSearchData(pageNo);
        if(curPage != 0 ) setCurPage(pageNo);
    }

    const handlePage = (page) => {
        // 시간 되면 loading gif같은거 넣어주기
        setCurPage(page);
        getSearchData(page);
    }

    const getDetailInfos = (ut, st, ct, bi, kid, dt) => {
        const useTime = ut;
        const statVal = "충전기 상태: " + stat[st];
        const cType = "충전기 타입: " + chargertype[ct];
        const idx = Object.values(kinddetail[kid]).findIndex((val) => val == dt);
        const kindDt = "충전소 상세: " + Object.keys(kinddetail[kid])[idx];
        const id = "기관: " + busid[bi];
        return [useTime, statVal, cType, id, kindDt].join(",");
    }

    useEffect(() => {
        if(tdata.length == 0) return;
        const listTags = tdata.map((item,idx) => 
            <TailCard key={idx}
                        title={item["statNm"]}
                        info={item["addr"]}
                        kwds={getDetailInfos(item["useTime"],item["stat"], item["chgerType"], item["busiId"], item["kind"], item["kindDetail"])} />
        )
        setLists(listTags);
    }, [tdata]);

    // useEffect(()=>{},[curPage])로 하면 검색 마다 curPage 초기화 될 경우 fetch요청이 두 번 될 수 있어서 지움
    /* useEffect(() => {
        if(tdata.length == 0) return;
        getSearchData(curPage);
    }, [curPage]); */

  return (
    <>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <TailSelect refName={cityRef} onHandle={handleCity} 
                opKeys={Object.keys(zcode)} opValues={Object.values(zcode)} 
                caption="지역 선택"/>
            <TailSelect refName={areaRef} onHandle={handleArea}
                opKeys={Object.values(area)} opValues={Object.keys(area)} 
                caption="지역 동 선택"/>
            <TailSelect refName={kindRef} onHandle={handleKind} 
                opKeys={Object.keys(kind)} opValues={Object.values(kind)} 
                caption="충전소 구분 선택"/>
            <TailButton color="blue" caption="검색" onHandle={()=>handleSearch(1)} />
        </div>
        <div>
            <div className="w-full grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
                {lists}
            </div>
            <div className="w-full h-full hidden">
                <AiOutlineLoading3Quarters />
            </div>
        </div>
        <TailPageNation currentPage={curPage} totalPage={totalPage} onPageChange={(page) => handlePage(page)} />
    </>
  )
}