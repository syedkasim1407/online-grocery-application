import {
  createContext,
  useState,
  useEffect,
} from "react";

import api from "../utils/api";
import { useAuth } from "../hooks/useAuth";

export const CartContext = createContext(null);

export function CartProvider({ children }) {

  const { isAuthenticated } = useAuth();

  const [cartItems, setCartItems] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);

  const [loading, setLoading] = useState(false);


  // =====================================================
  // FETCH CART
  // =====================================================

  const fetchCart = async () => {

    if (!isAuthenticated) {

      setCartItems([]);
      setCartTotal(0);

      return;
    }

    try {

      setLoading(true);

      const response = await api.get("/cart");

      const data = response.data;

      setCartItems(data.cartItems || []);

      setCartTotal(
        Number(data.totalPrice || 0)
      );

    } catch (error) {

      console.error(
        "Error fetching cart:",
        error
      );

      // If the user has no cart yet,
      // treat it as an empty cart.

      setCartItems([]);
      setCartTotal(0);

    } finally {

      setLoading(false);

    }
  };


  // =====================================================
  // LOAD CART WHEN LOGIN STATE CHANGES
  // =====================================================

  useEffect(() => {

    fetchCart();

  }, [isAuthenticated]);


  // =====================================================
  // ADD TO CART
  // =====================================================

  const addToCart = async (product, quantity) => {

    if (!isAuthenticated) {

      return {
        success: false,
        message: "Please login first",
      };
    }

    try {

      const response = await api.post(
        `/cart?productId=${product.id}&quantity=${quantity}`
      );

      const data = response.data;

      // Add API response directly
      // because POST /cart returns CartResponseDTO

      setCartItems(
        data.cartItems || []
      );

      setCartTotal(
        Number(data.totalPrice || 0)
      );

      return {
        success: true,
        data,
      };

    } catch (error) {

      console.error(
        "Error adding product to cart:",
        error
      );

      return {
        success: false,
        message:
          error.response?.data?.message ||
          "Failed to add product to cart",
      };
    }
  };


  // =====================================================
  // UPDATE QUANTITY
  // =====================================================

  const updateQuantity = async (
    productId,
    quantity
  ) => {

    if (quantity <= 0) {
      return;
    }

    try {

      // Backend returns CartItemResponseDTO here,
      // NOT CartResponseDTO.

      await api.put(
        `/cart/update?productId=${productId}&quantity=${quantity}`
      );

      // Therefore fetch the complete cart again.
      await fetchCart();

      return {
        success: true,
      };

    } catch (error) {

      console.error(
        "Error updating cart quantity:",
        error
      );

      return {
        success: false,
        message:
          error.response?.data?.message ||
          "Failed to update cart",
      };
    }
  };


  // =====================================================
  // REMOVE FROM CART
  // =====================================================

  const removeFromCart = async (itemId) => {

    try {

      // Backend DELETE returns void,
      // so don't try to read response.data.

      await api.delete(
        `/cart/remove/${itemId}`
      );

      // Fetch updated cart after deletion.
      await fetchCart();

      return {
        success: true,
      };

    } catch (error) {

      console.error(
        "Error removing cart item:",
        error
      );

      return {
        success: false,
        message:
          error.response?.data?.message ||
          "Failed to remove item",
      };
    }
  };


  // =====================================================
  // CONTEXT
  // =====================================================

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartTotal,
        loading,

        addToCart,
        removeFromCart,
        updateQuantity,

        fetchCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}