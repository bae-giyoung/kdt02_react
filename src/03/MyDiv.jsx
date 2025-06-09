import MyDiv2 from '../03/MyDiv2'

export default function MyDiv() {
    const x = 'div1';
    const y = 'div2';
    const z = 'div3';

    return (
        <div className="w-9/10 h-4/5 bg-amber-900 min-h-80
                    flex flex-col items-start justify-start gap-5
                    text-white text-2xl font-bold p-[5%]">
            {x}
            <MyDiv2 dName1={x} dName2={y} dName3={z} />
        </div>
    )
}
