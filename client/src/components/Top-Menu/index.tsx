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
  
  const user = "user@email.com";
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    return localStorage.getItem("theme") === "dark";
  });
  const { authenticated, handleLogout } = useAuth();
  const { getTotalItems } = useCart(); 

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

  
  const items: MenuItem[] = [
  { label: "Home", icon: "pi pi-home", command: () => navigate("/") },
  {
    label: "Produtos",
    icon: "pi pi-shopping-bag",
    command: () => navigate("/products"),
  },
  {
    label: `Carrinho (${getTotalItems()})`,
    icon: "pi pi-shopping-cart",
    command: () => navigate("/cart"),
    className: "p-overlay-badge",
  },
];

  
 if (authenticated) {
  items.push(
    { label: "Meus Pedidos", icon: "pi pi-receipt", command: () => navigate("/orders") }
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

      {authenticated ? ( 
        <>
          <span className="font-semibold hidden sm:block">{user}</span> 
          <Avatar
            image="https://as2.ftcdn.net/jpg/03/49/49/79/1000_F_349497933_Ly4im8BDmHLaLzgyKg2f2yZOvJjBtlw5.jpg"
            shape="square"
          />
          <Button
            icon="pi pi-sign-out"
            className="p-button-text"
            onClick={handleLogoutClick}
          />
        </>
      ) : ( 
        <div className="flex gap-2">
          <Button
            label="Login"
            icon="pi pi-user"
            className="p-button-text"
            onClick={() => navigate("/login")}
          />
          <Button
            label="Registrar"
            icon="pi pi-user-plus"
            className="p-button-secondary p-button-text"
            onClick={() => navigate("/register")}
          />
        </div>
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