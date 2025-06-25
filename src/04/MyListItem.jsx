// useStatehook 배우기!
// hook은 종류가 많다!
import { useState } from "react";

export default function MyListItem({title, imgUrl, content}) {
    // state 변수! 세터에 의해 변경되는 클래스 인스턴스?
    // 구조분해 const [state 변수명, (커스텀)세터명]
    const [cnt=0, setCnt] = useState(); // hook

    const handleUp = () => {
        setCnt(cnt+1);
        //console.log(title, cnt); // 이것에 대해 더 알아보기!
    }

    const handleDown = () => {
        if(cnt-1 < 0) return;
        setCnt(cnt-1);
    }

    return (
        <div className="w-full h-50 flex justify-start items-start
                        border-gray-400 m-auto border rounded-xl overflow-hidden">
            <div className="w-1/4 h-full flex flex-col justify-start items-start">
                <img className="rounded-br-xl" src={imgUrl} alt={title} />
            </div>
            <div className="w-3/4 h-full flex flex-col justify-between items-start p-5">
                <div className="text-start">
                    <h1 className="font-extrabold text-2xl mb-1">{title}</h1>
                    <p>{content}</p>
                </div>
                <div className="w-full flex justify-end">
                    <span className="cursor-pointer hover:font-extrabold select-none"
                            onClick={handleUp}>❤좋아요</span>
                    <span className="cursor-pointer hover:font-extrabold select-none ml-3"
                            onClick={handleDown}>👎싫어요</span>
                    <span className="ml-2 font-bold">{cnt}</span>
                </div>
            </div>
        </div>
    )
}
