import React from "react";
import { CATEGORIES } from "../../data/mockData";
import { CategoriesHeader } from "./components/CategoriesHeader";
import { CategoryCard } from "./components/CategoryCard";
import { CategoriesCtaBanner } from "./components/CategoriesCtaBanner";

export const CategoriesPage = () => {
  return (
    <div className="min-h-screen bg-[#FAFAFC] py-8 sm:py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <CategoriesHeader />

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CATEGORIES.map((cat) => (
            <CategoryCard key={cat.id} category={cat} />
          ))}
        </div>

        {/* Bottom Banner */}
        <CategoriesCtaBanner />
      </div>
    </div>
  );
};

export default CategoriesPage;
