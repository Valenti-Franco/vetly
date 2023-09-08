import React from "react";
import { useUser } from "../hooks/useUser";
import Diary from "../components/Diary";
import DiaryClient from "../components/DiaryClient";

function CategoryPage({ category }) {
  const { user, signupUser } = useUser();

  return (
    <section className="w-full">
      <h2 className="text-center text-3xl font-bold py-10">
        <span className="mr-3">{category.icon}</span>
        {category.name}
      </h2>
      {category.name === "Agenda" && user.type === "PROFESIONAL" ? (
        <>
          <Diary />
        </>
      ) : category.name === "Agenda" && user.type === "CLIENTE" ? (
        <DiaryClient />
      ) : null}
    </section>
  );
}

export default CategoryPage;
