import { Categoria } from "./Categorias.js";
export class Piada {
    #titulo;
    #texto;
    #imagem;
    #categoria;

  constructor(titulo, texto, imagem, categoria) {
    if (!(categoria instanceof Categoria)) {
      alert("Categoria deve ser do tipo Categoria")
    }
    this.#titulo = titulo;
    this.#texto = texto;
    this.#imagem = imagem;
    this.#categoria = categoria;
  }

  get titulo() { return this.#titulo; }
  set titulo(titulo){this.#titulo = titulo}
  
  get texto() { return this.#texto; }
  set texto(texto){this.#texto = texto}

  get imagem() { return this.#imagem; }
  set imagem(imagem){this.#imagem = imagem}

  get categoria() { return this.#categoria; }
    set categoria(valor) {
        if (!(valor instanceof Categoria)) {
            alert("categoria deve ser uma instância de Categoria");
        }
        this.#categoria = valor;
    }
}