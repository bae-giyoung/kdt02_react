import { Link } from "react-router-dom"

export default function AppNav() {
  return (
    <div className="flex justify-center items-center">
        <Link to="/" className="hover:text-black">
            <div className="p-2 m-2 hover:border-b-1 bg-amber-50 font-bold">
                Home
            </div>
        </Link>
        <Link to="/lotto" className="hover:text-black">
            <div className="p-2 m-2 hover:border-b-1 bg-amber-50 font-bold">
                Lotto
            </div>
        </Link>
        <Link to="/food" className="hover:text-black">
            <div className="p-2 m-2 hover:border-b-1 bg-amber-50 font-bold">
                Food
            </div>
        </Link>
        <Link to="/toggle" className="hover:text-black">
            <div className="p-2 m-2 hover:border-b-1 bg-amber-50 font-bold">
                Toggle
            </div>
        </Link>
        <Link to="/effect" className="hover:text-black">
            <div className="p-2 m-2 hover:border-b-1 bg-amber-50 font-bold">
                Effect
            </div>
        </Link>
        <Link to="/boxoffice" className="hover:text-black">
            <div className="p-2 m-2 hover:border-b-1 bg-amber-50 font-bold">
                Box Office
            </div>
        </Link>
        <Link to="/traffic" className="hover:text-black">
            <div className="p-2 m-2 hover:border-b-1 bg-amber-50 font-bold">
                Traffic
            </div>
        </Link>
        <Link to="/gallery" className="hover:text-black">
            <div className="p-2 m-2 hover:border-b-1 bg-amber-50 font-bold">
                Gallery
            </div>
        </Link>
        <Link to="/festival" className="hover:text-black">
            <div className="p-2 m-2 hover:border-b-1 bg-amber-50 font-bold">
                Festival
            </div>
        </Link>
        <Link to="/fcst" className="hover:text-black">
            <div className="p-2 m-2 hover:border-b-1 bg-amber-50 font-bold">
                Fcst
            </div>
        </Link>
    </div>
  )
}
