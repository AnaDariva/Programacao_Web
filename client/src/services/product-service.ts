// src/services/product-service.ts

import type { IProduct, IResponse } from "@/commons/types";
import { api } from "@/lib/axios";

const productURL = "/products";

/**
 * Função para salvar um produto
 * @param category - Dados do produto que será salvo
 * @returns - Retorna uma Promise com a resposta da API
 **/
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

/**
 * Função para buscar todos os produtos
 * @returns - Retorna uma Promise com a resposta da API
 * com a lista de produtos
 **/
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

/**
 * Função para remover um produto
 * @param id - Recebe o id do produto que será removido
 * @returns - Retorna uma Promise com a resposta da API
 */
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

/**
 * Função para buscar um produto pelo id
 * @param id - Recebe o id do produto que será buscado
 * @returns - Retorna uma Promise com a resposta da API
 */
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

/**
 * Função para buscar produtos por ID de categoria
 * @param categoryId - ID da categoria para filtrar
 * @returns - Retorna uma Promise com a resposta da API
 * com a lista de produtos filtrados
 **/
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

// Objeto que exporta TODAS as funções
const ProductService = {
    save,
    findAll, // <-- GARANTA QUE ESTÁ AQUI
    remove,
    findById,
    findByCategoryId, // <-- E QUE ESTÁ AQUI
};

export default ProductService;