import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Importar useParams e useNavigate
import { Toast } from "primereact/toast"; // Para mensagens de feedback
import { Button } from "primereact/button"; // Para o botão de adicionar ao carrinho
import type { IProduct } from "@/commons/types";
import ProductService from "@/services/product-service";
import { useCart } from '@/context/CartContext';

export const ProductView = () => {
    const { id } = useParams<{ id: string }>(); // Obtém o ID da URL
    const navigate = useNavigate(); // Para possíveis redirecionamentos
    const toast = useRef<Toast>(null); // Referência para o Toast
    const [product, setProduct] = useState<IProduct | null>(null); // Estado para UM produto
    const [loading, setLoading] = useState<boolean>(true); // Estado de carregamento

    useEffect(() => {
        const loadProductDetails = async () => {
            setLoading(true);
            if (!id) {
                // Se não houver ID na URL, redireciona ou mostra erro
                toast.current?.show({
                    severity: "error",
                    summary: "Erro",
                    detail: "ID do produto não fornecido.",
                    life: 3000,
                });
                navigate("/"); // Redireciona para a home
                setLoading(false);
                return;
            }

            try {
                const response = await ProductService.findById(parseInt(id)); // Converter ID para número

                if (response.status === 200 && response.data) {
                    setProduct(response.data as IProduct);
                } else {
                    toast.current?.show({
                        severity: "error",
                        summary: "Erro",
                        detail: response.message || "Não foi possível carregar os detalhes do produto.",
                        life: 3000,
                    });
                    setProduct(null); // Limpa o produto se houver erro
                }
            } catch (error: any) {
                console.error("Erro ao carregar detalhes do produto:", error);
                toast.current?.show({
                    severity: "error",
                    summary: "Erro de Conexão",
                    detail: "Verifique sua conexão ou se o servidor está rodando para detalhes do produto.",
                    life: 3000,
                });
                setProduct(null);
            } finally {
                setLoading(false);
            }
        };

        loadProductDetails();
    }, [id, navigate]); // Recarrega se o ID na URL mudar, e depende de navigate

     const { addToCart } = useCart();
    const handleAddToCart = () => {
        if (product) {
            addToCart(product); // Chama a função para adicionar ao carrinho
            toast.current?.show({
                severity: "success",
                summary: "Adicionado!",
                detail: `${product.name} adicionado ao carrinho.`,
                life: 2000,
            });
            console.log(`Adicionar ${product.name} (ID: ${product.id}) ao carrinho!`);
        }
    };

    if (loading) {
        return (
            <div className="container mx-auto px-4 pt-24 text-center text-white">
                <p>Carregando detalhes do produto...</p>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="container mx-auto px-4 pt-24 text-center text-white">
                <p>Produto não encontrado ou erro ao carregar.</p>
                <Button label="Voltar para a Home" className="mt-4" onClick={() => navigate("/")} />
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8 pt-24"> {/* Ajuste de padding */}
            <Toast ref={toast} />
            <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
                {/* Imagem do Produto */}
                <div className="w-full md:w-1/2 flex justify-center">
                    <img
                        src={product.imageUrl || "https://via.placeholder.com/400x300?text=Sem+Imagem"}
                        alt={product.name}
                        className="max-w-full h-auto rounded-lg shadow-lg"
                        style={{ maxHeight: '500px', objectFit: 'contain' }}
                        onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                            (e.target as HTMLImageElement).src = "https://via.placeholder.com/400x300?text=Erro+ao+carregar+imagem";
                        }}
                    />
                </div>

                {/* Detalhes do Produto */}
                <div className="w-full md:w-1/2 text-white">
                    <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
                    <p className="text-xl text-gray-300 mb-6">{product.category.name}</p>
                    <p className="text-2xl font-semibold mb-6">
                        {product.price.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                    </p>
                    <p className="text-lg mb-8 leading-relaxed">{product.description}</p>

                    <Button
                        label="Adicionar ao Carrinho"
                        icon="pi pi-shopping-cart"
                        className="p-button-lg w-full md:w-auto" // Botão maior
                        onClick={handleAddToCart}
                    />

                    <Button
                        label="Voltar para a Lista"
                        icon="pi pi-arrow-left"
                        className="p-button-secondary p-button-lg w-full md:w-auto mt-4 md:ml-4"
                        onClick={() => navigate("/")} // Ou navigate(-1) para voltar à página anterior
                    />
                </div>
            </div>
        </div>
    );
};