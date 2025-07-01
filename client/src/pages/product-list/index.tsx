import { useEffect, useRef, useState } from "react";
import { Toast } from "primereact/toast";
import { Dropdown } from "primereact/dropdown";
import type { IProduct } from "@/commons/types";
import ProductService from "@/services/product-service";
import CategoryService from "@/services/category-service";
import { ProductCard } from "@/components/product-card";

type Category = {
  id: number;
  name: string;
};

export const ProductListPage = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(true);
  const toast = useRef<Toast>(null);

  useEffect(() => {
    loadCategories();
  }, []);

  useEffect(() => {
    loadProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategory]);

  const loadCategories = async () => {
    try {
      const response = await CategoryService.findAll();
      if (response.status === 200 && response.data) {
        setCategories(Array.isArray(response.data) ? response.data : []);
      }
    } catch {
      toast.current?.show({
        severity: "error",
        summary: "Erro",
        detail: "Erro ao carregar categorias.",
        life: 2500,
      });
    }
  };

  const loadProducts = async () => {
    setLoading(true);
    try {
      let response;
      if (selectedCategory && selectedCategory.id) {
        response = await ProductService.findByCategoryId(selectedCategory.id);
      } else {
        response = await ProductService.findAll();
      }
      if (response.status === 200 && response.data) {
        setProducts(Array.isArray(response.data) ? response.data : []);
      } else {
        toast.current?.show({
          severity: "error",
          summary: "Erro",
          detail: response.message || "Erro ao carregar produtos.",
          life: 2500,
        });
      }
    } catch {
      toast.current?.show({
        severity: "error",
        summary: "Erro",
        detail: "Erro ao carregar produtos.",
        life: 2500,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        maxWidth: 1200,
        margin: "0 auto",
        padding: "32px 16px",
        minHeight: "80vh",
      }}
    >
      <Toast ref={toast} />
      <h1
        style={{
          fontSize: "2rem",
          fontWeight: 800,
          letterSpacing: "-0.5px",
          marginBottom: "24px",
          color: "#223",
          textAlign: "center",
        }}
      >
        Lista de Produtos
      </h1>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "28px",
        }}
      >
        <Dropdown
          value={selectedCategory}
          options={categories}
          optionLabel="name"
          placeholder="Filtrar por categoria"
          showClear
          onChange={(e) => setSelectedCategory(e.value)}
          style={{ width: 320, fontSize: "1rem" }}
        />
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: "32px",
        }}
      >
        {loading ? (
          <span style={{ gridColumn: "1/-1", textAlign: "center" }}>
            Carregando produtos...
          </span>
        ) : products.length === 0 ? (
          <span style={{ gridColumn: "1/-1", textAlign: "center" }}>
            Nenhum produto encontrado.
          </span>
        ) : (
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        )}
      </div>
    </div>
  );
};
