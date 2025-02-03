import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";
import Hero from "../components/Hero"; // Importamos el Hero

const products = [
  { id: 1, image: "https://placehold.co/300x300", title: "Botiquín Básico", description: "Incluye elementos esenciales para emergencias.", price: "2.990" },
  { id: 2, image: "https://placehold.co/300x300", title: "Extintor Portátil", description: "Extintor de polvo químico seco de 1kg.", price: "4.999" },
  { id: 3, image: "https://placehold.co/300x300", title: "Kit de Quemaduras", description: "Incluye apósitos y gel especial para quemaduras.", price: "19.990" },
  { id: 4, image: "https://placehold.co/300x300", title: "Botiquín Básico", description: "Incluye elementos esenciales para emergencias.", price: "2.990" },
  { id: 5, image: "https://placehold.co/300x300", title: "Extintor Portátil", description: "Extintor de polvo químico seco de 1kg.", price: "4.999" },
  { id: 6, image: "https://placehold.co/300x300", title: "Kit de Quemaduras", description: "Incluye apósitos y gel especial para quemaduras.", price: "19.990" },
];

function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <Header />

      {/* Hero */}
      <Hero
        title="Seguridad para cada momento"
        subtitle="Explora nuestra selección de botiquines y extintores portátiles para estar preparado ante cualquier emergencia."
        image="https://mdcare.cl/wp-content/uploads/2021/09/77d928fe-1e67-11ec-a992-53b242dedc27-1-1024x442.jpg"
      />

      {/* Productos */}
      <main className="flex-1 flex flex-col items-center p-4 md:p-8 bg-gray-100">
        <h2 className="text-3xl font-bold text-center mb-6 text-red-700">
          Nuestros Productos
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </main>
      {/* Footer */}
      <Footer />
    </div>
  );
}

export default Home;
