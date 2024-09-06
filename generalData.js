import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/user.model.js';  // Asegúrate de que las rutas sean correctas
import Product from './models/product.model.js';
import Coupon from './models/coupon.model.js';
import Order from './models/order.model.js';
import bcrypt from 'bcryptjs';

// Configurar dotenv para cargar las variables de entorno
dotenv.config();

const mongoURI = process.env.MONGODB_URI || 'your_mongodb_uri_here';

/*  Conectar a MongoDB
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB', err));
*/

export const generateSampleData = async () => {
  try {
    // Limpiar las colecciones existentes
    await User.deleteMany({});
    await Product.deleteMany({});
    await Coupon.deleteMany({});
    await Order.deleteMany({});

    // Crear usuarios
    const user1 = new User({
      name: 'John Doe',
      email: 'john@gmail.com',
      password: 'password123', // Hashed password 
      role: 'customer',
    });

    const user2 = new User({
      name: 'Jane Doe',
      email: 'jane@example.com',
      password: 'password123',  // Hashed password
      role: 'customer',
    });

    const admin = new User({
      name: 'Lichald Ojeda',
      email: 'rmojeda2@utpl.edu.ec',
      password: 'password123',  // Hashed password
      role: 'admin',
    });

    await user1.save();
    await user2.save();
    await admin.save();

    // Crear productos
    const product1 = new Product({
      name: 'Jeans',
      description: 'Pantalones jean azul marino',
      price: 60,
      image: 'jean.jpg',
      category: 'jeans',
      isFeatured: true,
    });

    const product2 = new Product({
      name: 'camiseta',
      description: 'casita overside',
      price: 20,
      image: 'camiseta.jpg',
      category: 't-shirts',
    });
    const product3 = new Product({
      name: 'zapatos',
      description: 'nike 201',
      price: 120,
      image: 'zapatos.jpg',
      category: 'shoes',
    });

    await product1.save();
    await product2.save();
    await product3.save();
    // Crear cupones
    const coupon1 = new Coupon({
      code: 'DISCOUNT10',
      discountPercentage: 10,
      expirationDate: new Date('2024-12-31'),
      userId: user1._id,
    });

    const coupon2 = new Coupon({
      code: 'DISCOUNT20',
      discountPercentage: 20,
      expirationDate: new Date('2024-12-31'),
      userId: user2._id,
    });

    await coupon1.save();
    await coupon2.save();

    // Crear órdenes
    const order1 = new Order({
      user: user1._id,
      products: [
        {
          product: product1._id,
          quantity: 1,
          price: product1.price,
        },
        {
          product: product2._id,
          quantity: 2,
          price: product2.price,
        },
      ],
      totalAmount: 2800,
      stripeSessionId: 'sess_abc123',
    });

    const order2 = new Order({
      user: user2._id,
      products: [
        {
          product: product2._id,
          quantity: 1,
          price: product2.price,
        },
      ],
      totalAmount: 800,
      stripeSessionId: 'sess_def456',
    });

    await order1.save();
    await order2.save();

    console.log('Sample data created successfully!');
  } catch (error) {
    console.error('Error generating sample data:', error);
  }
};


