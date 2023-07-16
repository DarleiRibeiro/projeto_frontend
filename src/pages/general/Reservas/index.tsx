import React, {useEffect, useState} from "react";
import {Rating} from "primereact/rating";
import {Tag} from "primereact/tag";
import {Button} from "primereact/button";
import {DataViewLayoutOptions} from "primereact/dataview";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import {ProductService} from "@pages/general/Catalogo/service/ProductService.tsx";

const style1 = "flex flex-column xl:flex-row xl:align-items-start p-4 gap-4"
const style2 = "w-9 sm:w-16rem xl:w-10rem shadow-2 block xl:block mx-auto border-round"
const style3 = "flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4"
const style4 = "flex flex-column align-items-center sm:align-items-start gap-3";
const style5 = "flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2"

interface produtType {
    id: number
    code: string
    name: string
    description: string
    image: string
    price: number
    category: string
    quantity: number
    inventoryStatus: string
    rating: number
}

const arrayStatic: produtType[] = [
    {
        id: 1,
        code: '324234234',
        name: '324234234',
        description: '324234234',
        image: '324234234',
        price: 100,
        category: '324234234',
        quantity: 12,
        inventoryStatus: '324234234',
        rating: 1
    }
]

export function Reservas() {

    const [products, setProducts] = useState<produtType[]>(arrayStatic);

    useEffect(() => {
        // @ts-ignore
        ProductService.getProductsMini().then((data) => setProducts(data));
    }, []);


    const formatCurrency = (value: any) => {
        return value.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
    };

    const imageBodyTemplate = (product: any) => {
        return <img src={`https://primefaces.org/cdn/primereact/images/product/${product.image}`} alt={product.image} className="w-6rem shadow-2 border-round" />;
    };

    const priceBodyTemplate = (product: any) => {
        return formatCurrency(product.price);
    };

    const ratingBodyTemplate = (product: any) => {
        return <Rating value={product.rating} readOnly cancel={false} />;
    };

    const statusBodyTemplate = (product: any) => {
        return <Tag value={product.inventoryStatus} severity={getSeverity(product)}></Tag>;
    };

    const getSeverity = (product: any) => {
        switch (product.inventoryStatus) {
            case 'INSTOCK':
                return 'success';

            case 'LOWSTOCK':
                return 'warning';

            case 'OUTOFSTOCK':
                return 'danger';

            default:
                return null;
        }
    };

    const header = (
        <div className="flex flex-wrap align-items-center justify-content-between gap-2">
            <span className="text-xl text-900 font-bold">Products</span>
            <Button icon="pi pi-refresh" rounded raised />
        </div>
    );
    const footer = `In total there are ${products ? products.length : 0} products.`;

    return (
        <div className="card">
            <DataTable value={products} header={header} footer={footer} tableStyle={{ minWidth: '60rem' }}>
                <Column header="Status" body={statusBodyTemplate}></Column>
                <Column field="name" header="Nome"></Column>
                <Column header="Foto" body={imageBodyTemplate}></Column>
                <Column field="price" header="Preço" body={priceBodyTemplate}></Column>
                <Column field="category" header="Categoria"></Column>
                <Column field="rating" header="Reviews" body={ratingBodyTemplate}></Column>

            </DataTable>
        </div>
    );
}

