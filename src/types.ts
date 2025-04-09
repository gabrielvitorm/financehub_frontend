export interface Usuario {
    nomeUsuario: string;
    emailUsuario: string;
    cpfUsuario: string;
    senhaUsuario: string;
  }
  
  export interface LoginDTO {
    emailUsuario: string;
    senhaUsuario: string;
  }

export interface Transacao {
    idTransacao: number;
    descricao: string;
    nomeTransaca: string;
    descricaoTransacao: string;
    tipoTransacao: string;
    tipoCategoria: string;
    valor: number;
    dataCriacao: string;
    categoria: string;
  }
  