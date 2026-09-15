import CategoryCard from "./CategoryCard";

function CategoryList({categories})
{
    return(
        <div className="grid grid-cols-1 md:grid-cols-4 py-3 gap-3">
            {categories
                .filter((category)=>category.isActive)
                .map((category)=>(
                    <CategoryCard key={category.name} category={category}/>
                ))
            }
        </div>
    );
    
}
export default CategoryList;