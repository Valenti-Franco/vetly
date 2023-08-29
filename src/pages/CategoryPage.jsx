import React from "react";

import Diary from "../components/Diary";

function CategoryPage({ category }) {
  return (
    <section className="w-full">
      <h2 className="text-center text-3xl font-bold py-10">
        <span className="mr-3">{category.icon}</span>
        {category.name}
      </h2>
      {category.name === "Agenda" ? (
        <>
          <Diary />
        </>
      ) : null}
    </section>
  );
}

export default CategoryPage;
