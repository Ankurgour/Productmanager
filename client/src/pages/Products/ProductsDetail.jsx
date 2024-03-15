import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function ProductDetail() {
    const { id } = useParams();
    console.log(id);
    const [product, setProduct] = useState(null);
    const [isEditable, setIsEditable] = useState(false); 

    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/products/${id}`);
                if (!response.ok) {
                    throw new Error('Product details fetching failed');
                }
                const data = await response.json();
                console.log("data",data);
                setProduct(data);
            } catch (error) {
                console.error('Error:', error);
            }
        };
        fetchProductDetails();
    }, [id]);

    if (!product) return <div>Loading...</div>; 

    return (
        <div>
            <h2>{product.name}</h2>
            {product.images.map((image, index) => (
                <img key={index} src={image} alt={product.name} style={{ maxWidth: '100px' }} />
            ))}
            <p><strong>Price: </strong>${product.price}</p>
        </div>
    );
}

export default ProductDetail;
