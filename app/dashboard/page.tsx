'use client';
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie"; // Importamos a biblioteca
import { useProdutos } from "../hooks/useProd";
import NavBar from "../components/navbar";
import "../dashboard/dashboard.css"
import { Produto } from "../types/produtos";

export default function Dashboard() {
    const router = useRouter();
    const [name, setName] = useState("");
    const {
            produtos, loading, listarProdutos, salvar, excluir, prepararEdicao,
            nome, setNome, descricao, setDescricao, preco, setPreco, url, setUrl,
            editandoId, limparFormulario, DetailsProd
        } = useProdutos();

        useEffect(() => {
            listarProdutos();
        }, [listarProdutos]);

    useEffect(() => {
        const userName = Cookies.get("userName");
        
        if (userName) {
            setNome(userName);
        } else {
            // Caso o cookie suma por algum motivo, volta para o login
            router.push("/");
        }
    }, [router]);

    return (
        <div>
            <NavBar />  
            <div className="info-container" style={{ width: '100%', padding: '60px', fontWeight: 'bolder'}}>
                <h2 style={{fontSize: '1.5rem'}}>Produtos Cadastrados</h2>
                {loading ? <p>Carregando...</p> : (
                    <div style={{ width: '100%', marginTop: '20px', borderCollapse: 'collapse', fontWeight: 'bold'}}>
                            <div style={{ borderBottom: '2px solid #eee', display: 'grid', gridTemplateColumns: "1fr 3fr 1fr 1fr"}}>
                                <div style={{padding: '10px', textAlign: 'left'}}>Produto</div>
                                <div style={{padding: '10px', textAlign: 'left'}}>Nome</div>
                                <div style={{padding: '10px', textAlign: 'left'}}>Preço</div>
                                <div style={{padding: '10px', textAlign: 'center'}}>Ações</div>
                            </div>
                        <div>
                            {produtos.map(p => (
                                <div key={p.id} style={{ borderBottom: '1px solid #eee', display:'grid', gridTemplateColumns: "1fr 3fr 1fr 1fr", alignItems: 'center'}}>
                                    <div style={{padding: '10px', textAlign: 'left'}}>
                                        <img onClick ={() => DetailsProd(p)} src={(p.url)}
                                         style={{width: "90px", height: "90px", borderRadius: "10px"}}/>
                                    </div>
                                    <div style={{ padding: '10px', textAlign: 'left' }}>{p.nome}</div>
                                    <div style={{ padding: '10px', textAlign:'left' }}>R$ {(Number(p.preco) || 0).toFixed(2)}</div>
                                    <div style={{ padding: '10px', textAlign: 'center' }}>
                                        <button onClick={() => router.push(`/dashboard/produto/${p.id}`)} 
                                                style={{ marginRight: '10px', color: '#007bff', background: 'none', border: 'none', cursor: 'pointer' }}>
                                            Editar
                                        </button>
                                        <button onClick={() => excluir(p.id!)} 
                                                style={{ color: 'red', background: 'none', border: 'none', cursor: 'pointer' }}>
                                            Excluir
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
