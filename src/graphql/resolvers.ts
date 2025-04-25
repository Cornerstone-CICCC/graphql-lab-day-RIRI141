// Finish the resolvers
import productController from "../controllers/product.controller";
import customerController from "../controllers/customer.controller";
import orderController from "../controllers/order.controller";
import { IProduct } from "../controllers/product.controller";
import { ICustomer } from "../controllers/customer.controller";
import { IOrder } from "../controllers/order.controller";
import { ObjectId } from "mongoose";

export const resolvers = {
  Query: {
    products: async () => {
      return await productController.getProducts();
    },
    customers: async () => {
      return await customerController.getCustomers();
    },
    orders: async () => {
      return await orderController.getOrders();
    },
    getProductById: async (_: unknown, { id }: { id: string }) => {
      return await productController.findProduct(id);
    },
    getCustomerById: async (_: unknown, { id }: { id: string }) => {
      return await customerController.findCustomer(id);
    },
  },
   Product: {
    customers: async ({ id }: { id: string }) => {
      const customers = await customerController.getCustomers();
      const orders = await orderController.getOrders();
      const customerOrders = orders.filter(
        (order) => String(order.productId) === id
      );
      const productCustomers = customerOrders.map((order) => {
        return customers.find((customer) => customer.id === String(order.customerId));
      });
      console.log(productCustomers)
      return productCustomers;
    },
},
  Customer: {
   products: async ({ id }: { id: string }) => {
    const products = await productController.getProducts();
      const orders = await orderController.getOrders();
      const productOrders = orders.filter(
        (order) => String(order.customerId) === id
      );
      const customerProducts = productOrders.map((order) => {
        return products.find((product) => product.id === String(order.productId))
      });
      console.log(customerProducts)
      return customerProducts;
   } 
  },
  Order: {
    product: async (parent: { productId: string }) => {
      return await productController.findProduct(parent.productId);
    },
    customer:async (parent: { customerId: string }) => {
      return await customerController.findCustomer(parent.customerId);
    },
  },
  Mutation: {
    addProduct: async (_:unknown, { productName, productPrice }: Omit<IProduct, 'id'>) => {
      return await productController.createProduct({ productName, productPrice });
    },
    editProduct: async (_: unknown, { id, productName, productPrice }: IProduct) => {
      return await productController.updateProduct(id, { productName, productPrice })
    },
    removeProduct: async (_:unknown, { id }: { id: string }) => {
      return await productController.deleteProduct(id)
    },

    addCustomer: async (_:unknown, { firstName, lastName, email } : Omit<ICustomer, 'id'>) => {
      return await customerController.addCustomer({ firstName, lastName, email });
    },
    editCustomer: async (_: unknown, { id, firstName, lastName, email }: ICustomer) => {
      return await customerController.updateCustomer(id, { firstName, lastName, email })
    },
    removeCustomer: async (_: unknown, { id }: { id: string }) => {
      return await customerController.deleteCustomer(id)
    },

    addOrder: async (_: unknown, { productId, customerId }: Omit<IOrder, 'id'>) => {
      return await orderController.createOrder(productId, customerId);
    },
    editOrder: async (_: unknown, { id, productId, customerId }: IOrder) => {
      return await orderController.updateOrder(id, { productId, customerId})
    },
    removeOrder: async (_: unknown, { id }: { id: string }) => {
      return await orderController.deleteOrder(id)
    },
  },
};
