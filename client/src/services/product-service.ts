// src/services/product-service.ts

import type { IProduct, IResponse } from "@/commons/types";
import { api } from "@/lib/axios";

const productURL = "/products";

const save = async (category: IProduct): Promise<IResponse> => {
  let response = {} as IResponse;
  try {
    const data = await api.post(productURL, category);
    response = {
      status: 200,
      success: true,
      message: "Produto salvo com sucesso!",
      data: data.data,
    };
  } catch (err: any) {
    response = {
      status: err.response.status,
      success: false,
      message: "Falha ao salvar produto",
      data: err.response.data,
    };
  }
  return response;
};

const findAll = async (): Promise<IResponse> => {
  let response = {} as IResponse;
  try {
    const data = await api.get(productURL);
    response = {
      status: 200,
      success: true,
      message: "Lista de produtos carregada com sucesso!",
      data: data.data,
    };
  } catch (err: any) {
    response = {
      status: err.response.status,
      success: false,
      message: "Falha ao carregar a lista de produtos",
      data: err.response.data,
    };
  }
  return response;
};

const remove = async (id: number): Promise<IResponse> => {
  let response = {} as IResponse;
  try {
    const data = await api.delete(`${productURL}/${id}`);
    response = {
      status: 200,
      success: true,
      message: "Produto removido com sucesso!",
      data: data.data,
    };
  } catch (err: any) {
    response = {
      status: err.response.status,
      success: false,
      message: "Falha ao remover o produto",
      data: err.response.data,
    };
  }
  return response;
};

const findById = async (id: number): Promise<IResponse> => {
  let response = {} as IResponse;
  try {
    const data = await api.get(`${productURL}/${id}`);
    response = {
      status: 200,
      success: true,
      message: "Produto carregado com sucesso!",
      data: data.data,
    };
  } catch (err: any) {
    response = {
      status: err.response.status,
      success: false,
      message: "Falha ao carregar o produto",
      data: err.response.data,
    };
  }
  return response;
};

const findByCategoryId = async (categoryId: number): Promise<IResponse> => {
  let response = {} as IResponse;
  try {
    const data = await api.get(`${productURL}/category/${categoryId}`);
    response = {
      status: 200,
      success: true,
      message: "Produtos filtrados por categoria carregados com sucesso!",
      data: data.data,
    };
  } catch (err: any) {
    response = {
      status: err.response.status,
      success: false,
      message: "Falha ao carregar produtos por categoria",
      data: err.response.data,
    };
  }
  return response;
};

const ProductService = {
  save,
  findAll,
  remove,
  findById,
  findByCategoryId,
};

export default ProductService;
