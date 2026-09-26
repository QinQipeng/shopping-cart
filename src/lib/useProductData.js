import { ALL_PRODUCTS } from "./data.js"
import { useState, useEffect } from "react"

export default function useProductData() {
    const [products, setProducts] = useState([]);
    useEffect(()=> {
        const prodFetch = async() => {
            const prodData = await Promise.resolve(ALL_PRODUCTS);
            setProducts(prodData);
        }
        
        prodFetch();
    }, [])

    return products;
}