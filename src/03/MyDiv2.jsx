import MyDiv3 from "./MyDiv3"
import { GoArrowRight } from "react-icons/go";

export default function MyDiv2({dName1, dName2, dName3}) { // props는 Object
    return (
        <div className="w-full h-full bg-amber-600 p-[5%]
                        flex flex-col items-start justify-start gap-5">
            <p className="flex items-center gap-2">
                {dName1} <GoArrowRight /> {dName2}
            </p>
            <MyDiv3 dName1={dName1} dName2={dName2} dName3={dName3}/>
        </div>
    )
}