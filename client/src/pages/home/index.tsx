import { useEffect, useRef, useState } from "react";
import { Toast } from "primereact/toast";
import { Dropdown } from "primereact/dropdown";
import type { ICategory, IProduct } from "@/commons/types";
import ProductService from "@/services/product-service";
import CategoryService from "@/services/category-service";
import { ProductCard } from "@/components/product-card";

export const HomePage = () => {
    const [products, setProducts] = useState<IProduct[]>([]);
    const [categories, setCategories] = useState<ICategory[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<ICategory | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const toast = useRef<Toast>(null);

    // Função para carregar a lista de categorias
    const loadCategories = async () => {
        try {
            const response = await CategoryService.findAll();
            if (response.status === 200 && response.data) {
                // Adiciona uma opção "Todas as Categorias" no início da lista
                setCategories([{ id: null, name: "Todas as Categorias" }, ...(Array.isArray(response.data) ? response.data : [])]);
            } else {
                toast.current?.show({
                    severity: "error",
                    summary: "Erro",
                    detail: response.message || "Não foi possível carregar as categorias.",
                    life: 3000,
                });
            }
        } catch (error) {
            console.error("Erro ao carregar categorias:", error);
            toast.current?.show({
                severity: "error",
                summary: "Erro de Conexão",
                detail: "Verifique sua conexão ou se o servidor de categorias está rodando.",
                life: 3000,
            });
        }
    };

    // Função para carregar a lista de produtos (agora chamando o backend para filtrar)
    const loadProducts = async (categoryId: number | null = null) => {
        setLoading(true);
        try {
            let response;
            if (categoryId) {
                // CHAMA O NOVO ENDPOINT DE FILTRO POR CATEGORIA DO BACKEND
                response = await ProductService.findByCategoryId(categoryId); // Esta função ainda não existe no service
            } else {
                // Se nenhuma categoria for selecionada (ou "Todas as Categorias"), busca todos
                response = await ProductService.findAll();
            }

            if (response.status === 200 && response.data) {
                setProducts(Array.isArray(response.data) ? response.data : []);
            } else {
                toast.current?.show({
                    severity: "error",
                    summary: "Erro",
                    detail: response.message || "Não foi possível carregar a lista de produtos.",
                    life: 3000,
                });
            }
        } catch (error: any) {
            console.error("Erro ao carregar produtos:", error);
            toast.current?.show({
                severity: "error",
                summary: "Erro de Conexão",
                detail: "Verifique sua conexão ou se o servidor de produtos está rodando.",
                life: 3000,
            });
        } finally {
            setLoading(false);
        }
    };

    // Efeitos para carregar categorias e produtos inicialmente
    useEffect(() => {
        loadCategories();
        // A chamada de loadProducts inicial será feita pelo segundo useEffect quando selectedCategory for null
    }, []);

    // Efeito para recarregar produtos quando a categoria selecionada muda
    useEffect(() => {
        // Quando selectedCategory for null (ou 'Todas as Categorias'), categoryId será null, e findAll será chamado
        // Caso contrário, findByCategoryId será chamado
        loadProducts(selectedCategory?.id || null);
    }, [selectedCategory]); // Depende de selectedCategory

    return (
        <div className="container mx-auto px-4 py-8">
            <Toast ref={toast} />
            <h1 className="text-3xl font-bold text-center mb-8 text-white">Nossos Produtos NBA</h1>

            {/* Dropdown de Filtragem por Categoria */}
            <div className="mb-8 flex justify-center">
                <Dropdown
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.value)}
                    options={categories}
                    optionLabel="name"
                    placeholder="Filtrar por Categoria"
                    className="w-full md:w-1/3 p-inputtext-lg"
                />
            </div>

            {loading ? (
                <p className="text-center text-lg text-white">Carregando produtos...</p>
            ) : products.length === 0 && selectedCategory ? ( // Mensagem mais específica para filtro
                <p className="text-center text-lg text-white">Nenhum produto encontrado para a categoria selecionada.</p>
            ) : products.length === 0 ? ( // Mensagem genérica se não houver produtos e nenhum filtro
                <p className="text-center text-lg text-white">Nenhum produto disponível no momento.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            )}
        </div>
    );
};