import { useSearchParams } from "react-router-dom";

export default function RoutePage2() {
  const [sparams] = useSearchParams(); // sparams는 객체
  const item1 = sparams.get('item1');
  const item2 = sparams.get('item2');
  const data = ['사과', '바나나'];

  return (
    <div className="mt-10">
      {
        item1 == 'm' ? '메뉴를 선택하세요.'
        : `${item2} ${item1}은/는 ${data.includes(item1) ? "과일입니다." : "과일이 아닙니다."}`
      }
    </div>
  )
}
