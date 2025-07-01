// src/services/order-service.ts
import type { IResponse, IOrder } from "@/commons/types";
import { api } from "@/lib/axios";

const orderURL = "/orders";

const createOrder = async (orderData: IOrder): Promise<IResponse> => {
  let response = {} as IResponse;
  try {
    const orderToSend = { ...orderData, id: undefined };

    const data = await api.post(orderURL, orderToSend);
    response = {
      status: 201,
      success: true,
      message: "Pedido realizado com sucesso!",
      data: data.data,
    };
  } catch (err: any) {
    response = {
      status: err.response?.status,
      success: false,
      message:
        err.response?.data?.message ||
        "Falha ao criar o pedido. Verifique os dados.",
      data: err.response?.data,
    };
  }
  return response;
};

const getMyOrders = async (): Promise<IResponse> => {
  let response = {} as IResponse;
  try {
    const data = await api.get(`${orderURL}/my`);
    response = {
      status: 200,
      success: true,
      message: "Histórico de pedidos carregado com sucesso!",
      data: data.data,
    };
  } catch (err: any) {
    response = {
      status: err.response?.status,
      success: false,
      message:
        err.response?.data?.message ||
        "Falha ao carregar o histórico de pedidos.",
      data: err.response?.data,
    };
  }
  return response;
};

const OrderService = {
  createOrder,
  getMyOrders,
};

export default OrderService;
