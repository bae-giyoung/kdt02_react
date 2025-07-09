import defaultImg from '../assets/busan.png'

export default function TailCard2({title, info, imgsrc, kwds}) {
    const keywords = kwds.replaceAll(' ', '').split(',')
                                    .map((t)=><span key={t} className='inline-block px-2 py-0.5 text-sm bg-gray-200 rounded-2xl'>{t}</span>);
    
    // 이미지 에러 -> 리커버 함수
    const onImageError = (e) => {
        //console.log(e.currentTarget, e.currentTarget.getAttribute('src'));
        e.currentTarget.setAttribute('src', defaultImg);
    }

    return (
        <div className='border-1 border-gray-200 shadow-xl'>
            <div className='flex justify-center items-center h-55 overflow-hidden'><img onError={(e) => onImageError(e)} src={imgsrc} className="object-contain"/></div>
            <div className='p-3 text-left'>
                <p className='text-xl font-extrabold truncate'>{title}</p>
                <p className='text-gray-600 mt-1'>{info}</p>
            </div>
            <div className='flex gap-2 flex-wrap px-3 pt-2 pb-4'>
                {keywords}
            </div>
        </div>
    )
}
