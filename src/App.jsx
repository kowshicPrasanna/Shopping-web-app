import { useRef, useEffect, useState } from "react";
import shopImage from "/shop.jpg";
import foot from "/footprint.svg";
import bag from "./assets/bag.svg";
import cartimg from "./assets/cart.svg";
import img1 from "./assets/1.jpg";
import img2 from "./assets/2.jpg";
import img3 from "./assets/3.jpg";
import img4 from "./assets/4.jpg";
import img5 from "./assets/5.jpg";
import img6 from "./assets/6.jpg";
import img7 from "./assets/7.jpg";
import img8 from "./assets/8.jpg";
import img9 from "./assets/9.jpg";
import img10 from "./assets/10.jpg";
import img11 from "./assets/11.jpg";
import img12 from "./assets/12.jpg";
import img13 from "./assets/13.jpg";
import img14 from "./assets/14.jpg";

function App() {
  const imageMap = {
    1: img1,
    2: img2,
    3: img3,
    4: img4,
    5: img5,
    6: img6,
    7: img7,
    8: img8,
    9: img9,
    10: img10,
    11: img11,
    12: img12,
    13: img13,
    14: img14,
  };

  const targetRef = useRef(null);
  const scrollToNextDiv = () => {
    if (targetRef.current) {
      targetRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const [products, setProducts] = useState([]);
  const fetchProducts = async () => {
    const productsData = await fetch(
      "https://676abe38863eaa5ac0df7bd3.mockapi.io/crud/product"
    );
    const productResponse = await productsData.json();
    setProducts(productResponse);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const addToCart = (product) => {
    const productExists = cart.some((item) => item.id === product.id);

    if (productExists) {
      alert(`${product.name} already added to the cart!`);
    } else {
      setCart([...cart, product]);
      setTotal(total + parseInt(product.price));
    }
  };

  const removeCart = (item, index) => {
    cart.splice(index, 1);
    setCart([...cart]);
    setTotal(total - parseInt(item.price));
  };

  return (
    <>
      <div className="flex flex-col">
        <div
          className="bg-cover bg-center h-screen"
          style={{ backgroundImage: `url(${shopImage})`, opacity: 0.8 }}
        >
          <nav className="w-[90%] mx-auto my-[3rem] flex justify-between ">
            <span className="text-white font-bold font-serif text-[3rem]">
              HOOPS{" "}
              <img className="inline w-[3rem] h-[3rem]" src={foot} alt="" />
            </span>
            <span class="fixed top-[1rem] right-[2rem] z-20">
              <button
                className="rounded-full"
                onClick={() => setIsModalOpen(true)}
              >
                <img
                  className="inline w-[4rem] h-[4rem] hover:brightness-0 hover:invert"
                  src={bag}
                  alt=""
                />
              </button>
              <p className="text-white inline">({cart.length})</p>
            </span>
          </nav>
          <div className="flex flex-col items-center justify-center">
            <p className="lg:m-[10rem] text-white text-[5rem] text-center font-bold">
              Feel comfort in each step
            </p>
            <button
              className="bg-white rounded font-bold px-[2rem] py-[1rem] hover:bg-slate-200 "
              onClick={scrollToNextDiv}
            >
              Shop Now
            </button>
          </div>
        </div>

        <div
          ref={targetRef}
          className="pt-[2rem]"
          style={{
            background:
              "linear-gradient(90deg, rgba(241,240,235,1) 34%, rgba(126,126,123,1) 100%)",
          }}
        >
          <h1 className="text-center m-[2rem] text-[3rem] font-bold">
            Trending Collection
          </h1>
          <div className="w-[90%] mx-auto flex justify-even flex-wrap gap-[2rem]">
            {products.map((product, index) => {
              let photo = imageMap[product.id];
              return (
                <div
                  key={index}
                  className="my-[2rem] bg-slate-50 rounded-lg overflow-hidden"
                >
                  <img
                    className="w-[15rem] h-[15rem] object-fit"
                    src={photo}
                    alt={product.name}
                  />
                  <span>
                    <p className="my-[1rem] px-[0.5rem]">{product.name}</p>
                  </span>
                  <span className="flex items-center justify-between mb-[1rem] px-[0.5rem]">
                    <p className=" text-gray-400">Rs. {product.price}</p>
                    <button onClick={() => addToCart(product)}>
                      <img
                        className="w-[1.5rem] h-[2rem]"
                        src={cartimg}
                        alt="Cart"
                      />
                    </button>
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-gray-300 w-[90%] max-w-[600px] p-6 rounded-lg">
              <h2 className="mb-4 text-xl font-bold">Shopping Cart</h2>
              <div>
                {cart.length === 0 ? (
                  <p>Your cart is empty.</p>
                ) : (
                  cart.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between mb-2"
                    >
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-gray-600">Rs. {item.price}</p>
                      </div>
                      <button onClick={() => removeCart(item, index)}>
                        <img
                          className="inline w-[1.5rem] h-[2rem] hover:brightness-0 hover:invert"
                          src="./src/assets/delete.svg"
                          alt=""
                        />
                      </button>
                    </div>
                  ))
                )}
              </div>
              <div className="pt-4 mt-8 border-t">
                <div className="flex items-center justify-between">
                  <span className="font-bold">Total:</span>
                  <span className="font-bold">Rs. {total}</span>
                </div>
              </div>
              <button
                className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                onClick={() => setIsModalOpen(false)}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
