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
    // 뭔가 느린 느낌이라 확인해보기!!!!! form으로 안한 것도 생각해보기!
    const [tdata, setTdata] = useState([]);
    const [lists, setLists] = useState([]);
    const [area, setArea] = useState([]);
    const [totalCnt, setTotalCnt] = useState(0);
    const [curPage, setCurPage] = useState(1);
    const cityRef = useRef();
    const areaRef = useRef();
    const kindRef = useRef();
    const isInit = useRef(true);
    const showCnt = 12;
    const totalPage = totalCnt != 0 ? Math.ceil(totalCnt / showCnt) : 1;

    const getSearchData = async (pageNo) => {
        const loadingImg = document.querySelector("#loadingImg");
        loadingImg.classList.remove("hidden");

        const apikey = import.meta.env.VITE_DATA_API;
        const baseUrl = 'https://apis.data.go.kr/B552584/EvCharger/getChargerInfo?';
        const url = `${baseUrl}serviceKey=${apikey}&pageNo=${pageNo}&numOfRows=${showCnt}&zcode=${cityRef.current.value}&zscode=${areaRef.current.value}&kind=${kindRef.current.value}&dataType=JSON`;

        const resp = await fetch(url);
        const data = await resp.json();
        setTotalCnt(data.totalCount);
        setTdata(data.items.item);

        loadingImg.classList.add("hidden");
    }

    const handleCity = () => {
        if(cityRef.current.value == "") 
            setArea([]); // city가 변경되면 area의 option들이 다시 그려지기 때문에 return문이 아닌 빈 배열로 초기화해줬음
        else 
            setArea(zscode[cityRef.current.value]);
    }

    const handleSels = (selRef) => {
        if(selRef.current.value == "") return;
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
            return false;
        }
        return true;
    }

    const handleSearch = () => {
        if(validateFrm()) {
            isInit.current = false;
            getSearchData(1);
            setCurPage(1);
        }
    }

    const handlePage = (page) => {
        if(validateFrm()) {
            setCurPage(page);
            getSearchData(page);
        }
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
        if(isInit.current) return;

        const listTags = tdata.map((item,idx) => 
            <TailCard key={idx}
                        title={item["statNm"]}
                        info={item["addr"]}
                        kwds={getDetailInfos(item["useTime"],item["stat"], item["chgerType"], item["busiId"], item["kind"], item["kindDetail"])} />
        )
        
        setLists(listTags);
    }, [tdata]);

    // useEffect(()=>{},[curPage])로 하면 검색 마다 curPage 초기화 될 경우 fetch요청이 두 번 될 수 있어서 지울것
    /* useEffect(() => {
        if(tdata.length == 0) return;
        if(!isDiffSearch) {
            console.log("paging : " + isDiffSearch);
            getSearchData(curPage);
        } // 다른 종류의 검색이 아닌 경우, 페이지 이동의 경우
    }, [curPage]); */

  return (
    <>
        <div className="w-full grid grid-cols-2 lg:grid-cols-4 gap-4">
            <TailSelect refName={cityRef} onHandle={handleCity} 
                opKeys={Object.keys(zcode)} opValues={Object.values(zcode)} 
                caption="지역 선택"/>
            <TailSelect refName={areaRef} onHandle={() => handleSels(areaRef)}
                opKeys={Object.values(area)} opValues={Object.keys(area)} 
                caption="지역 동 선택"/>
            <TailSelect refName={kindRef} onHandle={() => handleSels(kindRef)} 
                opKeys={Object.keys(kind)} opValues={Object.values(kind)} 
                caption="충전소 구분 선택"/>
            <TailButton color="blue" caption="검색" onHandle={handleSearch} />
        </div>
        <div className="relative mt-8 mb-5">
            <div className="w-full h-full grid grid-cols-2 lg:grid-cols-4 gap-4 box-border">
                {lists}
            </div>
            <div id="loadingImg" className="absolute w-full h-full left-0 top-0 bg-gray-500/20 hidden overflow-hidden box-border">
                <AiOutlineLoading3Quarters className="w-8/10 h-8/10 max-w-[200px] max-h-[200px] animate-spin absolute left-1/2 top-1/2 -translate-1/2" />
            </div>
        </div>
        <TailPageNation currentPage={curPage} totalPage={totalPage} onPageChange={(page) => handlePage(page)} />
    </>
  )
}