import TailButton from '../05/TailButton'

export default function GallerySearch({keyRef, onHandle1, onHandle2}) {
    return (
        <div className='w-8/10 lg:w-6/10 mt-8
                        grid grid-cols-2'>
            <input type="text" ref={keyRef} name='' className='block p-2 ps-2 mx-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-white focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'/>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-2'>
                <TailButton caption='확인' color='blue' onHandle={onHandle1}/>
                <TailButton caption='취소' color='blue' onHandle={onHandle2}/>
            </div>
        </div>
    )
}
