import { useCallback, useEffect, useState } from "react";
import { useAuthStore } from "../../../../states/auth";
import { TableComponent } from "../../../../components/TableComponent";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom"; // Importante para o botão funcionar

const styles = {
  container: { padding: '20px' },

  title: { fontSize: '24px', fontWeight: 'bold', color: '#333', margin: 0 }
};

const headers = [
  { column: 'id', label: 'ID' },
  { column: 'full_name', label: 'Nome Completo' },
  { column: 'email', label: 'Email' },
  { column: 'username', label: 'Usuário' },
];

export const UsersPage = () => {
  const [users, setUsers] = useState<Array<any>>([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate(); // Hook para mudar de tela

  // Pega o token e a URL
  const accessToken = useAuthStore((state: any) => state.accessToken);
  const apiUrl = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

  // Função de Buscar (Get)
  const getUsers = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${apiUrl}/users`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${accessToken}`,
          "Content-Type": "application/json"
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUsers(data);
      } else {
        
        toast.error("Erro ao buscar usuários"); 
      }
    } catch (error) {
      console.error("Erro de conexão", error);
      toast.error("Erro de conexão com o servidor");
    } finally {
      setIsLoading(false);
    }
  }, [accessToken, apiUrl]);

  // Função de Deletar
  const handlerDeleteUser = useCallback(async (user: any) => {
    if(!confirm(`Tem certeza que deseja excluir ${user.full_name}?`)) return;

    try {
      setIsLoading(true);
      const response = await fetch(`${apiUrl}/users/${user.id}`, {
          method: 'DELETE',
          headers: {
              "Authorization": `Bearer ${accessToken}`,
          }
      });
      
      if (response.ok) {
          toast.success("Usuário deletado com sucesso!");
          getUsers(); // Atualiza a lista
      } else {
          toast.error("Erro ao deletar. Verifique permissões.");
      }
    } catch (error) {
        toast.error("Erro ao deletar");
    } finally {
        setIsLoading(false);
    }
  }, [accessToken, apiUrl, getUsers]);

  // Carrega ao abrir a tela
  useEffect(() => {
    getUsers();
  }, [getUsers]);

  return (
    <div style={styles.container}>
      
     
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        
        <h2 style={styles.title}>Gerenciar Usuários</h2>

        <button 
            onClick={() => navigate('/dashboard/users/add')}
            style={{ 
                backgroundColor: "#ff6b00", 
                color: "white", 
                padding: "10px 20px", 
                border: "none", 
                borderRadius: "4px", 
                cursor: "pointer", 
                fontWeight: "bold",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                fontSize: "14px"
            }}
        >
            + Adicionar Novo Usuário
        </button>

      </div>
     

      <TableComponent 
        isLoadding={isLoading} 
        header={headers}
        productsCategories={users} 
        handlerClickEdit={(user) => alert(`Editar usuário: ${user.full_name} (Em breve)`)}
        handlerClickDelete={handlerDeleteUser} 
      />
    </div>
  );
};