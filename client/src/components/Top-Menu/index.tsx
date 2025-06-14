import React, { useEffect, useState } from "react";
import { Menubar } from "primereact/menubar";
import type { MenuItem } from "primereact/menuitem";
import { Avatar } from "primereact/avatar";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/hooks/use-auth";
import { InputSwitch } from "primereact/inputswitch";
import { useCart } from "@/context/CartContext"; // Importe o hook useCart

const TopMenu: React.FC = () => {
  const navigate = useNavigate();
  // TODO: Substituir 'user@email.com' pelo nome de usuário real do AuthContext
  const user = "user@email.com";
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    return localStorage.getItem("theme") === "dark";
  });
  const { authenticated, handleLogout } = useAuth();
  const { getTotalItems } = useCart(); // Use o hook useCart para obter a contagem de itens

  useEffect(() => {
    const themeLink = document.getElementById("theme-link") as HTMLLinkElement;
    themeLink.href = darkMode
      ? "https://unpkg.com/primereact/resources/themes/lara-dark-blue/theme.css"
      : "https://unpkg.com/primereact/resources/themes/lara-light-blue/theme.css";
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  const handleLogoutClick = () => {
    handleLogout();
    navigate("/login");
  };

  // Definição dos itens do menu principal
  const items: MenuItem[] = [
    { label: "Home", icon: "pi pi-home", command: () => navigate("/") },
    // Link para o carrinho, visível para todos os usuários
    {
      label: `Carrinho (${getTotalItems()})`, // Exibe a contagem de itens
      icon: "pi pi-shopping-cart",
      command: () => navigate("/cart"),
      className: "p-overlay-badge", // Classe para estilização de badge, se você tiver CSS customizado para isso
    },
  ];

  // Adicionar itens de administração apenas se o usuário estiver autenticado
  if (authenticated) {
    items.push(
      {
        label: "Categorias",
        icon: "pi pi-box",
        items: [
          {
            label: "Listar",
            icon: "pi pi-list",
            command: () => navigate("/categories"),
          },
          {
            label: "Novo",
            icon: "pi pi-plus",
            command: () => navigate("/categories/new"),
          },
        ],
      },
      {
        label: "Produtos",
        icon: "pi pi-box",
        items: [
          {
            label: "Listar",
            icon: "pi pi-list",
            command: () => navigate("/products"),
          },
          {
            label: "Novo",
            icon: "pi pi-plus",
            command: () => navigate("/products/new"),
          },
          {
            label: "View", // Nota: Essa rota "/products/view" pode ser desnecessária no contexto de e-commerce para o cliente final, a navegação para detalhes já ocorre via "/products/:id"
            icon: "pi pi-search",
            command: () => navigate("/products/view"),
          },
        ],
      },
    );
  }

  const start = (
    <div
      className="flex align-items-center gap-2 cursor-pointer"
      onClick={() => navigate("/")}
    >
      <img
        src="/assets/images/NBA3.png"
        alt="Logo"
        height={60}
        style={{
          objectFit: "contain",
          marginLeft: "10px",
          filter: darkMode ? "brightness(200%)" : "none",
        }}
      />
    </div>
  );

  const end = (
    <div className="flex align-items-center gap-3">
      <div className="flex items-center gap-2">
        <i
          className={`pi pi-sun ${
            darkMode ? "text-gray-400" : "text-yellow-500"
          }`}
          style={{ marginTop: "5px" }}
        />
        <InputSwitch
          checked={darkMode}
          onChange={(e) => setDarkMode(e.value ?? false)}
        />
        <i
          className={`pi pi-moon ${
            darkMode ? "text-blue-300" : "text-gray-400"
          }`}
          style={{ marginTop: "5px" }}
        />
      </div>

      {authenticated && (
        <>
          <span className="font-semibold hidden sm:block">{user}</span>
          <Avatar
            image="https://api.dicebear.com/9.x/bottts-neutral/svg?seed=Caleb"
            shape="square"
          />
          <Button
            icon="pi pi-sign-out"
            className="p-button-text"
            onClick={handleLogoutClick}
          />
        </>
      )}
    </div>
  );

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        width: "100%",
        zIndex: 1000,
        backgroundColor: "var(--surface-ground)",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      }}
      className="fixed top-0 left-0 w-full z-50"
    >
      <Menubar model={items} start={start} end={end} />
    </div>
  );
};

export default TopMenu;