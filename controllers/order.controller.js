const db = require("../models");
const cart_product = require("../models/cart_product");
const Customer = db.Customer;
const Product = db.Product;
const OrderProduct = db.Order_Product;
const Address = db.Address;
const Order = db.Order;
const CartProduct = db.Cart_Product;

const address_add = async (req, res) => {
  try {
    const { address, country, state, city, contact, pin_code } = req.body;
    console.log(req.body, "req.bodyyy");
    const address_save = await Address.create({
      ...req.body,
    });
    console.log(address_save, "userrr");

    res.status(200).json({ data: address_save });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const add = async (req, res) => {
  try {
    console.log(req.body,"reqqqqqqqqqqbody");
    const { customerId } = req.body;
  
    const order = await Order.create(
     {customerId,
     });
    console.log(order,"orderrrr");
    res.status(200).json({ data: order });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const findall = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const address_show = await Address.findAll({
      where: { customerId: id },
    });
    console.log(address_show, "address_show/......");
    return res.status(200).json(address_show);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const order_findall = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id,"id");
    const order_show = await Order.findAll({
      where: { customerId: id },
      order: [['id', 'DESC']],
      limit: 1,
    });
    console.log(order_show, "order_show/......");
    return res.status(200).json(order_show);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const confirm_order = async (req, res) => {
  try {
    console.log(req.body, "req_........");

   
        const orderProducts = req.body; // Retrieve the array of order products from the request body
    
        for (const product of orderProducts) {
          const { productId, orderId,addressId, price, quantity, name, imageUrl } = product;
    
          await OrderProduct.create({
            orderId: orderId,
            addressId:addressId,
            productId: productId,
            price: price,
            quantity: quantity,
            imageUrl: imageUrl,
            name: name,
          });
        }
   

    res.status(200).json({ message: "Order products added successfully." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getPreviousOrderProducts = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);

    const orders = await Order.findAll({
      where: {
        customerId: id,
      },
      attributes: ['id'], 
    });

    const address = await Address.findAll({
      where: {
        customerId: id,
      },
      attributes: ['id', 'address', 'pin_code',"city","state","country"], 

    });

    const orderIds = orders.map((order) => order.id);
    const add = address.map((add) => ({
      id: add.id,
      address: add.address, 
      pin_code: add.pin_code,
      city:add.city,
      state:add.state,
      country:add.country
    }));

    const previousOrder = await OrderProduct.findAll({
      where: {
        orderId: orderIds,   
      },
      
    });

  //  console.log(previousOrderProducts, "previ...");
    res.status(200).json({previousOrder,add});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const getAddress = async (req, res) => {
  const id = req.params.id;
  
  Address.findOne({ id })
    .then((address) => {
      if (address) {
        res.status(200).json(address);
      } else {
        res.status(404).json({ message: 'Address not found' });
      }
    })
    .catch((error) => {
      res.status(500).json({ message: 'Error retrieving address data' });
    });
}

const updateAddress = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedAddress = req.body;
    console.log(updatedAddress, "updatedAdd");

    const  updatedRows = await Address.update(updatedAddress, {
      where: { id },
      returning: true,
    });

    res.json({ message: 'Address updated successfully', address: updatedRows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};




module.exports = {
  add,
  findall,
  address_add,
  confirm_order,
  order_findall,
  getPreviousOrderProducts,
  getAddress,
  updateAddress
};
