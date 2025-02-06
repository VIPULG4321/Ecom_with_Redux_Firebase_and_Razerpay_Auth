import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { addToCart } from "../features/cartSlice";
import { toast } from "react-toastify";

import { auth, db } from "./firebase";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [similarProducts, setSimilarProducts] = useState([]);
  // for auth 
  const [userDetails, setUserDetails] = useState(null);
  const navigate = useNavigate();

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

  // check auth
  const fetchUserData = async () => {
      auth.onAuthStateChanged(async (user) => {
        console.log(user);
  
        const docRef = doc(db, "Users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUserDetails(docSnap.data());
          console.log(docSnap.data());
        } else {
          console.log("User is not logged in");
        }
      });
    };

  const handleAddToCart = () => {
    const productData = {
      id: product.id,
      title: product.title,
      price: product.price,
      quantity: quantity,
      images: product.images,
    };

    console.log("Added to cart", productData);
    dispatch(addToCart(productData));

    const data = localStorage.getItem("cart");
    let cart = data ? JSON.parse(data) : [];

    const existingProductIndex = cart.findIndex(item => item.id === productData.id);

    if (existingProductIndex !== -1) {
        cart[existingProductIndex].quantity += productData.quantity;
    } else {
        cart.push(productData);
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    toast.success("Product added to cart", {
      position: "bottom-right",
    });
  };

  useEffect(() => {
    fetch(`https://dummyjson.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        fetchSimilarProducts(data.category);
      })
      .catch((error) =>
        console.error("Error fetching product details:", error)
      );
      fetchUserData();
  }, [id]);

  const fetchSimilarProducts = (category) => {
    fetch(`https://dummyjson.com/products/category/${category}`)
      .then((res) => res.json())
      .then((data) => setSimilarProducts(data.products))
      .catch((error) =>
        console.error("Error fetching similar products:", error)
      );
  };

  const handleLogin = () => {
    navigate("/login");
  };
  if (!product) return <p>Loading product details...</p>;

  return (
    <div>
      {
        userDetails ? (
          <div className="max-w-4xl mx-auto p-6">
      <div className="max-w-4xl mx-auto p-6">

        <div className="flex flex-col md:flex-row gap-6 border p-4 rounded shadow-md bg-white">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="w-full md:w-1/3 rounded-lg object-cover md:h-auto h-[50vh] sm:h-[60vh]"
          />
          <div className="flex flex-col justify-between">
            <h1 className="text-2xl font-bold">{product.title}</h1>
            <p className="text-gray-600 mt-2">{product.description}</p>
            <p className="text-lg font-semibold mt-2 text-blue-600">
              ₹{product.price}
            </p>
            <p className="text-yellow-500 mt-1">⭐ {product.rating} / 5</p>


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

            <button
              onClick={handleAddToCart}
              className="mt-4 bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      {/* similar products in details page */}
      {similarProducts.length > 0 && (
        <div className="mt-8 overflow-hidden">
          <h2 className="text-xl font-bold mb-4">Similar Products</h2>
          <div className="w-full overflow-hidden">
            <div className="flex gap-6 w-[900px] md:w-[1200px] overflow-x-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 p-2 border rounded-lg">
              {similarProducts.slice(0, 10).map((item) => (
                <div
                  key={item.id}
                  className="min-w-[200px] md:min-w-[350px] h-[400px] border rounded-lg p-4 shadow-sm hover:shadow-md transition snap-center"
                >
                  <Link to={`/products/${item.id}`}>
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="w-full h-[250px] object-cover rounded-md"
                    />
                    <h3 className="font-semibold mt-3 text-lg">{item.title}</h3>
                    <p className="text-md text-gray-700 font-medium">
                      ₹{item.price}
                    </p>
                  </Link>
                  
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
        ) : (
          <div className="p-4 bg-blue-50 border border-blue-300 rounded-lg text-center">
          <p className="text-blue-600 text-sm flex items-center justify-center gap-1">
          User might not be registered? Please login first  
          <span 
            onClick={handleLogin} 
            className="text-blue-700 font-semibold cursor-pointer hover:underline"
          >
            Click here
          </span>
        </p>
</div>
        )
      }

    </div>
    
  );
};

export default ProductDetails;
