import React from "react";
import { useCart } from "@/context/CartContext";
import { Button } from "primereact/button";
import { InputNumber } from "primereact/inputnumber";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { Toast } from "primereact/toast";
import { useNavigate } from "react-router-dom";

export const CartPage: React.FC = () => {
  const {
    cartItems,
    updateQuantity,
    removeFromCart,
    clearCart,
    getTotalPrice,
    getTotalItems,
  } = useCart();
  const toast = React.useRef<Toast>(null);
  const navigate = useNavigate();

  const confirmRemoveItem = (productId: number, productName: string) => {
    confirmDialog({
      message: `Tem certeza que deseja remover "${productName}" do carrinho?`,
      header: "Remover Item",
      icon: "pi pi-exclamation-triangle",
      acceptLabel: "Sim",
      rejectLabel: "Não",
      accept: () => {
        removeFromCart(productId);
        toast.current?.show({
          severity: "success",
          summary: "Removido",
          detail: `${productName} removido do carrinho.`,
          life: 2000,
        });
      },
    });
  };

  const confirmClearCart = () => {
    confirmDialog({
      message: "Tem certeza que deseja remover TODOS os itens do carrinho?",
      header: "Limpar Carrinho",
      icon: "pi pi-exclamation-triangle",
      acceptLabel: "Sim",
      rejectLabel: "Não",
      accept: () => {
        clearCart();
        toast.current?.show({
          severity: "success",
          summary: "Limpo",
          detail: "Todos os itens foram removidos.",
          life: 2000,
        });
      },
    });
  };

  const handleCheckout = () => {
    if (getTotalItems() === 0) {
      toast.current?.show({
        severity: "warn",
        summary: "Carrinho Vazio",
        detail: "Adicione produtos antes de finalizar a compra.",
        life: 3000,
      });
      return;
    }
    navigate("/checkout");
  };

  return (
    <div
      style={{
        maxWidth: 1200,
        margin: "0 auto",
        padding: "32px 16px 32px 16px",
        minHeight: "80vh",
      }}
    >
      <Toast ref={toast} />
      <ConfirmDialog />
      <h1
        style={{
          fontSize: "2.2rem",
          fontWeight: 800,
          letterSpacing: "-0.5px",
          marginBottom: "12px",
          color: "var(--nba-blue)",
          textAlign: "center",
        }}
      >
        🛒 Seu Carrinho de Compras
      </h1>
      {cartItems.length === 0 ? (
        <div
          style={{
            textAlign: "center",
            marginTop: 48,
          }}
        >
          <img
            src="https://cdn-icons-png.flaticon.com/512/2038/2038854.png"
            alt="Carrinho vazio"
            style={{ width: 110, margin: "0 auto 20px", opacity: 0.9 }}
          />
          <p
            style={{
              fontSize: "1.2rem",
              marginBottom: 16,
              color: "#223",
            }}
          >
            Seu carrinho está vazio.
            <br />
            <span style={{ color: "var(--nba-blue)", fontWeight: 700 }}>
              Adicione produtos e viva o basquete com estilo!
            </span>
          </p>
          <Button
            label="Voltar para a Loja"
            icon="pi pi-shopping-bag"
            className="p-button-lg"
            style={{
              background: "var(--nba-blue)",
              border: "none",
              fontWeight: 700,
              fontSize: "1.06rem",
            }}
            onClick={() => navigate("/products")}
          />
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            gap: "40px",
            marginTop: "30px",
            alignItems: "flex-start",
            flexWrap: "wrap",
          }}
        >
          <div style={{ flex: 2, minWidth: 0 }}>
            {cartItems.map((item) => (
              <div
                key={item.product.id}
                style={{
                  background: "#fff",
                  borderRadius: "16px",
                  boxShadow: "0 2px 14px #0001",
                  marginBottom: "18px",
                  padding: "18px 14px",
                  display: "flex",
                  alignItems: "center",
                  gap: 20,
                }}
              >
                <img
                  src={
                    item.product.imageUrl ||
                    "https://via.placeholder.com/100x100?text=Sem+Imagem"
                  }
                  alt={item.product.name}
                  style={{
                    width: 90,
                    height: 90,
                    objectFit: "cover",
                    borderRadius: 12,
                    boxShadow: "0 1px 6px #0002",
                  }}
                  onError={(
                    e: React.SyntheticEvent<HTMLImageElement, Event>
                  ) => {
                    (e.target as HTMLImageElement).src =
                      "https://via.placeholder.com/100x100?text=Erro";
                  }}
                />
                <div style={{ flex: 1 }}>
                  <h2
                    style={{
                      fontSize: "1.2rem",
                      fontWeight: 700,
                      margin: "0 0 5px 0",
                    }}
                  >
                    {item.product.name}
                  </h2>
                  <p
                    style={{
                      color: "var(--nba-blue)",
                      fontWeight: 700,
                      fontSize: "1.07rem",
                      marginBottom: 2,
                    }}
                  >
                    {item.product.price.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </p>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                    }}
                  >
                    <Button
                      icon="pi pi-minus"
                      className="p-button-sm p-button-text"
                      style={{ fontWeight: 800, color: "var(--nba-blue)" }}
                      onClick={() =>
                        updateQuantity(item.product.id!, item.quantity - 1)
                      }
                      disabled={item.quantity <= 1}
                    />
                    <InputNumber
                      value={item.quantity}
                      onValueChange={(e) =>
                        updateQuantity(item.product.id!, e.value || 1)
                      }
                      showButtons={false}
                      min={1}
                      max={99}
                      inputStyle={{
                        width: 38,
                        textAlign: "center",
                        fontWeight: 700,
                        color: "#222",
                      }}
                    />
                    <Button
                      icon="pi pi-plus"
                      className="p-button-sm p-button-text"
                      style={{ fontWeight: 800, color: "var(--nba-blue)" }}
                      onClick={() =>
                        updateQuantity(item.product.id!, item.quantity + 1)
                      }
                    />
                  </div>
                </div>
                <Button
                  icon="pi pi-trash"
                  className="p-button-sm p-button-danger p-button-text"
                  onClick={() =>
                    confirmRemoveItem(item.product.id!, item.product.name)
                  }
                  tooltip="Remover item"
                />
              </div>
            ))}
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                marginTop: 18,
              }}
            >
              <Button
                label="Limpar Carrinho"
                icon="pi pi-times"
                className="p-button-danger p-button-outlined"
                style={{ fontWeight: 600, fontSize: "1rem" }}
                onClick={confirmClearCart}
              />
            </div>
          </div>

          <div
            style={{
              background: "#fff",
              borderRadius: "14px",
              boxShadow: "0 2px 14px #0001",
              padding: "40px 30px",
              maxWidth: 450,
              minWidth: 330,
              minHeight: 320,
              marginLeft: "auto",
              flex: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
            }}
          >
            <h3
              style={{
                fontWeight: 800,
                color: "var(--nba-blue)",
                marginBottom: 22,
                fontSize: "1.48rem",
                textAlign: "center",
              }}
            >
              Resumo do Pedido
            </h3>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: "1.18rem",
                marginBottom: 14,
              }}
            >
              <span>Total de Itens:</span>
              <span>{getTotalItems()}</span>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontWeight: 700,
                fontSize: "1.35rem",
                color: "#222",
                borderTop: "1px solid #ececec",
                marginTop: 18,
                paddingTop: 18,
              }}
            >
              <span>Total:</span>
              <span>
                {getTotalPrice().toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </span>
            </div>
            <Button
              label="Finalizar Compra"
              icon="pi pi-check-circle"
              className="p-button-success p-button-lg w-full mt-6"
              style={{ fontWeight: 700, fontSize: "1.09rem", marginTop: 30 }}
              onClick={handleCheckout}
            />
          </div>
        </div>
      )}
    </div>
  );
};
