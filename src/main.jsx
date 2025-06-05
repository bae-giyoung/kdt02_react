import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

// 커스텀 컴포넌트는 반드시 태그처럼 사용할 때, 구분하기 위해 HTML 태그는 모두 소문자로, 컴포넌트는 반드시 대문자로 시작하고, 컴포넌트명과 파일명 일치시켜야 한다!