expor function ProductCard({ img, title = 'Product', price = '$99', oldPrice }) {
  return (
    <article className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="h-56 bg-gray-100">
        <img src={img} alt={title} className="w-full h-full object-cover" />
      </div>
      <div className="p-4">
        <h5 className="font-medium">{title}</h5>
        <div className="mt-2 flex items-baseline gap-2">
          {oldPrice && <span className="text-sm text-slate-600 line-through">{oldPrice}</span>}
          <span className="text-lg font-semibold">{price}</span>
        </div>
        <div className="mt-3 flex gap-2">
          <button className="flex-1 text-sm py-2 rounded bg-black text-white">Buy Now</button>
          <button className="px-3 py-2 border rounded text-sm">Details</button>
        </div>
      </div>
    </article>
  );
}