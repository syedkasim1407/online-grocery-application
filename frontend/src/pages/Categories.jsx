import CategoryList from "../components/CategoryList";
import { useAdmin } from "../context/AdminContext";

function Categories() {
    const { categories } = useAdmin();
  return (
    <main className="mx-auto bg-gray-50">
        <section className='bg-green-50 py-1'>
            <div className="max-w-7xl text-center py-5">
                <p className="font-semibold text-xl text-green-600">
                    Explore our store
                </p>
                <h1 className="mt-4 text-4xl font-bold text-gray-900">
                    Shop By Category
                </h1> 
                <p className="mx-auto mt-7 max-w-2xl text-xl text-gray-600">
                    Browse our wide range of fresh groceries and everyday essentials.
                </p>

            </div>
        </section>
        {/*CategoryList*/}
        <section>
            <div className="mx-auto max-w-7xl my-6">
                <CategoryList categories={categories}/>

            </div>
        </section>
    </main>
  );
}

export default Categories;