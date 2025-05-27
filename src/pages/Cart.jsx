import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import CartTotal from "../components/CartTotal";

function Cart() {
  const { products, currency, cartItems, updateQuantity } = useContext(ShopContext);
  const navigate = useNavigate(); // Added useNavigate hook
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    const tempData = [];
    for (const itemId in cartItems) {
      for (const size in cartItems[itemId]) {
        if (cartItems[itemId][size] > 0) {
          tempData.push({
            _id: itemId,
            size: size,
            quantity: cartItems[itemId][size],
          });
        }
      }
    }
    setCartData(tempData);
  }, [cartItems]);

  const handleQuantityChange = (itemId, size, newQuantity) => {
    if (newQuantity >= 1) {
      updateQuantity(itemId, size, newQuantity);
    }
  };

  const incrementQuantity = (itemId, size, currentQuantity) => {
    updateQuantity(itemId, size, currentQuantity + 1);
  };

  const decrementQuantity = (itemId, size, currentQuantity) => {
    if (currentQuantity > 1) {
      updateQuantity(itemId, size, currentQuantity - 1);
    }
  };

  return (
    <div className="border-t pt-14 px-4 sm:px-8">
      <div className="text-2xl mb-6">
        <Title text1={"YOUR"} text2={"CART"} />
      </div>

      {cartData.length === 0 ? (
        <div className="py-12 text-center">
          <p className="text-gray-500 text-lg mb-4">Your cart is empty</p>
          <img
            src={assets.empty_cart}
            alt="Empty cart"
            className="w-40 mx-auto opacity-70"
          />
        </div>
      ) : (
        <div className="space-y-6">
          <div className="space-y-4">
            {cartData.map((item) => {
              const productData = products.find(
                (product) => product._id === item._id
              );

              if (!productData) return null;

              return (
                <div
                  key={`${item._id}-${item.size}`}
                  className="py-4 border-b grid grid-cols-12 gap-4 items-center"
                >
                  <div className="col-span-5 flex items-start gap-4">
                    <img
                      className="w-16 sm:w-20 rounded"
                      src={productData.image[0]}
                      alt={productData.name}
                    />
                    <div>
                      <p className="font-medium">{productData.name}</p>
                      <p className="text-sm text-gray-500">Size: {item.size}</p>
                    </div>
                  </div>

                  <div className="col-span-3 flex items-center justify-center">
                    <div className="flex items-center border rounded">
                      <button
                        onClick={() =>
                          decrementQuantity(item._id, item.size, item.quantity)
                        }
                        className="px-3 py-1 text-lg hover:bg-gray-100"
                        disabled={item.quantity <= 1}
                      >
                        -
                      </button>
                      <input
                        className="w-12 text-center py-1 border-x"
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) => {
                          const value = e.target.value;
                          if (value === "" || value === "0") return;
                          handleQuantityChange(
                            item._id,
                            item.size,
                            Number(value)
                          );
                        }}
                      />
                      <button
                        onClick={() =>
                          incrementQuantity(item._id, item.size, item.quantity)
                        }
                        className="px-3 py-1 text-lg hover:bg-gray-100"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="col-span-2 text-right font-medium">
                    {currency}
                    {(productData.price * item.quantity).toFixed(2)}
                  </div>

                  <div className="col-span-2 flex justify-end">
                    <button
                      onClick={() => updateQuantity(item._id, item.size, 0)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <img
                        className="w-5"
                        src={assets.bin_icon}
                        alt="Remove item"
                      />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
      <div className="flex justify-end my-20">
        <div className="w-full sm:w-[450px]">
          <CartTotal />
          <div className="w-full text-end">
            <button 
              onClick={() => navigate('/place-order')} 
              className="bg-black text-white text-sm my-8 px-8 py-3"
            >
              PROCEED TO CHECKOUT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;