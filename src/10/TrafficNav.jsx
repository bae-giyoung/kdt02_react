import TailButton from "../05/TailButton"

export default function TrafficNav({title, handler}) {
//export default function TrafficNav({title, c, selC, setSelC}) {
    return (
        <TailButton color="blue" caption={title} onHandle={handler}/>
        //<TailButton color={title == selC ? "orange" : "blue"} caption={title} onHandle={()=>setSelC(selC)}/>
    )
}
