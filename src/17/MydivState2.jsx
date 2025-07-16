import MydivState3 from "./MydivState3";

export default function MydivState2() {
    return (
                <div className="w-full h-full bg-green-700 p-[5%]
                                flex flex-col items-start justify-start gap-5">
                    <p className="flex items-center gap-2">
                        div2
                    </p>
                    <MydivState3 />
                </div>
    )
}
