import FoodCard from './FoodCard'
import FoodData from './fooddata.json'

export default function FoodMain() {
    return (
        <div className="w-8/10 grid gap-5 grid-cols-1 lg:grid-cols-2">
        {
            FoodData.map(item => <FoodCard item={item} key={item["사업장명"]} />)
        }
        </div>
    )
}
