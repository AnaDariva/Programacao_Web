import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Toast } from "primereact/toast";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/hooks/use-auth";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { calculateShipping } from "@/services/shippingService";
import { getMyAddresses } from "@/services/address-service";
import type { IAddress } from "@/commons/types"; // CERTO!
import type { IPaymentMethod } from "@/commons/types";

export const CheckoutPage: React.FC = () => {
  const { cartItems, getTotalPrice, clearCart } = useCart();
  const { authenticated, authenticatedUser } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const toast = useRef<Toast>(null);

  const [availableAddresses, setAvailableAddresses] = useState<IAddress[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<IAddress | null>(null);
  const [newAddress, setNewAddress] = useState<IAddress>({
    street: "",
    number: "",
    complement: "",
    neighborhood: "",
    city: "",
    state: "",
    zipCode: "",
  });
  const [showNewAddressForm, setShowNewAddressForm] = useState(false);
  const [shippingCost, setShippingCost] = useState<number | null>(null);

  const availablePaymentMethods: IPaymentMethod[] = [
    { id: 1, type: "credit_card", details: "Cartão de Crédito **** 1234" },
    { id: 2, type: "boleto", details: "Boleto Bancário" },
  ];
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState<IPaymentMethod | null>(null);

  useEffect(() => {
    if (cartItems.length === 0) {
      toast.current?.show({
        severity: "warn",
        summary: "Carrinho Vazio",
        detail:
          "Seu carrinho está vazio. Adicione produtos antes de finalizar a compra.",
        life: 3000,
      });
      setTimeout(() => {
        navigate("/cart");
      }, 3100);
      return;
    }
    if (!authenticated) {
      toast.current?.show({
        severity: "info",
        summary: "Autenticação Necessária",
        detail: "Você precisa estar logado para finalizar a compra.",
        life: 3000,
      });
      const currentPath = window.location.pathname + window.location.search;
      navigate("/login?redirect=" + encodeURIComponent(currentPath));
      return;
    }
    (async () => {
      try {
        const addresses = await getMyAddresses();
        setAvailableAddresses(addresses || []);
        if (addresses.length > 0) setSelectedAddress(addresses[0]);
      } catch {
        setAvailableAddresses([]);
      }
    })();
  }, [cartItems, authenticated, navigate, searchParams]);

  const handleSaveAddress = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.current?.show({
        severity: "error",
        summary: "Erro",
        detail: "Token não encontrado. Faça login novamente.",
        life: 3000,
      });
      return;
    }
    try {
      const response = await fetch("http://localhost:8080/addresses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newAddress),
      });
      if (response.ok) {
        toast.current?.show({
          severity: "success",
          summary: "Endereço salvo!",
          detail: "O novo endereço foi salvo com sucesso.",
          life: 3000,
        });
        const addresses = await getMyAddresses();
        setAvailableAddresses(addresses);
        setSelectedAddress(addresses[addresses.length - 1]);
        setShowNewAddressForm(false);
      } else {
        toast.current?.show({
          severity: "error",
          summary: "Erro ao salvar endereço",
          detail: "Tente novamente mais tarde.",
          life: 3000,
        });
      }
    } catch {
      toast.current?.show({
        severity: "error",
        summary: "Erro de conexão",
        detail: "Tente novamente mais tarde.",
        life: 3000,
      });
    }
  };

  const handleCalculateShipping = async (zipCode: string) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.current?.show({
          severity: "error",
          summary: "Token não encontrado!",
          detail: "Você precisa estar logado.",
          life: 3000,
        });
        return;
      }
      const cost = await calculateShipping(zipCode, token);
      if (typeof cost !== "number") {
        toast.current?.show({
          severity: "error",
          summary: "Frete inválido",
          detail: "O valor do frete retornado não é um número.",
          life: 3000,
        });
        return;
      }
      setShippingCost(cost);
      toast.current?.show({
        severity: "success",
        summary: "Frete calculado!",
        detail: `O valor do frete é R$ ${cost.toFixed(2)}`,
        life: 2000,
      });
    } catch {
      toast.current?.show({
        severity: "error",
        summary: "Erro ao calcular frete",
        detail: "Tente novamente mais tarde.",
        life: 3000,
      });
    }
  };

  const fetchAddressByCep = async () => {
    if (!newAddress.zipCode || newAddress.zipCode.length < 8) {
      toast.current?.show({
        severity: "warn",
        summary: "CEP inválido.",
        life: 2000,
      });
      return;
    }
    toast.current?.show({
      severity: "info",
      summary: "Buscando endereço...",
      life: 1000,
    });
    try {
      const response = await fetch(
        `https://viacep.com.br/ws/${newAddress.zipCode.replace(
          /\D/g,
          ""
        )}/json/`
      );
      const data = await response.json();
      if (data.erro) {
        toast.current?.show({
          severity: "error",
          summary: "CEP não encontrado.",
          life: 3000,
        });
        setNewAddress((prev: IAddress) => ({
          ...prev,
          street: "",
          neighborhood: "",
          city: "",
          state: "",
        }));
      } else {
        setNewAddress((prev: IAddress) => ({
          ...prev,
          street: data.logradouro,
          neighborhood: data.bairro,
          city: data.localidade,
          state: data.uf,
        }));
        await handleCalculateShipping(newAddress.zipCode);
        toast.current?.show({
          severity: "success",
          summary: "Endereço preenchido!",
          life: 2000,
        });
      }
    } catch {
      toast.current?.show({
        severity: "error",
        summary: "Erro de conexão.",
        life: 3000,
      });
    }
  };

  const handleFinalizePurchase = async () => {
    if (!selectedAddress) {
      toast.current?.show({
        severity: "error",
        summary: "Erro",
        detail: "Por favor, selecione um endereço.",
        life: 3000,
      });
      return;
    }
    if (!selectedPaymentMethod) {
      toast.current?.show({
        severity: "error",
        summary: "Erro",
        detail: "Por favor, selecione um método de pagamento.",
        life: 3000,
      });
      return;
    }
    const shippingAddress = selectedAddress;
    const orderData = {
      totalAmount: getTotalPrice() + (shippingCost || 0),
      orderDate: new Date().toISOString(),
      status: "PENDING",
      items: cartItems.map((item) => ({
        productId: item.product.id,
        quantity: item.quantity,
        price: item.product.price,
        productName: item.product.name,
        productImageUrl: item.product.imageUrl,
      })),
      shippingAddress: {
        street: shippingAddress.street,
        number: shippingAddress.number,
        complement: shippingAddress.complement,
        neighborhood: shippingAddress.neighborhood,
        city: shippingAddress.city,
        state: shippingAddress.state,
        zipCode: shippingAddress.zipCode,
      },
      paymentMethod: {
        type: selectedPaymentMethod.type,
        details: selectedPaymentMethod.details,
      },
    };
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:8080/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(orderData),
      });
      if (response.ok) {
        toast.current?.show({
          severity: "success",
          summary: "Pedido Finalizado!",
          detail: "Seu pedido foi finalizado com sucesso.",
          life: 4000,
        });
        clearCart();
        setTimeout(() => {
          navigate("/orders");
        }, 4100);
      } else {
        toast.current?.show({
          severity: "error",
          summary: "Erro ao finalizar pedido",
          detail: "Tente novamente mais tarde.",
          life: 4000,
        });
      }
    } catch {
      toast.current?.show({
        severity: "error",
        summary: "Erro de conexão",
        detail: "Tente novamente mais tarde.",
        life: 4000,
      });
    }
  };

  return (
    <div
      style={{
        maxWidth: 1180,
        margin: "0 auto",
        padding: "40px 8px 56px 8px",
        minHeight: "85vh",
      }}
    >
      <Toast ref={toast} />
      <h1
        style={{
          fontSize: "2.4rem",
          fontWeight: 900,
          textAlign: "center",
          color: "var(--nba-blue)",
          letterSpacing: "-1.5px",
          marginBottom: 16,
        }}
      >
        Finalizar Compra
      </h1>
      {authenticatedUser && (
        <p
          style={{
            textAlign: "center",
            fontSize: "1.19rem",
            color: "#444",
            marginBottom: 32,
          }}
        >
          Olá,{" "}
          <span style={{ color: "var(--nba-red)", fontWeight: 700 }}>
            {authenticatedUser.displayName || authenticatedUser.username}
          </span>
          ! Confirme seus dados para concluir o pedido.
        </p>
      )}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "38px",
          alignItems: "flex-start",
          justifyContent: "center",
        }}
      >
        <div style={{ flex: "1 1 360px", maxWidth: 480, minWidth: 320 }}>
          <Card
            title="Itens do Pedido"
            style={{
              marginBottom: 28,
              background: "#fff",
              border: "none",
              borderRadius: "18px",
              boxShadow: "0 3px 16px #0002",
              padding: "0 0 16px 0",
            }}
          >
            {cartItems.map((item) => (
              <div
                key={item.product.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                  borderBottom: "1px solid #ececec",
                  padding: "12px 0",
                }}
              >
                <img
                  src={
                    item.product.imageUrl ||
                    "https://via.placeholder.com/60x60?text=Item"
                  }
                  alt={item.product.name}
                  style={{
                    width: 60,
                    height: 60,
                    objectFit: "cover",
                    borderRadius: 10,
                    boxShadow: "0 1px 6px #0002",
                  }}
                />
                <div style={{ flexGrow: 1 }}>
                  <div
                    style={{
                      fontWeight: 600,
                      fontSize: "1.04rem",
                      color: "#223",
                    }}
                  >
                    {item.product.name}
                  </div>
                  <div style={{ fontSize: ".99rem", color: "#888" }}>
                    Quantidade:{" "}
                    <span style={{ color: "var(--nba-blue)", fontWeight: 700 }}>
                      {item.quantity}
                    </span>
                  </div>
                </div>
                <span
                  style={{
                    fontWeight: 700,
                    color: "var(--nba-blue)",
                    fontSize: "1.06rem",
                  }}
                >
                  {(item.product.price * item.quantity).toLocaleString(
                    "pt-BR",
                    { style: "currency", currency: "BRL" }
                  )}
                </span>
              </div>
            ))}
            {shippingCost !== null && (
              <div
                style={{
                  textAlign: "right",
                  fontWeight: 600,
                  color: "var(--nba-blue)",
                  fontSize: "1.13rem",
                  marginTop: 6,
                }}
              >
                Frete: R$ {shippingCost.toFixed(2)}
              </div>
            )}
            <div
              style={{
                textAlign: "right",
                fontWeight: 900,
                color: "var(--nba-red)",
                fontSize: "1.45rem",
                marginTop: 18,
              }}
            >
              Total:{" "}
              {(getTotalPrice() + (shippingCost || 0)).toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </div>
          </Card>
          <Button
            label="Finalizar Pedido"
            icon="pi pi-check"
            className="p-button-success p-button-lg w-full"
            onClick={handleFinalizePurchase}
            disabled={!cartItems.length || !shippingCost}
            style={{
              fontWeight: 800,
              fontSize: "1.06rem",
              marginTop: 8,
              marginBottom: 10,
            }}
          />
          <Button
            label="Voltar para o Carrinho"
            icon="pi pi-arrow-left"
            className="p-button-secondary p-button-lg w-full"
            onClick={() => navigate("/cart")}
            style={{ fontWeight: 700, fontSize: "1.03rem", marginTop: 8 }}
          />
        </div>

        <div style={{ flex: "1 1 340px", maxWidth: 440, minWidth: 320 }}>
          <Card
            title="Endereço de Entrega"
            style={{
              marginBottom: 24,
              background: "#fff",
              border: "none",
              borderRadius: "18px",
              boxShadow: "0 3px 16px #0002",
              padding: "0 0 16px 0",
            }}
          >
            <div
              style={{
                fontWeight: 600,
                fontSize: "1.07rem",
                marginBottom: 8,
                color: "#223",
              }}
            >
              Selecione um endereço:
            </div>
            <Dropdown
              value={selectedAddress}
              onChange={(e) => {
                setSelectedAddress(e.value);
                setShowNewAddressForm(false);
              }}
              options={availableAddresses}
              optionLabel="street"
              placeholder="Selecione um endereço"
              className="w-full mb-3"
              style={{ width: "100%", marginBottom: 12 }}
            />
            <Button
              label={
                showNewAddressForm
                  ? "Cancelar Novo Endereço"
                  : "Cadastrar Novo Endereço"
              }
              icon={showNewAddressForm ? "pi pi-times" : "pi pi-plus"}
              className="p-button-secondary p-button-outlined w-full"
              onClick={() => {
                setShowNewAddressForm((prev) => !prev);
                setSelectedAddress(null);
              }}
              style={{ marginBottom: 0 }}
            />

            {showNewAddressForm && (
              <div style={{ marginTop: 18, marginBottom: 8 }}>
                <div className="p-inputgroup" style={{ marginBottom: 10 }}>
                  <InputText
                    placeholder="CEP"
                    value={newAddress.zipCode}
                    onChange={(e) =>
                      setNewAddress((prev: IAddress) => ({
                        ...prev,
                        zipCode: e.target.value
                          .replace(/\D/g, "")
                          .substring(0, 8),
                      }))
                    }
                    onBlur={fetchAddressByCep}
                    className="w-full"
                  />
                  <Button
                    icon="pi pi-search"
                    className="p-button-secondary"
                    onClick={fetchAddressByCep}
                    tooltip="Buscar CEP"
                  />
                </div>
                <InputText
                  placeholder="Rua"
                  value={newAddress.street}
                  onChange={(e) =>
                    setNewAddress((prev: IAddress) => ({
                      ...prev,
                      street: e.target.value,
                    }))
                  }
                  className="w-full"
                  style={{ marginBottom: 8 }}
                />
                <InputText
                  placeholder="Número"
                  value={newAddress.number}
                  onChange={(e) =>
                    setNewAddress((prev: IAddress) => ({
                      ...prev,
                      number: e.target.value,
                    }))
                  }
                  className="w-full"
                  style={{ marginBottom: 8 }}
                />
                <InputText
                  placeholder="Complemento"
                  value={newAddress.complement || ""}
                  onChange={(e) =>
                    setNewAddress((prev: IAddress) => ({
                      ...prev,
                      complement: e.target.value,
                    }))
                  }
                  className="w-full"
                  style={{ marginBottom: 8 }}
                />
                <InputText
                  placeholder="Bairro"
                  value={newAddress.neighborhood}
                  onChange={(e) =>
                    setNewAddress((prev: IAddress) => ({
                      ...prev,
                      neighborhood: e.target.value,
                    }))
                  }
                  className="w-full"
                  style={{ marginBottom: 8 }}
                />
                <InputText
                  placeholder="Cidade"
                  value={newAddress.city}
                  onChange={(e) =>
                    setNewAddress((prev: IAddress) => ({
                      ...prev,
                      city: e.target.value,
                    }))
                  }
                  className="w-full"
                  style={{ marginBottom: 8 }}
                />
                <InputText
                  placeholder="Estado"
                  value={newAddress.state}
                  onChange={(e) =>
                    setNewAddress((prev: IAddress) => ({
                      ...prev,
                      state: e.target.value,
                    }))
                  }
                  className="w-full"
                  maxLength={2}
                  style={{ marginBottom: 8 }}
                />
                <Button
                  label="Salvar Endereço"
                  icon="pi pi-save"
                  className="p-button-success p-button-lg w-full mt-4"
                  onClick={handleSaveAddress}
                />
              </div>
            )}
          </Card>

          <Card
            title="Método de Pagamento"
            style={{
              marginBottom: 0,
              background: "#fff",
              border: "none",
              borderRadius: "18px",
              boxShadow: "0 3px 16px #0002",
              padding: "0 0 16px 0",
            }}
          >
            <div
              style={{
                fontWeight: 600,
                fontSize: "1.07rem",
                marginBottom: 8,
                color: "#223",
              }}
            >
              Selecione um método de pagamento:
            </div>
            <Dropdown
              value={selectedPaymentMethod}
              onChange={(e) => setSelectedPaymentMethod(e.value)}
              options={availablePaymentMethods}
              optionLabel="details"
              placeholder="Selecione um método de pagamento"
              className="w-full mb-3"
              style={{ width: "100%" }}
            />
          </Card>
        </div>
      </div>
    </div>
  );
};
