import Cart from "../models/cart";
import Product from "../models/product";
// Get all carts
const getAllCarts = async (req, res) => {
  try {
    const carts = await Cart.find().populate({
      path: "items.productId",
      model: "Product",
    });
    if (carts.length === 0) {
      return res.status(200).json({
        message: "Lấy danh sách Cart không thành công",
      });
    }
    return res.status(200).json({
      message: "Lấy danh sách Cart thành công",
      carts,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get a single cart by ID
const getCartById = async (req, res) => {
  const { idUser } = req.params;
  try {
    const cart = await Cart.findOne({ "items.userId": idUser }).populate({
      path: "items.productId",
      model: "Product",
    });
    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }
    res.status(200).json({
      message: "Lấy 1 Cart thành công",
      cart,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Create a new cart
const createCart = async (req, res) => {
  const { items, userId } = req.body;
  const { size, color, image, quantity } = items[0];
  try {
    //lấy product
    //lấy user
    const cart = await Cart.findOne({ userId });
    if (cart) {
      // kiểm tra sản phẩm đó đã có trong giỏ hàng chưa
      // Nếu sản phẩm chưa tồn tại, thêm vào giỏ hàng
      const product = await Product.findById(items[0].productId);
      cart.items.push({
        productId: items[0].productId,
        size: [...size],
        color: [...color],
        image: [...image],
        quantity: quantity,
        price: product.price * quantity,
        priceSale: product.priceSale * quantity,
        // price: product.priceSale.quantity * quantity,
      });
      await cart.save();
      res.status(200).json({
        message: "Cập nhật giỏ hàng thành công",
        cart: cart,
      });
    } else {
      // Nếu chưa có giỏ hàng, tạo giỏ hàng mới và thêm sản phẩm vào
      const newCart = await Cart.create(req.body);
      const product = await Product.findById(items[0].productId);
      if (!product) {
        return res.status(404).json({ error: "Sản phẩm không tồn tại" });
      }
      newCart.items[0].price = product.price * quantity;
      newCart.items[0].priceSale = product.priceSale * quantity;
      await newCart.save();
      res.status(201).json({
        message: "Thêm Cart thành công",
        cart: newCart,
      });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a cart by ID
const updateCart = async (req, res) => {
  const { idUser } = req.params;
  const { items } = req.body;
  const { quantity } = items[0];

  try {
    const cart = await Cart.findOne({ "items.userId": idUser });
    // nếu cart không tồn tại
    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }
    // lấy product
    const product = await Product.findById(items[0].productId);
    // nếu product không tồn tại
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    // Kiểm tra sản phẩm có tồn tại trong giỏ hàng không
    const existingItem = cart.items.find(
      (item) => item.productId.toString() === items[0].productId
    );
    if (existingItem) {
      existingItem.quantity = quantity;
      existingItem.price = product.price * quantity;
      existingItem.priceSale = product.priceSale * quantity;
    } else {
      return res.status(200).json({
        message: "Cập nhật giỏ hàng không thành công",
      });
    }
    await cart.save();

    res.status(200).json({
      message: "Cập nhật giỏ hàng thành công",
      cart: cart,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Delete a product from cart by userId and productId
const deleteProductFromCart = async (userId, productId) => {
  try {
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      throw new Error("Cart not found");
    }

    // Kiểm tra và xóa sản phẩm từ mảng items
    const itemIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );
    if (itemIndex === -1) {
      throw new Error("Product not found in cart");
    }

    cart.items.splice(itemIndex, 1); // Xóa sản phẩm khỏi mảng items
    await cart.save();

    return cart;
  } catch (error) {
    throw error;
  }
};

// Delete a cart by ID
const deleteCart = async (req, res) => {
  const { userId, productId } = req.params;
  try {
    const cart = await deleteProductFromCart(userId, productId);
    res.status(200).json({ message: "Product deleted from cart", cart });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Export the controller functions
export { getAllCarts, getCartById, createCart, updateCart, deleteCart };
