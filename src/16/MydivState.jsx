import { useEffect, useState } from 'react';
import MydivState2 from './MydivState2';

export default function MyDivState() {
    const [n1, setN1] = useState(0);
    const [n2, setN2] = useState(0);

    useEffect(()=>{setN2(n1*2)},[n1]);

    return (
        <div className="w-9/10 h-4/5 bg-green-950 min-h-80
                    flex flex-col items-start justify-start gap-5
                    text-white text-2xl font-bold p-[5%]">
            div1 : n1 = {n1}, n2 = {n2}
            <MydivState2 onHandle={setN1} n1={n1} />
        </div>
    )
}
