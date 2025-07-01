import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import type { IProduct } from "@/commons/types";
import ProductService from "@/services/product-service";
import { useCart } from "@/context/CartContext";

export const ProductView = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const toast = useRef<Toast>(null);
  const [product, setProduct] = useState<IProduct | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadProductDetails = async () => {
      setLoading(true);
      if (!id) {
        toast.current?.show({
          severity: "error",
          summary: "Erro",
          detail: "ID do produto não fornecido.",
          life: 3000,
        });
        navigate("/");
        setLoading(false);
        return;
      }
      try {
        const response = await ProductService.findById(parseInt(id));
        if (response.status === 200 && response.data) {
          setProduct(response.data as IProduct);
        } else {
          toast.current?.show({
            severity: "error",
            summary: "Erro",
            detail:
              response.message ||
              "Não foi possível carregar os detalhes do produto.",
            life: 3000,
          });
          setProduct(null);
        }
      } catch {
        toast.current?.show({
          severity: "error",
          summary: "Erro de Conexão",
          detail:
            "Verifique sua conexão ou se o servidor está rodando para detalhes do produto.",
          life: 3000,
        });
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };
    loadProductDetails();
  }, [id, navigate]);

  const { addToCart } = useCart();
  const handleAddToCart = () => {
    if (product) {
      addToCart(product);
      toast.current?.show({
        severity: "success",
        summary: "Adicionado!",
        detail: `${product.name} adicionado ao carrinho.`,
        life: 2000,
      });
    }
  };

  if (loading) {
    return (
      <div
        style={{
          minHeight: 400,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <p style={{ color: "#1769aa", fontWeight: "bold" }}>
          Carregando detalhes do produto...
        </p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 pt-32 text-center">
        <p className="text-lg text-red-700 font-semibold">
          Produto não encontrado ou erro ao carregar.
        </p>
        <Button
          label="Voltar para a Home"
          className="mt-4 p-button-secondary"
          onClick={() => navigate("/")}
        />
      </div>
    );
  }

  return (
    <div
      style={{
        maxWidth: 1150,
        margin: "0 auto",
        padding: "40px 16px 20px 16px",
        minHeight: "82vh",
      }}
    >
      <Toast ref={toast} />
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: 48,
          alignItems: "flex-start",
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        {}
        <div
          style={{
            flex: "1 1 400px",
            maxWidth: 430,
            minWidth: 280,
            background: "#fff",
            borderRadius: 18,
            boxShadow: "0 4px 16px #0001",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minHeight: 400,
            padding: 30,
          }}
        >
          <img
            src={
              product.imageUrl ||
              "https://via.placeholder.com/400x300?text=Sem+Imagem"
            }
            alt={product.name}
            style={{
              maxHeight: 340,
              maxWidth: "100%",
              width: "auto",
              height: "auto",
              borderRadius: 13,
              objectFit: "contain",
              background: "#f7f7f7",
            }}
            onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
              (e.target as HTMLImageElement).src =
                "https://via.placeholder.com/400x300?text=Erro+ao+carregar+imagem";
            }}
          />
        </div>

        <div
          style={{
            flex: "1 1 340px",
            maxWidth: 430,
            minWidth: 280,
            background: "#fff",
            borderRadius: 18,
            boxShadow: "0 4px 16px #0001",
            padding: 36,
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
          }}
        >
          <h1
            style={{
              fontSize: "2.2rem",
              fontWeight: 800,
              color: "#1769aa",
              marginBottom: 6,
              lineHeight: 1.13,
            }}
          >
            {product.name}
          </h1>
          <div
            style={{
              fontSize: "1.11rem",
              fontWeight: 500,
              color: "#495",
              marginBottom: 8,
              opacity: 0.85,
            }}
          >
            {product.category?.name}
          </div>
          <div
            style={{
              fontWeight: 900,
              fontSize: "1.45rem",
              color: "#ba1330",
              marginBottom: 14,
            }}
          >
            {product.price.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </div>
          <div
            style={{
              color: "#223",
              fontSize: "1.1rem",
              marginBottom: 26,
              opacity: 0.95,
              lineHeight: 1.5,
            }}
          >
            {product.description}
          </div>
          <div
            style={{
              display: "flex",
              gap: 14,
              flexWrap: "wrap",
              marginTop: 10,
            }}
          >
            <Button
              label="Adicionar ao Carrinho"
              icon="pi pi-shopping-cart"
              style={{
                background: "#1769aa",
                border: "none",
                fontWeight: 700,
                fontSize: "1.07rem",
                padding: "10px 20px",
                borderRadius: "10px",
                minWidth: 200,
              }}
              onClick={handleAddToCart}
            />
            <Button
              label="Voltar para a Lista"
              icon="pi pi-arrow-left"
              className="p-button-secondary"
              style={{
                background: "#e7eaf1",
                color: "#223",
                fontWeight: 700,
                fontSize: "1.07rem",
                padding: "10px 20px",
                borderRadius: "10px",
                minWidth: 180,
              }}
              onClick={() => navigate("/products")}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
