const model = require('../models/index');

/* order create */
createOrder = async (req, res, next) => {
  const { order_id, item_name, cost, order_date, delivery_date } = req.body;
  
  const order = new model.order({
    order_id,
    item_name,
    cost,
    order_date,
    delivery_date
  });

  try {
    const newOrder = await order.save();
    return res.status(201).json({status : 1,message: 'Order created successfully', data: newOrder });
  } catch (error) {
    next(error)
  }
};
/* order update */
updateOrder = async (req, res, next) => {
  const { delivery_date } = req.body;
  const { id } = req.params;
  try {
    const updatedOrder = await model.order.findByIdAndUpdate(
      id,
      { delivery_date: new Date(delivery_date) },
      { new: true }
    );
    if (!updatedOrder) {
      throw new Error('Order not found');
    }
    return res.json({ message: 'Order fetched successfully', data: updatedOrder });
  } catch (error) {
    next(error)
  }
};
/* order listing */
list = async (req, res, next) => {
  const { date } = req.query;
  const startDate = new Date(date);
  startDate.setHours(0, 0, 0, 0);
  const endDate = new Date(date);
  endDate.setHours(23, 59, 59, 999);
  try {
    const orders = await model.order.find({
      order_date: { $gte: startDate, $lte: endDate }
    });
    return res.json({ message: 'Order fetched successfully', data: orders });
  } catch (error) {
    next(error)
  }
};
/* order searching */
search = async (req, res, next) => {
  const { order_id } = req.query;
  try {
    const order = await model.order.findOne({ order_id });
    if (!order) {
      throw new Error('Order not found');
    }
    return res.json({ message: 'Order fetched successfully', data: order });
  } catch (error) {
    next(error)
  }
};
/* order deleted */
deleteOrder = async (req, res, next) => {
  const { id } = req.params;
  try {
    const deletedOrder = await model.order.findByIdAndDelete(id);
    if (!deletedOrder) {
      return res.status(404).json({ error: 'Order not found' });
    }
    return res.json({ message: 'Order deleted successfully', data: {} });
  } catch (error) {
    next(error)
  }
};

module.exports = {
  createOrder,
  updateOrder,
  list,
  search,
  deleteOrder
}