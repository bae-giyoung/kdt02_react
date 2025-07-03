import MyToggleBox from "./MyToggleBox"

export default function MyToggle() {
    const colors = ['blue', 'orange', 'lime']

    return (
        <div className='flex gap-2 w-full h-full'>
            {
                colors.map(color => <MyToggleBox color={color} key={color}/>)
            }
        </div>
    )
}