import React, { useEffect, useState, useRef } from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { ProgressSpinner } from 'primereact/progressspinner';
import { useAuth } from '@/context/hooks/use-auth';
import { useNavigate } from 'react-router-dom';
import OrderService from '@/services/order-service';
import type { IOrder } from '@/commons/types';

export const OrderHistoryPage: React.FC = () => {
    const { authenticated, authenticatedUser } = useAuth();
    const navigate = useNavigate();
    const toast = useRef<Toast>(null);
    const [orders, setOrders] = useState<IOrder[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!authenticated) {
            navigate('/login?redirect=' + encodeURIComponent(window.location.pathname));
            return;
        }

        const fetchOrders = async () => {
            setLoading(true);
            try {
                const response = await OrderService.getMyOrders();
                if (response.status === 200 && response.data) {
                    setOrders(Array.isArray(response.data) ? response.data as IOrder[] : []);
                } else {
                    toast.current?.show({
                        severity: 'error',
                        summary: 'Erro',
                        detail: response.message || 'Não foi possível carregar seu histórico de pedidos.',
                        life: 3000
                    });
                    setOrders([]);
                }
            } catch (error) {
                console.error("Erro ao carregar histórico de pedidos:", error);
                toast.current?.show({
                    severity: 'error',
                    summary: 'Erro de Conexão',
                    detail: 'Verifique sua conexão ou se o servidor de pedidos está rodando.',
                    life: 3000
                });
                setOrders([]);
            } finally {
                setLoading(false);
            }
        };

        if (authenticated) {
            fetchOrders();
        }
    }, [authenticated, authenticatedUser, navigate]);

    if (loading) {
        return (
            <div style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "80vh",
                background: "var(--nba-gray)"
            }}>
                <ProgressSpinner style={{ width: 46, height: 46 }} />
                <p style={{ marginLeft: 18, color: "#245" }}>Carregando histórico de pedidos...</p>
            </div>
        );
    }

    return (
        <div style={{
            maxWidth: 1050,
            margin: "0 auto",
            padding: "48px 8px 54px 8px",
            minHeight: "80vh"
        }}>
            <Toast ref={toast} />

            <h1 style={{
                fontSize: "2.1rem",
                fontWeight: 900,
                textAlign: "center",
                color: "var(--nba-blue)",
                marginBottom: 22,
                letterSpacing: "-1.2px"
            }}>
                Meu Histórico de Pedidos
            </h1>

            {orders.length === 0 ? (
                <div style={{ textAlign: "center", fontSize: "1.17rem", marginTop: 50 }}>
                    <p style={{ marginBottom: 24 }}>Você ainda não realizou nenhum pedido.</p>
                    <Button
                        label="Voltar para a Loja"
                        icon="pi pi-shopping-bag"
                        className="p-button-lg"
                        style={{
                            background: "var(--nba-blue)",
                            fontWeight: 700,
                            fontSize: "1.05rem",
                            border: "none"
                        }}
                        onClick={() => navigate('/')}
                    />
                </div>
            ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: 26 }}>
                    {orders.map(order => (
                        <Card
                            key={order.id}
                            style={{
                                background: "#fff",
                                border: "none",
                                borderRadius: "20px",
                                boxShadow: "0 4px 18px #0002",
                                padding: "0 0 8px 0"
                            }}
                        >
                            <div style={{
                                display: "flex",
                                flexWrap: "wrap",
                                justifyContent: "space-between",
                                alignItems: "center",
                                borderBottom: "1.5px solid #e9e9e9",
                                paddingBottom: 12,
                                marginBottom: 6
                            }}>
                                <h2 style={{
                                    fontSize: "1.15rem",
                                    fontWeight: 700,
                                    color: "var(--nba-blue)",
                                    marginBottom: 0
                                }}>Pedido #{order.id}</h2>
                                <span style={{
                                    display: "inline-block",
                                    fontWeight: 800,
                                    fontSize: ".97rem",
                                    letterSpacing: ".5px",
                                    color: "#fff",
                                    background:
                                        order.status === 'COMPLETED'
                                            ? "#36ad36"
                                            : order.status === 'SHIPPED'
                                            ? "#2684d7"
                                            : "#eab308",
                                    padding: "6px 16px",
                                    borderRadius: "22px"
                                }}>
                                    {order.status === 'COMPLETED' ? 'Concluído' :
                                    order.status === 'SHIPPED' ? 'Enviado' :
                                    order.status === 'PENDING' ? 'Pendente' : order.status}
                                </span>
                            </div>
                            <div style={{ marginBottom: 12, color: "#333", fontSize: "1.04rem" }}>
                                <div style={{ marginBottom: 5 }}>
                                    <b>Data:</b> {new Date(order.orderDate).toLocaleDateString('pt-BR')}
                                </div>
                                <div style={{ marginBottom: 5 }}>
                                    <b>Total:</b> <span style={{ color: "var(--nba-red)", fontWeight: 700 }}>
                                        {order.totalAmount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                                    </span>
                                </div>
                                <div style={{ marginBottom: 5 }}>
                                    <b>Endereço de Entrega:</b>{" "}
                                    <span style={{ color: "#555" }}>
                                    {
                                        order.shippingAddress ?
                                        `${order.shippingAddress.street || ''}, ${order.shippingAddress.number || ''} - ${order.shippingAddress.neighborhood || ''}, ${order.shippingAddress.city || ''} - ${order.shippingAddress.state || ''} ${order.shippingAddress.zipCode || ''}` :
                                        'Não informado'
                                    }
                                    </span>
                                </div>
                                <div style={{ marginBottom: 0 }}>
                                    <b>Método de Pagamento:</b>{" "}
                                    <span style={{ color: "#444" }}>
                                    {order.paymentMethod ? order.paymentMethod.details || 'Não informado' : 'Não informado'}
                                    </span>
                                </div>
                            </div>
                            <h3 style={{
                                fontSize: "1.06rem",
                                color: "var(--nba-blue)",
                                fontWeight: 700,
                                marginBottom: 6,
                                borderTop: "1px solid #ececec",
                                paddingTop: 12
                            }}>Itens do Pedido:</h3>
                            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                                {order.items.map(item => (
                                    <div key={item.productId}
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: 14,
                                            padding: "7px 0",
                                            borderBottom: "1px solid #f3f3f3",
                                            minHeight: 56
                                        }}>
                                        <img
                                            src={item.productImageUrl || "https://via.placeholder.com/50x50?text=Item"}
                                            alt={item.productName}
                                            style={{
                                                width: 52,
                                                height: 52,
                                                objectFit: "cover",
                                                borderRadius: 10,
                                                boxShadow: "0 1px 7px #0001"
                                            }}
                                        />
                                        <div style={{ flex: 1 }}>
                                            <div style={{
                                                fontWeight: 600,
                                                color: "#223",
                                                fontSize: "1.01rem"
                                            }}>{item.productName}</div>
                                            <div style={{ fontSize: ".97rem", color: "#888" }}>
                                                {item.quantity} x {item.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                                            </div>
                                        </div>
                                        <span style={{
                                            fontWeight: 700,
                                            color: "var(--nba-blue)",
                                            fontSize: "1.06rem"
                                        }}>
                                            {(item.quantity * item.price).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
};
