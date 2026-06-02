'use client';

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import './navbar.css'
import Swal from "sweetalert2";

export default function Navbar(){
    const router = useRouter();
    const [nome, setNome] = useState("");


    useEffect(() => {
        const username = Cookies.get("username");
       
        if (username) {
            setNome(username);
        } else {
            // Caso o cookie suma por algum motivo, volta para o login
            router.push("/");
        }
    }, [router])


    function logout() {

        Swal.fire({
            title: "Sair da conta?",
            text: "Tem certeza que deseja se desconectar?",
            icon: "question",
            showConfirmButton: true,
            showCancelButton: true,
            confirmButtonColor: "rgb(11, 212, 34)",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sair da conta",
            cancelButtonText: "Cancelar"
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: "Você saiu da sua conta",
                    icon: "success",
                    showConfirmButton: false,
                    timer: 1000
                });
                Cookies.remove("logged");
                Cookies.remove("username");
                router.push("/");
                router.refresh();
            }
   
        });
    }


    return(
    <nav>
        <div className="image">
            <img src ="/v1Ultrakill.jpg"/>
        </div>

        <div className="details">
            <a href="/dashboard">Dashboard</a>
            <a href="/dashboard/produto">Produtos</a>
            <a href="/dashboard/estoque">Estoque</a>
            <div className="button" onClick={logout}>
                <button> Sair do Sistema </button>
            </div>
        </div>
    </nav>
    );
}