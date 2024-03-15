import React, { useEffect, useState } from 'react';
import './products.css';
import { Link } from 'react-router-dom';
function ProductsDisplay() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        // Fetch products from the backend
        const fetchProducts = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/products');
                if (!response.ok) {
                    throw new Error('Failed to fetch products');
                }
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };
        fetchProducts();
    }, []);

    return (
        <div className="product-container">
            {products.map(product => (
                <Link to={`/product/${product.id}`}>
                <div key={product.id} className="product">
                    <h2>{product.name}</h2>
                    {product.images.map((image, index) => (
                        <img key={index} src={image} alt={product.name} className="product-image" />
                    ))}
                    <p><strong>$ </strong>{product.price}</p>
                    {/* Display other product details here */}
                    
                </div>
                </Link>
                
            ))}
        </div>
    );
}

export default ProductsDisplay;
