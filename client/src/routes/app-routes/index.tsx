// src/routes/app-routes/index.tsx
import { Route, Routes } from "react-router-dom";
import { LoginPage } from "@/pages/login";
import { RegisterPage } from "@/pages/register";
import { HomePage } from "@/pages/home";
import { RequireAuth } from "@/components/require-auth";
import { Layout } from "@/components/layout";
import { NotFound } from "@/pages/not-found";
import { ProductView } from "@/pages/product-view";
import { CartPage } from "@/pages/Cart"; // <-- Importe a CartPage

export function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                {/* Rotas Públicas (acessíveis a todos, autenticados ou não) */}
                <Route index element={<HomePage />} />
                <Route path="login" element={<LoginPage />} />
                <Route path="register" element={<RegisterPage />} />
                <Route path="products/:id" element={<ProductView />} />
                <Route path="cart" element={<CartPage />} /> {/* <-- ROTA PÚBLICA PARA O CARRINHO */}

                {/* Rotas Protegidas (exigem autenticação) */}
                <Route element={<RequireAuth />}>
                    <Route path="/home" element={<HomePage />} /> {/* Mantendo se você quiser uma "/home" protegida */}
                    {/* A partir daqui, teremos rotas que exigem login para acessar */}
                    {/* Ex: */}
                    {/* <Route path="checkout" element={<CheckoutPage />} /> */}
                    {/* <Route path="orders" element={<OrderHistoryPage />} /> */}
                    {/* <Route path="profile" element={<UserProfilePage />} /> */}
                </Route>

                {/* Rota para página não encontrada (404) */}
                <Route path="*" element={<NotFound />} />
            </Route>
        </Routes>
    );
}