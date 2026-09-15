  import React from 'react'
import { Link } from 'react-router-dom';
  function Home() {
    
      return (
        <main>
           {/* Hero Section */}
          <section className='bg-gray-100 shadow-md '>
            <div className='mx-auto min-h-[400px] max-w-7xl flex justify-between px-10 py-16'>
              <div className="max-w-xl">
                <p className='mb-4 text-lg font-semibold text-green-600'>
                  Fresh & Healthy
                </p>
                <h1 className='mb-6 text-5xl font-bold leading-tight text-gray-900'>
                  Fresh Groceries
                  <br />
                  Delivered To Your Door
                </h1>

                <p className='max-w-lg text-lg leading-8 text-gray-600'>
                  Shop fresh fruits, vegetables and everyday essentials
                  from the comfort of your home.
                </p>

                <button className='bg-violet-700 mt-7 w-30 h-10 px-4 rounded-lg text-white transition hover:bg-violet-400'>Shop Now</button>
              </div>

              <div className='hidden h-80 w-80 items-center justify-center rounded-full bg-green-600 md:flex'>
                <span className="text-8xl ">🛒</span>
              </div>

            </div>
          </section>
          {/* Categories Section */}
          <section className='py-15'>
            <div className='mx-auto max-w-7xl'>
              <div className='text-center'>
                <h2 className='text-3xl font-bold'>
                  Shop By Category
                </h2>
                <p className='mt-4 text-xl text-gray-900'>
                  Explore our fresh grocery categories
                </p>
                <div className='pt-7 grid grid-cols-2  md:grid-cols-4 gap-4' >
                
                  <div className='bg-green-200 rounded-xl shadow-sm transition hover:-translate-y-1 hover:shadow-md h-35 w-60'>
                    
                  <Link  to={`/products?category=${encodeURIComponent("Fresh Fruits")}`}>
                  <p className='mt-7 text-4xl'>🍎 </p>
                    <p className='mt-6 text-2xl font-medium'>Fresh Fruits</p>
                    </Link>
                  </div>
                

                  <div className='bg-green-200 rounded-lg shadow-sm transition hover:-translate-y-1 hover:shadow-md h-35 w-60'>
                  <Link  to={`/products?category=${encodeURIComponent("Vegetables")}`}>
                    <p className='mt-7 text-4xl'>🥕 </p>
                    <p className='mt-6 text-2xl font-medium'>Vegetables</p>
                  </Link>
                  </div>

                  <div className='bg-green-200 rounded-lg shadow-sm transition hover:-translate-y-1 hover:shadow-md h-35 w-60'>
                  <Link  to={`/products?category=${encodeURIComponent("Dairy & Eggs")}`}>
                    <p className='mt-7 text-4xl'>🥛 </p>
                    <p className='mt-6 text-2xl font-medium'>Dairy</p>
                  </Link>
                  </div>

                  <div className='bg-green-200 rounded-lg shadow-sm transition hover:-translate-y-1 hover:shadow-md h-35 w-60'>
                  <Link  to={`/products?category=${encodeURIComponent("Beverages")}`}>
                    <p className='mt-7 text-4xl'>🥤 </p>
                    <p className='mt-6 text-2xl font-medium'>Beverages</p>
                  </Link>
                  </div>

                </div>
                
              </div>
            </div>
          </section>
          
           
        </main>
      );
    }

  export default Home;