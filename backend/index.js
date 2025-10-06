import express from 'express'
// import bodyParser from 'body-parser'
// import authRouter from './routes/auth.js'
//import itemModel from './models/item.js'
import Category from './models/Category.js' 
import Product from './models/products.js'
import User from './models/users.js'
import cors from 'cors'
import productRoute from './routes/products.js'
import userRoute from './routes/users.js'
import connectToDatabase from './server.js'

const app = express()
app.use(cors())
app.use(express.json())     

// parse application/x-www-form-urlencoded
//app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
//app.use(bodyParser.json());

//app.use('/api/auth', authRouter)
const initDB = async () => {
  // Categories
  const categoryCount = await Category.countDocuments();
  if (categoryCount === 0) {
    const categories = await Category.insertMany([
      { name: "Saree" },
      { name: "Shirt" },
      { name: "Jean" },
      { name: "Pant" },
    ]);
    console.log("Sample categories inserted");
  }

  const productCount = await Product.countDocuments();
  if (productCount === 0) {
  // First product
  await Product.create({
    name: "Coat Set",
    category: "Coat",
    brand: "Zara",
    type: "Dress",
    description: "Elegant winter coat crafted from a warm wool blend. Designed with a soft inner lining for comfort and a tailored fit for a polished look. Perfect for both casual outings and formal wearing",
    price: 10,
    discount: 20,
    sizes: ["M", "L", "XL"],
    colors: ["Black", "Gray"],
    stock: 10,
    images: [
      "/images/dress-collection/d1.jpg",
      "/images/dress-collection/d2.jpg",
      "/images/dress-collection/d3.jpg",
      "/images/dress-collection/d4.jpg"
    ]
  });


  // Second product
  await Product.create({
    name: "Cozy Winter Sweater",
    category: "Sweater",
    brand: "Zara",
    type: "Dress",
    description: "Soft knit sweater with a comfortable fit. Perfect for chilly days and casual wear. Available in multiple colors to suit your style.",
    price: 40,
    discount: 10,
    sizes: ["S", "M", "L", "XL"],
    colors: ["Red", "Blue", "Green", "Gray"],
    stock: 50,
    images: [
      "/images/dress-collection/d5.jpg",
      "/images/dress-collection/d6.jpg",
      "/images/dress-collection/d7.jpg",
      "/images/dress-collection/d8.jpg"
    ]
  });

  console.log("First and second sample products inserted");
}

}

initDB()

connectToDatabase()
app.use('/api/products', productRoute)
app.use('/api/users', userRoute)
app.use("/uploads", express.static("uploads"));

app.listen(process.env.PORT,() =>{
    console.log(`app is running from port ${process.env.PORT}`)
} )
