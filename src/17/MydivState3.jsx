import TailButton from '../component/TailButton';
import { useAtom } from 'jotai';
import { cntAtom, cntAtom2 } from "./CountAtoms";

export default function MydivState3() {
    const [n1, setN1] = useAtom(cntAtom);

    const handleUp = () => {
        setN1(n1+1);
    }

    const handleDown = () => {
        if (n1 <= 0) return;
        setN1(n1-1);
    }

    return (
            <div className="w-full h-full bg-green-500 p-[5%]
                            flex flex-col items-start justify-start gap-5">
                <p className="flex items-center gap-2">
                    div3
                </p>
                <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <TailButton caption="증가" onHandle={handleUp} color="blue"/>
                    <TailButton caption="감소" onHandle={handleDown} color="blue"/>
                </div>
            </div>
    )
}
