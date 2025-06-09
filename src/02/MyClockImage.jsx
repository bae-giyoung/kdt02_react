import clock from '../assets/clock.png'

function MyClockImage() {
    return (
        <div className="w-full flex justify-center m-auto mb-3.5">
            <img src={clock} alt="시계" className="w-2/3" />
        </div>
    )
}

export default MyClockImage;