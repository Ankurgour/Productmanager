import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ReactCrop from 'react-image-crop';
import './productDetails.css';
import 'react-image-crop/dist/ReactCrop.css';

function ProductDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState({ name: '', price: '', images: [], description: '', department: '' });
    const [crop, setCrop] = useState({ aspect: 16 / 9 });
    const [croppedImageUrl, setCroppedImageUrl] = useState(null);

    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/products/${id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch product details');
                }
                const data = await response.json();
                setProduct(data);
            } catch (error) {
                console.error('Error:', error);
            }
        };
        fetchProductDetails();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct((prevProduct) => ({ ...prevProduct, [name]: value }));
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProduct((prevProduct) => ({
                    ...prevProduct,
                    images: [reader.result]
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (!croppedImageUrl) {
            console.log("No image to submit");
            return;
        }
    
        try {
      
            const response = await fetch(croppedImageUrl);
            const blob = await response.blob();
            const file = new File([blob], "filename.jpg", { type: "image/jpeg" });
            

            const formData = new FormData();
            formData.append("image", file);
    
            // formData.append("name", product.name);
            // formData.append("price", product.price);
            // formData.append("description", product.description);
            // formData.append("department", product.department);
    
            // Replace URL with your backend endpoint
            const uploadResponse = await fetch('http://localhost:5000/api/uploadImage', {
                method: 'POST',
                body: formData, 
            });
    
            if (!uploadResponse.ok) {
                throw new Error('Failed to upload image');
            }
    
            const uploadResult = await uploadResponse.json();
            console.log("Upload successful", uploadResult);
            // Redirect or perform further actions here
        } catch (error) {
            console.error('Error submitting product:', error);
        }
    };
    

    return (
        <div className="form-container">

        <form onSubmit={handleSubmit}>
            <label>Name:
                <input type="text" name="name" value={product.name} onChange={handleChange} />
            </label>
            <label>Price:
                <input type="number" name="price" value={product.price} onChange={handleChange} />
            </label>
            <label>Description:
                <textarea name="description" value={product.description} onChange={handleChange} />
            </label>
            <label>Department:
      
                <input type="text" name='department' value={product.description} onChange={handleChange} />
            </label>
            <input type="file" accept="image/*" onChange={handleImageUpload} />
            {product.images.map((image, index) => (
                <img key={index} src={image} alt={`product-${index}`} style={{ maxWidth: '150px' }} />
            ))}
            <button type="submit">Submit for Approval</button>
        </form>
        </div>
    );
}

export default ProductDetail;
