import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material";
import { FilmeService } from "src/app/core/filmes.service";
import { AlertaComponent } from "src/app/shared/components/alerta/alerta.component";
import { ValidarCamposService } from "src/app/shared/components/campo/validar-campos.service";
import { Alerta } from "src/app/shared/models/alerta";
import { Filme } from "src/app/shared/models/filme";

@Component({
  selector: "dio-cadastro-filmes",
  templateUrl: "./cadastro-filmes.component.html",
  styleUrls: ["./cadastro-filmes.component.scss"],
})
export class CadastroFilmesComponent implements OnInit {
  cadastro: FormGroup;
  generos: Array<string>;
  constructor(
    public validacao: ValidarCamposService,
    public dialog: MatDialog,
    private fb: FormBuilder,
    private filmeService: FilmeService
  ) {}

  get f() {
    return this.cadastro.controls;
  }

  ngOnInit(): void {
    this.generos = [
      "Ação",
      "Aventura",
      "Comédia",
      "Drama",
      "Ficção Cientifica",
      "Romance",
      "Terror",
    ];

    this.cadastro = this.fb.group({
      titulo: [
        "",
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(256),
        ],
      ],
      urlFoto: ["", [Validators.minLength(10)]],
      dtLancamento: ["", [Validators.required]],
      descricao: [""],
      nota: [0, [Validators.required, Validators.min(0), Validators.max(10)]],
      urlIMDb: ["", [Validators.minLength(10)]],
      genero: ["", [Validators.required]],
    });
  }

  submit(): void {
    this.cadastro.markAllAsTouched();
    if (this.cadastro.invalid) {
      return;
    }

    const filme = this.cadastro.getRawValue() as Filme;
    this.salvar(filme);
  }

  reiniciarForm(): void {
    this.cadastro.reset();
  }

  private salvar(filme: Filme): void {
    this.filmeService.salvar(filme).subscribe(
      () => {
        const config = {
          data: {
            btnSucesso: "Ir Para a listagem",
            btnCancelar: "Cadastrar um novo filme",
            corBtnCancelar: "primary",
            possuirBtnFechar: true,
          } as Alerta,
        };
        const dialogref = this.dialog.open(AlertaComponent,config);
      },
      () => {
        alert("Erro ao Salvar");
      }
    );
  }
}
