import { Card } from "primereact/card";
import { Button } from "primereact/button";
import type { IProduct } from "@/commons/types.ts";
import { useNavigate } from "react-router-dom"; // MANTENHA ESTE IMPORT
import { useCart } from '@/context/CartContext';

interface IProductCardProps {
    product: IProduct;
}

export const ProductCard = ({ product }: IProductCardProps) => {
    const navigate = useNavigate(); // MANTENHA ESTA LINHA (hook)
    const { addToCart } = useCart();

    const priceFormatted = product.price.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
    });

    // REINTRODUZIR ESTA FUNÇÃO handleViewDetails
    const handleViewDetails = () => {
        navigate(`/products/${product.id}`);
    };

    const handleAddToCart = () => {
        addToCart(product);
        console.log(`Adicionado ${product.name} ao carrinho!`);
        // Opcional: Adicionar um Toast para confirmar que o item foi adicionado
        // Se você tiver um toast ref aqui, pode usar:
        // if (toast.current) {
        //     toast.current.show({ severity: 'success', summary: 'Adicionado!', detail: `${product.name} adicionado ao carrinho.`, life: 2000 });
        // }
    };

    return (
        <div className="p-col-12 p-sm-6 p-md-4 p-lg-3 mb-4 flex">
            <Card
                title={product.name}
                header={
                    <img
                        alt={product.name}
                        src={product.imageUrl || "https://via.placeholder.com/300x200?text=Sem+Imagem"}
                        onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                            (e.target as HTMLImageElement).src = "https://via.placeholder.com/300x200?text=Erro+ao+carregar+imagem";
                        }}
                        style={{ width: "100%", height: "200px", objectFit: "cover" }}
                    />
                }
                footer={
                    <div className="flex justify-between items-center mt-auto">
                        <span className="text-xl font-bold">{priceFormatted}</span>
                        <div className="flex gap-2">
                            <Button
                                label="Comprar"
                                icon="pi pi-shopping-cart"
                                className="p-button-sm"
                                onClick={handleAddToCart}
                            />
                            <Button
                                label="Detalhes"
                                icon="pi pi-info-circle"
                                className="p-button-secondary p-button-sm"
                                onClick={handleViewDetails} // <-- ATRIBUIR AQUI
                            />
                        </div>
                    </div>
                }
                className="w-full flex flex-col"
            >
                <p className="text-gray-700 text-sm mb-4 flex-grow">{product.description}</p>
            </Card>
        </div>
    );
};