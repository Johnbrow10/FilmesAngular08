import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { FilmeService } from "src/app/core/filmes.service";
import { Filme } from "src/app/shared/models/filme";

@Component({
  selector: "dio-listagem-filmes",
  templateUrl: "./listagem-filmes.component.html",
  styleUrls: ["./listagem-filmes.component.scss"],
})
export class ListagemFilmesComponent implements OnInit {
  readonly qtdPagina = 4;
  pagina: number = 0;
  texto: string = "";
  genero: string = "";
  filmes: Filme[] = [];
  filtrosLisatgem: FormGroup;
  generos: Array<string>;

  constructor(private filmeService: FilmeService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.filtrosLisatgem = this.fb.group({
      texto: [""],
      genero: [""],
    });

    this.filtrosLisatgem.get("texto").valueChanges.subscribe((val: string) => {
      this.texto = val;
      this.resetarConsulta();
    });
    this.filtrosLisatgem.get("genero").valueChanges.subscribe((val: string) => {
      this.genero = val;
      this.resetarConsulta();
    });

    this.generos = [
      "Ação",
      "Aventura",
      "Comédia",
      "Drama",
      "Ficção Cientifica",
      "Romance",
      "Terror",
    ];

    this.listarFilmes();
  }

  onScroll(): void {
    this.listarFilmes();
  }

  private listarFilmes(): void {
    this.pagina++;
    this.filmeService
      .listar(this.pagina, this.qtdPagina, this.texto, this.genero)
      .subscribe((filmes: Filme[]) => this.filmes.push(...filmes));
  }

  private resetarConsulta(): void {
    this.pagina = 0;
    this.filmes = [];
    this.listarFilmes();
  }
}
