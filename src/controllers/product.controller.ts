import { Product } from "../models/product.model";

export interface IProduct {
    id: string,
    productName: string,
    productPrice: number
}

// Get Products
const getProducts = async () => {
    const products = await Product.find()
    return products
}

// Create Products
const createProduct = async (data: Omit<IProduct, 'id'>) => {
    const product = new Product(data)
    return await product.save()
}

// Get by id
const findProduct = async (id: string) => {
    return await Product.findById(id)
}

// Update Product
const updateProduct = async (id: string, data: Partial<IProduct>) => {
    return await Product.findByIdAndUpdate(id, data, { new: true })
}

// delete Products
const deleteProduct = async (id: string) => {
    return await Product.findByIdAndDelete(id)
}

export default {
    getProducts,
    createProduct,
    findProduct,
    updateProduct,
    deleteProduct
}