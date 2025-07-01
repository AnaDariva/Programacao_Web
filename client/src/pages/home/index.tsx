import { useEffect, useRef, useState } from "react";
import { Toast } from "primereact/toast";
import { Carousel } from "primereact/carousel";
import type { ICategory, IProduct } from "@/commons/types";
import ProductService from "@/services/product-service";
import CategoryService from "@/services/category-service";
import { ProductCard } from "@/components/product-card";
import { Button } from "primereact/button";

const banners = [
  {
    image:
      "https://www.databasket.com.br/wp-content/uploads/2021/05/NBA-Store-Ribeirao-Preto-scaled.jpg",
  },
  {
    image:
      "https://www.cidademarketing.com.br/marketing/wp-content/uploads/2021/11/nba_store_fortaleza1-scaled.jpg",
  },
  { image: "https://wallpapers.com/images/hd/best-nba-zn90xecrm49mlwbx.jpg" },
  {
    image:
      "https://i.pinimg.com/originals/16/d6/38/16d638e3d4e529bd4d2975b20f786ef0.gif",
  },
];

const bannerTemplate = (banner: any) => (
  <img
    src={banner.image}
    alt="Banner"
    style={{
      width: "100%",
      height: "440px",
      objectFit: "cover",
      borderRadius: "32px",
      boxShadow: "0 8px 40px #0003",
      border: "3px solid #fff",
      background: "#e8eaf6",
    }}
  />
);

export const HomePage = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const toast = useRef<Toast>(null);

  const loadProducts = async () => {
    setLoading(true);
    try {
      const response = await ProductService.findAll();
      if (response.status === 200 && response.data) {
        setProducts(Array.isArray(response.data) ? response.data : []);
      }
    } catch {
      toast.current?.show({
        severity: "error",
        summary: "Erro",
        detail: "Erro ao buscar produtos.",
        life: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

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
        detail: "Erro ao buscar categorias.",
        life: 3000,
      });
    }
  };

  useEffect(() => {
    loadProducts();
    loadCategories();
  }, []);

  const jerseys = products
    .filter(
      (p) =>
        p.category?.name?.toLowerCase().includes("jersey") ||
        p.category?.name?.toLowerCase().includes("regata")
    )
    .slice(0, 6);

  const destaqueCategorias = categories.slice(0, 3);

  return (
    <div
      style={{
        width: "100%",
        minHeight: "100vh",
        background: "#f5f6fa",
      }}
    >
      <Toast ref={toast} />

      <div
        style={{
          width: "100vw",
          position: "relative",
          left: "50%",
          right: "50%",
          marginLeft: "-50vw",
          marginRight: "-50vw",
          marginBottom: 48,
          background: "#f3f6fa",
          borderRadius: "0 0 36px 36px",
          boxShadow: "0 4px 28px #0002",
          padding: "0 0 16px 0",
        }}
      >
        <div
          style={{ maxWidth: "1800px", margin: "0 auto", padding: "0 32px" }}
        >
          <Carousel
            value={banners}
            numVisible={1}
            numScroll={1}
            itemTemplate={bannerTemplate}
            autoplayInterval={4200}
            circular
            showIndicators
            showNavigators
            style={{ borderRadius: "32px" }}
          />
        </div>
      </div>

      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 16px 32px 16px",
        }}
      >
        <h1
          style={{
            fontSize: "2.4rem",
            fontWeight: 800,
            letterSpacing: "-1px",
            textAlign: "center",
            margin: "10px 0 10px 0",
            color: "#223",
          }}
        >
          NBA Store <span style={{ color: "#1769aa" }}>Oficial</span> 🏀
        </h1>
        <p
          style={{
            textAlign: "center",
            margin: "0 0 32px 0",
            fontSize: "1.2rem",
            color: "#444",
            fontWeight: 500,
            letterSpacing: ".5px",
          }}
        >
          Seu destino para jerseys, camisetas e acessórios oficiais da NBA.
          Qualidade, estilo e paixão pelo basquete! 🏀🔥
        </p>

        <div
          style={{
            margin: "24px 0 30px 0",
            display: "flex",
            gap: 24,
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          {destaqueCategorias.map((cat) => (
            <div
              key={cat.id}
              style={{
                background: "var(--nba-blue)",
                color: "#fff",
                borderRadius: 12,
                padding: "24px 32px",
                fontWeight: 700,
                fontSize: "1.15rem",
                boxShadow: "0 2px 14px #0002",
                letterSpacing: ".5px",
                minWidth: 170,
                textAlign: "center",
              }}
            >
              {cat.name}
            </div>
          ))}
        </div>

        <h2
          style={{
            fontSize: "1.5rem",
            fontWeight: 700,
            margin: "20px 0 18px 0",
            color: "#223",
            textAlign: "center",
          }}
        >
          Jerseys/Regatas em Destaque
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "32px",
            marginTop: 8,
            marginBottom: 32,
          }}
        >
          {loading ? (
            <span style={{ gridColumn: "1/-1", textAlign: "center" }}>
              Carregando produtos...
            </span>
          ) : jerseys.length === 0 ? (
            <span style={{ gridColumn: "1/-1", textAlign: "center" }}>
              Nenhuma jersey encontrada.
            </span>
          ) : (
            jerseys.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          )}
        </div>

        <div style={{ textAlign: "center", marginTop: 10 }}>
          <Button
            label="Ver Todos os Produtos"
            icon="pi pi-arrow-right"
            className="p-button-lg"
            style={{
              background: "var(--nba-blue)",
              border: "none",
              fontWeight: 700,
              fontSize: "1.07rem",
            }}
            onClick={() => (window.location.href = "/products")}
          />
        </div>
      </div>
    </div>
  );
};
