// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchProducts } from "../features/searchSlice";

// const SearchResults = () => {
//   const dispatch = useDispatch();
//   const { filteredProducts, status } = useSelector((state) => state.search);

//   useEffect(() => {
//     dispatch(fetchProducts());
//   }, [dispatch]);

//   if (status === "loading") return <p>Loading...</p>;
//   if (status === "failed") return <p className="text-red-500">Failed to load products.</p>;

//   return (
//     <div className="mt-4">
//       {filteredProducts.length > 0 ? (
//         <ul className="border p-4 rounded">
//           {filteredProducts.map((product) => (
//             <li key={product.id} className="p-2 border-b">
//               {product.title} - ${product.price}
//             </li>
//           ))}
//         </ul>
//       ) : (
//         <p>No products found.</p>
//       )}
//     </div>
//   );
// };

// export default SearchResults;

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../features/searchSlice";
import { Link } from "react-router-dom";

const SearchResults = () => {
  const dispatch = useDispatch();
  const { filteredProducts, status } = useSelector((state) => state.search);

  const handleAddToCart = (product) => {
    // This function will handle adding the product to the cart
    console.log("Product added to cart:", product);
  };
  

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (status === "loading") return <p>Loading...</p>;
  if (status === "failed") return <p className="text-red-500">Failed to load products.</p>;

  return (
    <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
  {filteredProducts.length > 0 ? (
    filteredProducts.map((product) => (
      <div
        key={product.id}
        className="border rounded-lg shadow-lg p-4 bg-white flex flex-col items-center text-center"
      >
        <Link to={`/products/${product.id}`} className="w-full">
          <img
            src={product.images} // Assuming products have an image property
            alt={product.title}
            className="w-32 h-32 object-cover rounded-md mx-auto"
          />
          <h2 className="text-lg font-semibold mt-2">{product.title}</h2>
          <p className="text-gray-600">Price : ${product.price}</p>
          <p className="text-yellow-500">⭐ {product.rating}</p>
        </Link>
        {/* <button
          onClick={() => handleAddToCart(product)}
          className="mt-3 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add to Cart
        </button> */}
      </div>
    ))
  ) : (
    <p className="col-span-full text-center">No products found.</p>
  )}
</div>
  );
};

export default SearchResults;
