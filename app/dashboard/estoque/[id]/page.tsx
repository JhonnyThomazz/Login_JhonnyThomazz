'use client';

import { useParams } from 'next/navigation';
import NavBar from '@/app/components/navbar';
import FormEstoque from '@/app/components/formEstoque';
import '@/app/formStyle.css'

export default function EditarEstoquePage() {
    const params = useParams();
    const id = Number(params.id);

    return (
        <>
            <NavBar />
            <FormEstoque estoqueId={id} />
        </>
    );
}