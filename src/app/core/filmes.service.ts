import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { Filme } from "../shared/models/filme";

const url = "http://localhost:3000/filmes/";
@Injectable({
  providedIn: "root",
})
export class FilmeService {
  constructor(private http: HttpClient) {}

  salvar(filme: Filme): Observable<Filme> {
    return this.http.post<Filme>(url, filme);
  }

  listar(
    pagina: number,
    qtdPagina: number,
    texto: string,
    genero: string
  ): Observable<Filme[]> {
    //  listando os filmes mas com limitação de pagina
    let httpParams = new HttpParams();
    httpParams = httpParams.set("_page", pagina.toString());
    httpParams = httpParams.set("_limit", qtdPagina.toString());
    httpParams = httpParams.set("_order", "desc");
    httpParams = httpParams.set("_sort", "id");
    if (texto) {
      httpParams = httpParams.set("q", texto);
    }
    if (genero) {
      httpParams = httpParams.set("genero", genero);
    }
    return this.http.get<Filme[]>(url, { params: httpParams });
  }
}
