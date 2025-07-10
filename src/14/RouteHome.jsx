import { Link, useNavigate } from "react-router-dom"
import TailButton from "../component/TailButton"

export default function RouteHome() {
  const navigate = useNavigate(); // 함수를 반환

  return (
    <div className='w-9/10 flex flex-col justify-center items-center mt-10'>
      <h1 className='text-2xl font-bold text-center'>RouteHome</h1>
      <ul className='w-60'>
        <li className='m-2 border border-amber-700 hover:bg-amber-100'>
          <Link to='/p1/사과/🍎' className="block w-full h-full p-4">사과 🍎</Link>
        </li>
        <li className='m-2 border border-amber-700 hover:bg-amber-100'>
          <Link to='/p1/당근/🥕' className="block w-full h-full p-4">당근 🥕</Link></li>
        <li className='m-2 border border-amber-700 hover:bg-amber-100'>
          <Link to='/p1/바나나/🍌' className="block w-full h-full p-4">바나나 🍌</Link>
        </li>
      </ul>
      <div className="w-60 grid grid-cols-1">
        <TailButton caption="사과 🍎" color="lime" onHandle={()=>navigate('/p2?item1=사과&item2=🍎')} />
        <TailButton caption="당근 🥕" color="lime" onHandle={()=>navigate('/p2?item1=당근&item2=🥕')} />
        <TailButton caption="바나나 🍌" color="lime" onHandle={()=>navigate('/p2?item1=바나나&item2=🍌')} />
      </div>
    </div>
  )
}
