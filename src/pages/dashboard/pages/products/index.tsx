import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./styles.module.css";

export const ProductsPage = () => {
  const navigate = useNavigate();

  const produtos = [
    { id: "1", titulo: "Arroz 5kg" },
    { id: "2", titulo: "Feijão Carioca" },
    { id: "3", titulo: "Café 500g" },
    { id: "4", titulo: "Açúcar Refinado" },
    { id: "5", titulo: "Macarrão Espaguete" },
    { id: "6", titulo: "Óleo de Soja" },
    { id: "7", titulo: "Sal Grosso" },
    { id: "8", titulo: "Farinha de Trigo" },
    { id: "9", titulo: "Leite Integral" },
    { id: "10", titulo: "Pão de Forma" },
  ];

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Produtos</h2>

      <div className={styles.table}>
        <div className={styles.header}>
          <span>ID produto</span>
          <span>Descrição</span>
          <span>Ação</span>
        </div>

        {produtos.map((p) => (
          <div key={p.id} className={styles.row}>
            <span>{p.id}</span>
            <span>{p.titulo}</span>

            <button
              className={styles.btn}
              onClick={() => navigate(`/dashboard/products/${p.id}?titulo=${encodeURIComponent(p.titulo)}`)}
            >
              Visualizar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
