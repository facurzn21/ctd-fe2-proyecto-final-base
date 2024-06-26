export interface INoticiasNormalizadas {
  id: number;
  titulo: string;
  descripcion: string;
  fecha: any;
  esPremium: boolean;
  imagen: string;
  descripcionCorta?: string;
  
}
export interface IModal {
  noticia: INoticiasNormalizadas | null;
  visible: boolean;
}
