import { useState } from 'react'
import TailButtonLine from './TailButtonLine'

export default function MyToggleBox({color}) {
    const [flag, setFlag] = useState(false) // 박스 상태가 바뀌니까 이 컴포넌트에서 useState 사용해야 함!
    const bgColors = {
        'blue':'bg-blue-200',
        'orange':'bg-orange-200',
        'lime':'bg-lime-200'
    }
    let bg = flag ? bgColors[color] : 'bg-white'
    const toggleBg = () => setFlag(!flag)
    // 또는 bg변수 없이 태그의 className 내부에서 ${flag && bgColors[color]} 또는 ${flag ? bgColors[color] : 'bg-white'}

    return (
      <div className='flex flex-col w-full h-full'>
          <div className={`${bg} h-80 flex flex-col justify-center items-center`}>
              <span className='font-extrabold text-xl'>{color}</span>
              <TailButtonLine onHandler={toggleBg} color={color} />
          </div>
      </div>
    )
}