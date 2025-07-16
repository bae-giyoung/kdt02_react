import TailButton from '../component/TailButton'

export default function MydivState3({onHandle, n1}) {
    return (
            <div className="w-full h-full bg-green-500 p-[5%]
                            flex flex-col items-start justify-start gap-5">
                <p className="flex items-center gap-2">
                    div3
                </p>
                <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <TailButton caption="증가" onHandle={()=>onHandle(n1+1)} color="blue"/>
                    <TailButton caption="감소" onHandle={()=>{if (n1 <= 0) return; onHandle(n1-1)}} color="blue"/>
                </div>
            </div>
    )
}
