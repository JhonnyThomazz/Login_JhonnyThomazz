'use client';

import { useState } from 'react';
import api from '../lib/api';
import { Estoque } from '../types/Estoque';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';

export function useStock(){
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const [localizacao, setLocalizacao] = useState('');
    const [quantidade, setQuantidade] = useState('');
    const [idProduto, setIdProduto] = useState('');
    const [editandoId, setEditandoId] = useState<number | null>(null);
    const [nome, setNome] = useState('');

    const buscarEstoquePorId = async (id: number) => {
        setLoading(true);
        try {
            const resposta = await api.get(`/estoque/${id}`);
            if (resposta.data) prepararEdicao(resposta.data);
        } catch (error) {
            alert("Erro ao buscar os dados do estoque.");
        } finally {
            setLoading(false);
        }
    };

    const salvar = async (e: React.FormEvent) => {
        e.preventDefault();
        const dados = {
            localizacao,
            quantidade: Number(quantidade),
            produtos: { 
                id: Number(idProduto) 
            } // Vinculando ao produto via Jackson WRITE_ONLY
        };

        try {
            if (editandoId) {
                await api.put(`/estoque/${editandoId}`, dados);
            } else {
                await api.post('/estoque/', dados);
            }
            if(Number(quantidade) === 0){
                await Swal.fire({
                    icon: "warning",
                    title: "Epa!",
                    text: "Há produtos sem estoque!",
                    showConfirmButton: false,
                    timer: 2000
                })
            }
            else if(Number(quantidade) <= 10 ){
                 await Swal.fire({
                    icon: "warning",
                    title: "Epa!",
                    text: "Há produtos com estoque baixo!",
                    showConfirmButton: false,
                    timer: 2000
                })
            } 
            else{
            limparFormulario();
            Swal.fire({
                title: "Tudo certo!",
                text: "Produto adicionado ao estoque.",
                icon: "success",
                timer: 1500
            })
            }

            
            router.push('/dashboard');
        } catch (error) {
            Swal.fire({
                title: "Oops...!",
                text: "Erro ao adicionar o produto ao estoque!",
                icon: "error",
                showConfirmButton: true,
                confirmButtonColor: "rgb(212, 11, 11)"
            });
        }
    };

    const prepararEdicao = (e: Estoque) => {
        setEditandoId(e.id!);
        setLocalizacao(e.localizacao);
        setQuantidade(e.quantidade.toString());
        // Trata a leitura do ID dependendo do retorno da API
        const prodId = e.produtos ? e.produtos.id : (e as any).id_produto;
        setIdProduto(prodId ? prodId.toString() : '');
    };

    const limparFormulario = () => {
        setEditandoId(null);
        setLocalizacao('');
        setQuantidade('');
        setIdProduto('');
        router.push('/dashboard')
    };

    return {
        loading, salvar, buscarEstoquePorId,
        localizacao, setLocalizacao, quantidade, setQuantidade, idProduto, setIdProduto,
        editandoId, limparFormulario, 
    };
}