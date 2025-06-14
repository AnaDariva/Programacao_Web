// src/pages/Cart/index.tsx
import React from 'react';
import { useCart } from '@/context/CartContext'; // Importa o hook do carrinho
import { Button } from 'primereact/button';
import { InputNumber } from 'primereact/inputnumber'; // Para ajustar a quantidade
import { Card } from 'primereact/card'; // Para exibir cada item do carrinho
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog'; // Para confirmação de exclusão
import { Toast } from 'primereact/toast'; // Para feedback ao usuário
import { useNavigate } from 'react-router-dom'; // Para navegação (ex: finalizar compra)

export const CartPage: React.FC = () => {
    const { cartItems, updateQuantity, removeFromCart, clearCart, getTotalPrice, getTotalItems } = useCart();
    const toast = React.useRef<Toast>(null);
    const navigate = useNavigate();

    // Função para confirmar a remoção de um item
    const confirmRemoveItem = (productId: number, productName: string) => {
        confirmDialog({
            message: `Tem certeza que deseja remover "${productName}" do carrinho?`,
            header: 'Remover Item',
            icon: 'pi pi-exclamation-triangle',
            acceptLabel: 'Sim',
            rejectLabel: 'Não',
            accept: () => {
                removeFromCart(productId);
                toast.current?.show({ severity: 'success', summary: 'Removido', detail: `${productName} removido do carrinho.`, life: 2000 });
            },
            reject: () => { /* Não faz nada se cancelar */ }
        });
    };

    // Função para confirmar a limpeza total do carrinho
    const confirmClearCart = () => {
        confirmDialog({
            message: 'Tem certeza que deseja remover TODOS os itens do carrinho?',
            header: 'Limpar Carrinho',
            icon: 'pi pi-exclamation-triangle',
            acceptLabel: 'Sim',
            rejectLabel: 'Não',
            accept: () => {
                clearCart();
                toast.current?.show({ severity: 'success', summary: 'Limpo', detail: 'Todos os itens foram removidos do carrinho.', life: 2000 });
            },
            reject: () => { /* Não faz nada se cancelar */ }
        });
    };

    // Função para navegar para a finalização da compra
    const handleCheckout = () => {
        if (getTotalItems() === 0) {
            toast.current?.show({ severity: 'warn', summary: 'Carrinho Vazio', detail: 'Adicione produtos ao carrinho antes de finalizar a compra.', life: 3000 });
            return;
        }
        navigate('/checkout'); // TODO: Definir e implementar a rota e a página de Checkout
    };

    return (
        <div className="container mx-auto px-4 py-8 pt-24 text-white"> {/* pt-24 para espaço do cabeçalho */}
            <Toast ref={toast} />
            <ConfirmDialog /> {/* Componente para diálogos de confirmação */}

            <h1 className="text-3xl font-bold text-center mb-8">Seu Carrinho de Compras</h1>

            {cartItems.length === 0 ? (
                <div className="text-center text-xl mt-10">
                    <p>Seu carrinho está vazio. Adicione alguns produtos da nossa <span className="text-blue-400 cursor-pointer hover:underline" onClick={() => navigate('/')}>NBA Store</span>!</p>
                    <Button
                        label="Voltar para a Loja"
                        icon="pi pi-shopping-bag"
                        className="p-button-lg mt-8 p-button-info"
                        onClick={() => navigate('/')}
                    />
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Coluna Principal: Itens do Carrinho */}
                    <div className="md:col-span-2 space-y-4">
                        {cartItems.map(item => (
                            <Card key={item.product.id} className="p-4 flex items-center gap-4 bg-gray-800 border-gray-700">
                                <img
                                    src={item.product.imageUrl || "https://via.placeholder.com/100x100?text=Sem+Imagem"}
                                    alt={item.product.name}
                                    className="w-24 h-24 object-cover rounded-md"
                                    onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                                        (e.target as HTMLImageElement).src = "https://via.placeholder.com/100x100?text=Erro";
                                    }}
                                />
                                <div className="flex-grow">
                                    <h2 className="text-xl font-semibold">{item.product.name}</h2>
                                    <p className="text-lg font-medium text-blue-400">
                                        {item.product.price.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                                    </p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Button
                                        icon="pi pi-minus"
                                        className="p-button-sm p-button-secondary"
                                        onClick={() => updateQuantity(item.product.id!, item.quantity - 1)}
                                        disabled={item.quantity <= 1}
                                    />
                                    <InputNumber
                                        value={item.quantity}
                                        onValueChange={(e) => updateQuantity(item.product.id!, e.value || 0)}
                                        showButtons={false} // Remover botões padrão, usaremos os customizados
                                        min={1}
                                        max={99} // Limite de quantidade
                                        className="w-16 text-center"
                                        inputClassName="text-white bg-gray-700 text-center"
                                    />
                                    <Button
                                        icon="pi pi-plus"
                                        className="p-button-sm p-button-secondary"
                                        onClick={() => updateQuantity(item.product.id!, item.quantity + 1)}
                                    />
                                </div>
                                <Button
                                    icon="pi pi-trash"
                                    className="p-button-sm p-button-danger p-button-text"
                                    onClick={() => confirmRemoveItem(item.product.id!, item.product.name)}
                                    tooltip="Remover item"
                                />
                            </Card>
                        ))}
                        <div className="flex justify-end mt-4">
                            <Button
                                label="Limpar Carrinho"
                                icon="pi pi-times"
                                className="p-button-danger p-button-outlined"
                                onClick={confirmClearCart}
                            />
                        </div>
                    </div>

                    {/* Coluna Lateral: Resumo do Carrinho */}
                    <div className="md:col-span-1">
                        <Card title="Resumo do Pedido" className="bg-gray-800 border-gray-700">
                            <div className="flex justify-between text-lg mb-2">
                                <span>Total de Itens:</span>
                                <span>{getTotalItems()}</span>
                            </div>
                            <div className="flex justify-between text-2xl font-bold border-t pt-4 mt-4 border-gray-700">
                                <span>Total:</span>
                                <span>{getTotalPrice().toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</span>
                            </div>
                            <Button
                                label="Finalizar Compra"
                                icon="pi pi-check-circle"
                                className="p-button-success p-button-lg w-full mt-6"
                                onClick={handleCheckout}
                            />
                        </Card>
                    </div>
                </div>
            )}
        </div>
    );
};