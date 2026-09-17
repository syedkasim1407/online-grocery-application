import CategoryCard from "./CategoryCard";

function CategoryList({ categories }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 py-3 gap-3">
      {categories
        .filter((category) => category.active)
        .map((category) => (
          <CategoryCard
            key={category.id}
            category={category}
          />
        ))}
    </div>
  );
}

export default CategoryList;