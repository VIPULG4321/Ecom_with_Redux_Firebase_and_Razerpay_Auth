import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../features/cartSlice";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [similarProducts, setSimilarProducts] = useState([]);

  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddToCart = () => {
    // Create the product data with the quantity
    const productData = {
      id: product.id,
      title: product.title,
      price: product.price,
      quantity: quantity,
    };

    // Dispatch the action to add/update the product in the cart
    console.log("Added to cart : ",productData);
    dispatch(addToCart(productData));
    };

  useEffect(() => {
    fetch(`https://dummyjson.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        fetchSimilarProducts(data.category);
      })
      .catch((error) => console.error("Error fetching product details:", error));
  }, [id]);

  const fetchSimilarProducts = (category) => {
    fetch(`https://dummyjson.com/products/category/${category}`)
      .then((res) => res.json())
      .then((data) => setSimilarProducts(data.products))
      .catch((error) => console.error("Error fetching similar products:", error));
  };

  // const handleAddToCart = () => {
  //   console.log("Added to cart:", product);
  // };

  if (!product) return <p>Loading product details...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Product Details */}
      {/* <div className="flex flex-col md:flex-row gap-6 border p-4 rounded shadow-md bg-white">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="w-full md:w-1/3 rounded-lg object-cover"
        />
        <div>
          <h1 className="text-2xl font-bold">{product.title}</h1>
          <p className="text-gray-600 mt-2">{product.description}</p>
          <p className="text-lg font-semibold mt-2 text-blue-600">${product.price}</p>
          <p className="text-yellow-500 mt-1">⭐ {product.rating} / 5</p>
          <button
            onClick={handleAddToCart}
            className="mt-4 bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
          >
            Add to Cart
          </button>
        </div>
      </div> */}

      {/* <div className="flex flex-col md:flex-row gap-6 border p-4 rounded shadow-md bg-white">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="w-full md:w-1/3 rounded-lg object-cover md:h-auto h-[50vh] sm:h-[60vh]"
        />
        <div className="flex flex-col justify-between">
          <h1 className="text-2xl font-bold">{product.title}</h1>
          <p className="text-gray-600 mt-2">{product.description}</p>
          <p className="text-lg font-semibold mt-2 text-blue-600">${product.price}</p>
          <p className="text-yellow-500 mt-1">⭐ {product.rating} / 5</p>
          <button
            onClick={handleAddToCart}
            className="mt-4 bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
          >
            Add to Cart
          </button>
        </div>
      </div> */}

<div className="max-w-4xl mx-auto p-6">
      {/* Product Details */}
      <div className="flex flex-col md:flex-row gap-6 border p-4 rounded shadow-md bg-white">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="w-full md:w-1/3 rounded-lg object-cover md:h-auto h-[50vh] sm:h-[60vh]"
        />
        <div className="flex flex-col justify-between">
          <h1 className="text-2xl font-bold">{product.title}</h1>
          <p className="text-gray-600 mt-2">{product.description}</p>
          <p className="text-lg font-semibold mt-2 text-blue-600">${product.price}</p>
          <p className="text-yellow-500 mt-1">⭐ {product.rating} / 5</p>

          {/* Quantity Controls */}
          <div className="mt-4 flex items-center gap-4">
            <button
              onClick={decreaseQuantity}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400"
            >
              -
            </button>
            <span className="text-lg font-semibold">{quantity}</span>
            <button
              onClick={increaseQuantity}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400"
            >
              +
            </button>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            className="mt-4 bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>

{/* similar products  */}
{similarProducts.length > 0 && (
  <div className="mt-8 overflow-hidden">
    <h2 className="text-xl font-bold mb-4">Similar Products</h2>
    <div className="w-full overflow-hidden">
      <div className="flex gap-6 w-[900px] md:w-[1200px] overflow-x-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 p-2 border rounded-lg">
        {similarProducts.slice(0, 10).map((item) => (
          <div
            key={item.id}
            className="min-w-[300px] md:min-w-[350px] h-[400px] border rounded-lg p-4 shadow-sm hover:shadow-md transition snap-center"
          >
            <img
              src={item.thumbnail}
              alt={item.title}
              className="w-full h-[250px] object-cover rounded-md"
            />
            <h3 className="font-semibold mt-3 text-lg">{item.title}</h3>
            <p className="text-md text-gray-700 font-medium">${item.price}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
)}


    </div>
  );
};

export default ProductDetails;
