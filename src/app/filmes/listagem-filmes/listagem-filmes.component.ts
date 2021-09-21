import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { debounceTime } from "rxjs/operators";
import { FilmeService } from "src/app/core/filmes.service";
import { ConfigParams } from "src/app/shared/models/config-params";
import { Filme } from "src/app/shared/models/filme";

@Component({
  selector: "dio-listagem-filmes",
  templateUrl: "./listagem-filmes.component.html",
  styleUrls: ["./listagem-filmes.component.scss"],
})
export class ListagemFilmesComponent implements OnInit {
  readonly semFoto =
    "https://www2.camara.leg.br/atividade-legislativa/comissoes/comissoes-permanentes/cindra/imagens/sem.jpg.gif/image";

  config: ConfigParams = {
    pagina: 0,
    limite: 4,
  };
  filmes: Filme[] = [];
  filtrosLisatgem: FormGroup;
  generos: Array<string>;

  constructor(private filmeService: FilmeService, private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.filtrosLisatgem = this.fb.group({
      texto: [""],
      genero: [""],
    });

    this.filtrosLisatgem
      .get("texto")
      .valueChanges.pipe(debounceTime(400))
      .subscribe((val: string) => {
        this.config.pesquisa = val;
        this.resetarConsulta();
      });
    this.filtrosLisatgem.get("genero").valueChanges.subscribe((val: string) => {
      this.config.campo = { tipo: "genero", valor: val };
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

  abrir(id: number): void {
    this.router.navigateByUrl('/filmes/' + id);
  }

  private listarFilmes(): void {
    this.config.pagina++;
    this.filmeService
      .listar(this.config)
      .subscribe((filmes: Filme[]) => this.filmes.push(...filmes));
  }

  private resetarConsulta(): void {
    this.config.pagina = 0;
    this.filmes = [];
    this.listarFilmes();
  }
}
