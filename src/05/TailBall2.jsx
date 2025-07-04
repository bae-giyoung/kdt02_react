export default function TailBall2({num}) {
    const bg = [
        "bg-red-200",
        "bg-amber-200",
        "bg-blue-200",
        "bg-green-200",
        "bg-purple-200",
    ]

    return (
        <div className={`w-16 h-16 rounded-full flex justify-center items-center text-2xl font-bold ${bg[Math.floor(num/10)]}`}>
            {num}
        </div>
    )
}