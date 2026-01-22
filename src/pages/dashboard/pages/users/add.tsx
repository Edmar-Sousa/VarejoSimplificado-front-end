import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../../../states/auth";

export const AddUserPage = () => {
  const navigate = useNavigate();
  const accessToken = useAuthStore((state: any) => state.accessToken);
  const apiUrl = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

  
  const [formData, setFormData] = useState({
    full_name: "",
    username: "",
    email: "",
    password: "",
    business_id: 1 
  });

  const [isLoading, setIsLoading] = useState(false);

  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  const handleSave = async () => {
    // Validação simples
    if (!formData.full_name || !formData.password || !formData.email) {
      alert("Preencha todos os campos obrigatórios!");
      return;
    }

    try {
      setIsLoading(true);
      const response = await fetch(`${apiUrl}/users`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${accessToken}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        alert("Usuário cadastrado com sucesso!");
        navigate("/dashboard/users"); // Volta para a lista
      } else {
        const errorData = await response.json();
        
        const msg = errorData.detail ? JSON.stringify(errorData.detail) : "Erro ao salvar";
        alert(`Erro: ${msg}`);
      }
    } catch (error) {
      console.error("Erro:", error);
      alert("Erro de conexão com o servidor.");
    } finally {
      setIsLoading(false);
    }
  };

  
  const styles = {
    container: { padding: "20px" },
    backLink: { color: "#ff6b00", textDecoration: "none", cursor: "pointer", fontSize: "14px" },
    title: { marginTop: "20px", marginBottom: "30px", color: "#333" },
    formGroup: { marginBottom: "20px" },
    label: { display: "block", marginBottom: "8px", fontSize: "12px", fontWeight: "bold", color: "#666", textTransform: "uppercase" as const },
    input: { width: "100%", padding: "12px", borderRadius: "4px", border: "1px solid #ddd", fontSize: "14px", backgroundColor: "#f9fafb" },
    button: { 
        backgroundColor: "#ff6b00", color: "white", padding: "12px 24px", 
        border: "none", borderRadius: "4px", cursor: "pointer", fontWeight: "bold", marginTop: "10px" 
    }
  };

  return (
    <div style={styles.container}>
      <div onClick={() => navigate(-1)} style={styles.backLink}>
        &lt; Voltar para a tela anterior
      </div>

      <h2 style={styles.title}>Adicionar Novo Usuário</h2>

      <div style={{ maxWidth: "600px" }}>
        <div style={styles.formGroup}>
          <label style={styles.label}>NOME COMPLETO</label>
          <input 
            style={styles.input} 
            name="full_name" 
            placeholder="Ex: João da Silva" 
            value={formData.full_name} 
            onChange={handleChange} 
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>NOME DE USUÁRIO (LOGIN)</label>
          <input 
            style={styles.input} 
            name="username" 
            placeholder="Ex: joao.vendedor" 
            value={formData.username} 
            onChange={handleChange} 
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>EMAIL</label>
          <input 
            style={styles.input} 
            name="email" 
            type="email" 
            placeholder="Ex: joao@loja.com" 
            value={formData.email} 
            onChange={handleChange} 
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>SENHA</label>
          <input 
            style={styles.input} 
            name="password" 
            type="password" 
            placeholder="Digite uma senha segura" 
            value={formData.password} 
            onChange={handleChange} 
          />
        </div>

        <button style={styles.button} onClick={handleSave} disabled={isLoading}>
          {isLoading ? "Salvando..." : "Salvar Usuário"}
        </button>
      </div>
    </div>
  );
};