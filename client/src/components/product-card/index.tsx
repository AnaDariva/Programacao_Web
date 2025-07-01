import React, { useRef } from "react";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import type { IProduct } from "@/commons/types.ts";
import { useNavigate } from "react-router-dom";
import { useCart } from '@/context/CartContext';

interface IProductCardProps {
    product: IProduct;
}

export const ProductCard = ({ product }: IProductCardProps) => {
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const toast = useRef<Toast>(null);

    const priceFormatted = product.price.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
    });

    const handleViewDetails = () => {
        navigate(`/products/${product.id}`);
    };

    const handleAddToCart = () => {
        addToCart(product);
        toast.current?.show({
            severity: "success",
            summary: "Adicionado ao carrinho!",
            detail: `${product.name} adicionado ao carrinho.`,
            life: 1200,
        });
        setTimeout(() => {
            navigate("/cart");
        }, 1300);
    };

    return (
        <div
            style={{
                background: "#fff",
                borderRadius: "18px",
                boxShadow: "0 4px 16px #0002",
                padding: "20px 18px 16px 18px",
                margin: "0 0 20px 0",
                transition: "box-shadow .18s",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                minHeight: "410px"
            }}
            onMouseOver={e => (e.currentTarget.style.boxShadow = "0 8px 32px #0003")}
            onMouseOut={e => (e.currentTarget.style.boxShadow = "0 4px 16px #0002")}
        >
            <Toast ref={toast} />
            <img
                alt={product.name}
                src={product.imageUrl || "https://via.placeholder.com/300x200?text=Sem+Imagem"}
                onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                    (e.target as HTMLImageElement).src = "https://via.placeholder.com/300x200?text=Erro+ao+carregar+imagem";
                }}
                style={{
                    width: "100%",
                    height: "190px",
                    objectFit: "cover",
                    borderRadius: "12px",
                    marginBottom: "15px",
                    boxShadow: "0 2px 10px #0001"
                }}
            />

            <h2 style={{
                fontSize: "1.20rem",
                fontWeight: 700,
                margin: "0 0 10px 0",
                color: "#223",
                textAlign: "center"
            }}>{product.name}</h2>

            <p style={{
                color: "#444",
                fontSize: "0.97rem",
                marginBottom: "18px",
                textAlign: "center",
                minHeight: "45px"
            }}>
                {product.description || <span style={{ color: "#888" }}>Sem descrição</span>}
            </p>

            <div style={{
                display: "flex",
                width: "100%",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: "auto"
            }}>
                <span style={{
                    fontWeight: 800,
                    fontSize: "1.19rem",
                    color: "var(--nba-blue)"
                }}>
                    {priceFormatted}
                </span>
                <div style={{ display: "flex", gap: "8px" }}>
                    <Button
                        label="Comprar"
                        icon="pi pi-shopping-cart"
                        style={{
                            background: "var(--nba-red)",
                            border: "none",
                            borderRadius: "9px",
                            fontWeight: 700,
                            fontSize: "1.03rem",
                            padding: "8px 16px"
                        }}
                        className="p-button-sm"
                        onClick={handleAddToCart}
                        onMouseOver={e => (e.currentTarget.style.background = "#940021")}
                        onMouseOut={e => (e.currentTarget.style.background = "var(--nba-red)")}
                    />
                    <Button
                        label="Detalhes"
                        icon="pi pi-info-circle"
                        className="p-button-secondary p-button-sm"
                        style={{
                            borderRadius: "9px",
                            fontWeight: 600,
                            fontSize: "0.97rem",
                            background: "#e7eaf1",
                            color: "#223"
                        }}
                        onClick={handleViewDetails}
                    />
                </div>
            </div>
        </div>
    );
};
