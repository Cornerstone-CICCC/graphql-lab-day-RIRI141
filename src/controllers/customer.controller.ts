import { Customer } from "../models/customer.model"

export interface ICustomer {
    id: string,
    firstName: string,
    lastName: string,
    email: string
}

// Get Products
const getCustomers = async () => {
    const customers = await Customer.find()
    return customers
}

// Add Customers
const addCustomer = async (data: Omit<ICustomer, 'id'>) => {
    const customer = new Customer(data)
    return await customer.save()
}

// Get by id
const findCustomer = async (id: string) => {
    return await Customer.findById(id)
}

// Update Customer
const updateCustomer = async (id: string, data: Partial<ICustomer>) => {
    return await Customer.findByIdAndUpdate(id, data, { new: true })
}

// delete Customer
const deleteCustomer = async (id: string) => {
    return await Customer.findByIdAndDelete(id)
}

export default {
    getCustomers,
    addCustomer,
    findCustomer,
    updateCustomer,
    deleteCustomer
}