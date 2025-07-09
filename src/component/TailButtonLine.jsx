export default function TailButtonLine({onHandler, color}) {
    const bgHovers = {
        'blue':'hover:bg-blue-200',
        'orange':'hover:bg-orange-200',
        'lime':'hover:bg-lime-200'
    }
    return (
      <button type='button' 
          className={`my-7 bg-amber-50 p-3 border-2 ${bgHovers[color]}`}
          onClick={onHandler}>toggle {color}</button>
    )
}
