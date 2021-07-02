import { ITarefaDTO } from './../../../../Tipos/DTO/ITarefaDTO';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { KanbanApi } from 'src/app/Servicos/KanbanApi';

@Component({
  selector: 'app-card-tarefas',
  templateUrl: './card-tarefas.component.html',
  styleUrls: ['./card-tarefas.component.scss']
})
export class CardTarefasComponent implements OnInit {

  @ViewChild('tituloInput') tituloInput: any;
  @ViewChild('subtituloInput') subtituloInput: any;
  @ViewChild('descricaoInput') descricaoInput: any;

  @Input() tarefa: ITarefaDTO;
  seExibe: boolean = true;

  constructor(private api: KanbanApi) {
    this.tarefa = {
      id: 0,
      usuarioId: 0,
      titulo: '',
      subtitulo: '',
      descricao: '',
      seCompleto: false,
      etapa: 0,
      favorito: false
    }
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.resize()
    }, 1000);
  }

  excluiTarefa() {
    if (!confirm("Tem certeza que deseja excluir?")) return;
    this.seExibe = false;
    this.api.excluiTarefa(this.tarefa.id);
  }

  editaTarefa() {
    this.api.editaTarefa(this.tarefa);
  }

  editaTitulo() {
    this.editaTarefa();
    this.resizeTitulo();
  }

  editaSubtitulo() {
    this.editaTarefa();
    this.resizeSubtitulo();
  }

  editaDescricao() {
    this.editaTarefa();
    this.resizeDescricao();
  }

  editaFavorito() {
    this.tarefa.favorito = !this.tarefa.favorito;
    this.editaTarefa();
  }


  resize() {
    this.resizeTitulo();
    this.resizeSubtitulo();
    this.resizeDescricao();
  }

  resizeTitulo() {
    this.resizeObjeto(this.tituloInput.nativeElement);
  }

  resizeSubtitulo() {
    this.resizeObjeto(this.subtituloInput.nativeElement);
  }

  resizeDescricao() {
    this.resizeObjeto(this.descricaoInput.nativeElement);
  }

  resizeObjeto(objeto: any) {
    objeto.style.height = 'auto';
    const height = objeto.scrollHeight;
    let reducaoHeight: number;

    if (objeto.name == "descricao")
      reducaoHeight = 0;
    else
      reducaoHeight = height > 36 ? 0 : 17;

    objeto.style.height = (Number(height) - reducaoHeight) + 'px';
  }

}
