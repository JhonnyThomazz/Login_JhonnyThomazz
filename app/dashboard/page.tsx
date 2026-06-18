'use client';
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie"; // Importamos a biblioteca
import { useProd } from "../hooks/useProd";
import NavBar from "../components/navbar";
import "../dashboard/dashboard.css"
import { Produto } from "../types/produtos";
import Swal from "sweetalert2";

export default function Dashboard() {
    const router = useRouter();
    const [name, setName] = useState("");
    const {
            produtos, loading, listarProdutos, salvar, excluir, prepararEdicao,
            nome, setNome, descricao, setDescricao, preco, setPreco, url, setUrl,
            editandoId, limparFormulario, DetailsProd
        } = useProd();

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

    //Função para logout depois de inatividade
    const loginTimeout = () =>{
        Cookies.remove("logged");
        Cookies.remove("username");
        router.push("/");
        router.refresh();
        Swal.fire({
            icon: "info",
            title: 'Aviso!',
            text: 'Você ficou muito tempo inativo...Faça login novamente!',
            showConfirmButton: false,
            timer: 2500
        })
    }

    useEffect(() => {
        let timerLogout: NodeJS.Timeout;
        const timeTimeout = 600;
        
        const ResetTimer = () =>{
            if (timerLogout) clearTimeout(timerLogout)

            timerLogout = setTimeout(() => {
            loginTimeout();
        }, timeTimeout * 1000); 
        };

        ResetTimer();

        window.addEventListener("mousemove", ResetTimer);
        window.addEventListener("click", ResetTimer);
        window.addEventListener("keydown", ResetTimer);

        return() => {
            if (timerLogout) clearTimeout(timerLogout);

            window.removeEventListener("mousemove", ResetTimer);
            window.removeEventListener("click", ResetTimer);
            window.removeEventListener("keydown", ResetTimer);
        };
    }, [router]);
    
    return (
        <div>
            <NavBar />  
            <div className="info-container" style={{ width: '100%', padding: '60px', fontWeight: 'bolder'}}>
                <h2 style={{fontSize: '1.5rem'}}>Produtos Cadastrados</h2>
                {loading ? <p>Carregando...</p> : (
                    <div style={{ width: '100%', marginTop: '20px', borderCollapse: 'collapse', fontWeight: 'bold'}}>
                            <div style={{ borderBottom: '2px solid #eee', display: 'grid', gridTemplateColumns: "1fr 2fr 1fr 1fr 1fr"}}>
                                <div style={{padding: '10px', textAlign: 'left'}}>Produto</div>
                                <div style={{padding: '10px', textAlign: 'left'}}>Nome</div>
                                <div style={{padding: '10px', textAlign: 'left'}}>Preço</div>
                                <div style={{padding: '10px', textAlign: 'center'}}>Estoque</div>   
                                <div style={{padding: '10px', textAlign: 'center'}}>Ações</div>
                            </div>
                        <div>
                            {produtos.map(p => (
                                <div key={p.id} style={{ borderBottom: '1px solid #eee', display:'grid', gridTemplateColumns: "1fr 2fr 1fr 1fr 1fr", alignItems: 'center'}}>
                                    <div style={{padding: '10px', textAlign: 'left'}}>
                                        <img onClick ={() => DetailsProd(p)} src={(p.url)}
                                         style={{width: "90px", height: "90px", borderRadius: "10px"}}/>
                                    </div>
                                    <div style={{ padding: '10px', textAlign: 'left' }}>{p.nome}</div>
                                    <div style={{ padding: '10px', textAlign:'left' }}>R$ {(Number(p.preco) || 0).toFixed(2)}</div>
                                    <div style={{ padding: '10px', textAlign: 'left' }}>
                                    <div style={{ padding: '10px', textAlign: 'center', 
                                        color: 
                                        !p.estoque||p.estoque.quantidade === 0 
                                        ? "#e90000" 
                                        : p.estoque.quantidade <= 10 
                                        ? "#f3d52b" 
                                        : "#10b116" 
                                        }}
                                    >
                                        {!p.estoque || p.estoque.quantidade === 0 
                                        ? "Sem estoque!" 
                                        : `${p.estoque.quantidade} unid.`}
                                    </div>    
                                    </div>
                                    <div style={{ padding: '10px', textAlign: 'center' }}>
                                        <button onClick={() => {
                                            if (p.estoque){
                                                router.push(`/dashboard/estoque/${p.estoque.id}`);
                                            }
                                            else{
                                                router.push(`/dashboard/estoque`);
                                            }
                                        }}
                                        style={{ marginRight: '10px', color: '#28a745', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 'bold' 
                                        }}> 
                                            Alterar Estoque
                                        </button>
                                        <button onClick={() => router.push(`/dashboard/produto/${p.id}`)} 
                                                style={{ marginRight: '10px', color: '#007bff', background: 'none', border: 'none', cursor: 'pointer'}}>
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
