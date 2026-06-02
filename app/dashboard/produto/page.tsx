'use client';


import NavBar from '@/app/components/navbar';
import ProdutoForm from '@/app/components/produtoForm';
import '../../formStyle.css';


export default function ProdutosPage() {
    return(
        <>
        <NavBar />
        <ProdutoForm/>
        </>
    );
}