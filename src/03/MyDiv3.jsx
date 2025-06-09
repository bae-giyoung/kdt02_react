import { GoArrowRight } from "react-icons/go";
export default function MyDiv3({dName1, dName2, dName3}) {
    return (
        <div className="w-full h-full bg-amber-400 p-[5%]
                        flex flex-col items-start justify-start gap-5">
            <p className="flex items-center gap-2">
                {dName1} <GoArrowRight /> {dName2} <GoArrowRight /> {dName3}
            </p>
        </div>
    )
}