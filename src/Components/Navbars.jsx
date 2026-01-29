export default function Navs() {
    return(
    <div className="border-b-1 border-gray-500 bg-black">
    <div className="flex mx-auto w-[90%] justify-between py-3">
        <div className="text-5xl font-semibold text-white"><h1>Auth-Mern</h1></div>
        <div className="p-4" >
            <nav className="flex text-xl gap-7 text-gray-400">
            <div className="">About</div>
            <div>Projects</div>
            <div>Contact</div>
            </nav>
        </div>
    </div>
    </div>
    )
}