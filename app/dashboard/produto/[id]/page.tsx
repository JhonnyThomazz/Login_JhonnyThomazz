'use client';

import { useParams } from 'next/navigation';
import NavBar from '@/app/components/navbar';
import ProdutoForm from '@/app/components/produtoForm';
import '@/app/formStyle.css'

export default function EditarProdutoPage() {
    const params = useParams();
    const id = Number(params.id);

    return (
        <>
            <NavBar />
            <ProdutoForm produtoId={id} />
        </>
    );
}