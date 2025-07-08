import TailButton from "../05/TailButton"

export default function TrafficNav2({title, c, sel, setSel}) {
    const tag = c.map(item => <TailButton caption={item} color={item == sel ? "orange" : "blue"} onHandle={()=>setSel(item)} key={item}/>);

    return (
        <div className="w-full h-12 flex justify-between items-center">
            <div className="font-extrabold text-lg">교통사고 {title}</div>
            <div className="flex gap-2">
                {tag}
            </div>
        </div>
    )
}
