import { useParams } from "react-router-dom"

export default function RoutePage1() {
  const {item1, item2} = useParams();
  const data = ['사과', '바나나'];
  console.log(item1, item2)
  return (
    <div className="mt-10">
      {
        item1 == 'm' ? '메뉴를 선택하세요.'
        : `${item2} ${item1}는 ${data.includes(item1) ? "과일입니다." : "과일이 아닙니다."}`
      }
    </div>
  )
}
