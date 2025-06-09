export default function MyListItem() {
    let imgUrl = '/img/css.png';
    let title = 'CSS';
    let content = 'Cascading Style Sheets(CSS)는 HTML이나 XML(XML의 방언인 SVG, XHTML 포함)로 작성된 문서의 표시 방법을 기술하기 위한 스타일 시트 언어';
    return (
        <div className="w-full h-50 flex justify-start items-start
                        border-gray-400 m-auto">
            <div className="w-1/4 h-full flex flex-col justify-center items-start bg-red-100">
                <img src={imgUrl} alt={title} />
            </div>
            <div className="w-3/4 h-full flex flex-col justify-center items-start bg-blue-100 gap-5 p-5">
                <div className="text-start">
                    <h1>{title}</h1>
                    <p>{content}</p>
                </div>
                <div className="w-full flex justify-end">
                    좋아요
                </div>
            </div>
        </div>
    )
}
