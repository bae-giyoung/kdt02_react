export default function TailButton({caption, color, onHandle}) {

    const bg = {
        "blue" : "bg-blue-800",
        "orange" : "bg-orange-800",
        "lime" : "bg-lime-800",
    }
    return (
        <button type="button" 
                onClick={onHandle}
                className={`mt-5 bg-amber-950 ${bg[color]} text-white 
                                        font-extrabold text-2xl w-50 h-12 rounded-lg
                                        hover:cursor-pointer`}>
            {caption}
        </button>
    )
}