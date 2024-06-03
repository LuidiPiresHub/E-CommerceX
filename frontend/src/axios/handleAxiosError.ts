import { Dispatch, SetStateAction } from 'react';
import { AxiosError } from 'axios';

const handleAxiosError = (error: AxiosError, setError: Dispatch<SetStateAction<string | null>>): void => {
  if (error.response) {
    const { status, data } = error.response;
    if (status >= 400 && status < 500) {                          // Tratamento para erro de autenticação
      const message = (data as { message: string }).message;     
      setError(message);                                         
    } else {                                                        // Outros tratamentos de erro
      setError('Ocorreu um problema interno. Tente novamente.'); 
    }                                                            
  } else if (error.request) {                                     // A requisição foi feita, mas não houve resposta do servidor
    setError('Sem resposta do servidor');                       
  } else {                                                        // Erro durante a configuração da requisição
    setError('Erro ao configurar a requisição');
  }
};

export default handleAxiosError;
