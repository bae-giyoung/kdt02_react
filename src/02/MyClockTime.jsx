function MyClockTime() {
    return (
        <>
            <p className="text-3xl font-extrabold text-shadow-black">
                현재 시각 : {new Date().toLocaleTimeString()}
            </p>
        </>
    )
}

export default MyClockTime;