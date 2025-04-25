import { Order } from "../models/order.model";

export interface IOrder {
    id: string,
    productId: string,
    customerId: string
}

// Get orders
const getOrders = async() => {
    const orders = await Order.find()
    return orders
}

// Create orders
const createOrder = async (productId: string, customerId: string) => {
    const order = new Order({ productId, customerId })
    return await order.save()
}

// Update order
const updateOrder = async (id: string, data: Partial<IOrder>) => {
    return await Order.findByIdAndUpdate(id, data, { new: true })
}

// Delete order
const deleteOrder =async (id: string) => {
    return await Order.findByIdAndDelete(id)
}

export default {
    getOrders,
    createOrder,
    updateOrder,
    deleteOrder
}