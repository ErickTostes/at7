import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import './ProductDetails.css';
import DeleteModal from './DeleteModal';

const ProductDetails = () => {
  const { _id } = useParams();
  const [product, setProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetch(`https://api-infnet-produtos-privado.vercel.app/produtos/${_id}`, {
      method: 'GET',
      headers: {
        Authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHBpcmVzSW4iOiIzNjVkIiwiaWF0IjoxNzI2ODY0NTQ4fQ.oQ6vlVpQEHwsq82736fY9I_OlXXBDyWYQoatf3rr6uk",
      }
    })
      .then((response) => response.json())
      .then((data) => setProduct(data));
  }, [_id]);

  const handleDelete = () => {
    fetch(`https://api-infnet-produtos-privado.vercel.app/produtos/${_id}`, {
      method: 'DELETE',
      headers: {
        Authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHBpcmVzSW4iOiIzNjVkIiwiaWF0IjoxNzI2ODY0NTQ4fQ.oQ6vlVpQEHwsq82736fY9I_OlXXBDyWYQoatf3rr6uk",
      }
    }).then(() => {
      setIsModalOpen(false);
      window.location.href = '/home';
    });
  };

  if (!product) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="product-details-container">
      <h1>{product.nome}</h1>
      <img src={product.url_imagem} alt={product.nome} className="product-details-image" />
      
      {/* Ajuste para renderizar a descrição como HTML */}
      <div
        className="product-description"
        dangerouslySetInnerHTML={{ __html: product.descricao }}
      />

      <p><strong>Preço:</strong> R${product.preco}</p>
      <p><strong>Fornecedor:</strong> {product.fornecedor}</p>
      <Link to={`/edit-product/${_id}`}>Editar</Link>
      <button onClick={() => setIsModalOpen(true)}>Excluir Produto</button>
      <DeleteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleDelete}
      />
      <Link to="/home">Voltar</Link>
    </div>
  );
};

export default ProductDetails;
