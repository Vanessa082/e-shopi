import { getMenu } from "@/lib/shopify"
import { ASSETS } from "@/lib/utils"

export async function Navbar() {
  const menu = await getMenu("e-shopi")
  console.log(menu)
  return (
    <header className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
      <nav className="flex items-center gap-8">
        <img src={ASSETS.logo} alt="Velaa" className="w-28 h-auto" />
        <ul className="hidden md:flex gap-6 text-sm font-medium text-slate-700">
          <li><a href="#">Women</a></li>
          <li><a href="#">Men</a></li>
          <li><a href="#">Collections</a></li>
          <li><a href="#">Company</a></li>
        </ul>
      </nav>


      <div className="flex items-center gap-4">
        <button aria-label="search" className="text-sm text-slate-700">Search</button>
        <button aria-label="cart" className="text-sm text-slate-700">Cart (0)</button>
        <div className="w-10 h-10 bg-slate-200 rounded-full" aria-hidden />
      </div>
    </header>
  )
}