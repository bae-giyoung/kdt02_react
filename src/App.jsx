import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AppNav from './AppNav'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg' // root는 public을 기준으로 한다.
import './App.css'
import GroupText from './01/GroupText' // jsx의 확장자는 생략 가능
import MyDiv from './03/MyDiv'
import MyList from './04/MyList'
import Lotto from './05/Lotto'
import Lotto2 from './05/Lotto2'
import FoodMain from './06/FoodMain'
import FoodMain2 from './06/FoodMain2'
import MyToggle from './07/MyToggle'
import MyEffect from './08/MyEffect'
import MyClock from './02/MyClock'
import BoxOffice from './09/BoxOffice'
import Traffic from './10/Traffic'
import Traffic2 from './10/Traffic2'
import MyRef from './11/MyRef'
import MyRef2 from './11/MyRef2'
import Gallery from './12/Gallery'
import Festival from './13/Festival'
//import RouteMain from './14/RouteMain'
import Fcst from './15/Fcst'
import FcstList from './15/FcstList'
import MyDivState from './17/MydivState'

// [컴포넌트란]
// 컴포넌트 == 사용자 정의 태그
// 컴포넌트를 만든다는 것 == 함수(컴포넌트를 만들기 위한)를 만든다는 것

// 컴포넌트 별로 jsx파일을 만들 되,
// - 컴포넌트명(함수명) == jsx파일명
// - 컴포넌트명은 반드시 대문자로 시작해야 한다!
// - 컴포넌트를 만들기 때문에 jsx내 함수는 반드시 return을 반드시 해야 한다! html 태그 하나를 리턴한다. html 태그는 반드시 하나만 리턴한다! 하위 요소는 얼마든지 가능
//    => <></> 프래그먼트 태그: 하나로 묶어주는 역할만 함. 노드가 생기지 않음.

function App() {

  return (
    <BrowserRouter>
      <div className="w-full xl:w-8/10 mx-auto h-screen
                    flex flex-col justify-start items-start">
        <header className='w-full min-h-20 flex justify-between items-center
                          bg-amber-50 px-10'>
          <div className='flex gap-2'>
            <img src={reactLogo} alt="react logo" />
            +
            <img src={viteLogo} alt="vite logo" />
          </div>
          <AppNav />
          <GroupText />
        </header>
        <main className='w-full flex-grow overflow-y-auto py-10
                        flex flex-col justify-start items-center'>
          <Routes>
            <Route path='/' element={<MyClock />} />
            <Route path='/lotto' element={<Lotto />} />
            <Route path='/food' element={<FoodMain />} />
            <Route path='/toggle' element={<MyToggle />} />
            <Route path='/effect' element={<MyEffect />} />
            <Route path='/boxoffice' element={<BoxOffice />} />
            <Route path='/traffic' element={<Traffic />} />
            <Route path='/gallery' element={<Gallery />} />
            <Route path='/festival' element={<Festival />} />
            <Route path='/fcst' element={<Fcst />} />
            <Route path='/divState' element={<MyDivState />} />
          </Routes>
        </main>
        <footer className='w-full min-h-20 flex justify-center items-center
                          bg-black text-white'>
          K-Digital 2025 2기
        </footer>
      </div>
    </BrowserRouter>
  )
}

export default App
