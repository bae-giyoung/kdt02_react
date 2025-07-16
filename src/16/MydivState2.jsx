import MydivState3 from "./MydivState3";

export default function MydivState2({onHandle, n1}) {
    return (
                <div className="w-full h-full bg-green-700 p-[5%]
                                flex flex-col items-start justify-start gap-5">
                    <p className="flex items-center gap-2">
                        div2
                    </p>
                    <MydivState3 onHandle={onHandle} n1={n1}/>
                </div>
    )
}
