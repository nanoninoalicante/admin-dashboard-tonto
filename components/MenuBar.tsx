import Link from "next/link";


const MenuBar = (props: any) => {
    const select = "bg-gray-900 text-white px-3 py-2 w-[7em] flex justify-center rounded-md text-sm font-medium";
    const noSelect = "text-gray-300 hover:bg-gray-700 w-[7em] flex justify-center hover:text-white px-3 py-2 rounded-md text-sm font-medium"
    return (
        <>
            <nav className="bg-[#17255A]">
                <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                    <div className="relative flex h-16 items-center justify-center">
                        <div className="flex items-center justify-center sm:items-stretch sm:justify-start">
                            <div className="hidden sm:ml-6 sm:block">
                                <div className="flex space-x-4">
                                    <Link href="/tags" className={props.props=== "tags" ? select : noSelect} aria-current="page">TAGS</Link>
                                    <Link href="/interests" className={props.props === "interests" ? select : noSelect}>INTERESTS</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="sm:hidden" id="mobile-menu">
                    <div className="space-y-1 px-2 pt-2 pb-3">
                        <Link href="/tags" className="bg-gray-900 text-white block px-3 py-2 rounded-md text-base font-medium" aria-current="page">TAGS</Link>
                        <Link href="/interests" className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">INTERESTS</Link>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default MenuBar;