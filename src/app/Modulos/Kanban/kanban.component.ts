import { IEtapaDTO } from './../../Tipos/DTO/IEtapaDTO';
import { ITarefaDTO } from './../../Tipos/DTO/ITarefaDTO';
import { KanbanApi } from './../../Servicos/KanbanApi';
import { IUsuarioDTO } from './../../Tipos/DTO/IUsuarioDTO';
import { Component, OnInit } from '@angular/core';
import { IEtapasComTarefas } from 'src/app/Tipos/Models/IEtapasComTarefas';

@Component({
  selector: 'app-kanban',
  templateUrl: './kanban.component.html',
  styleUrls: ['./kanban.component.scss']
})
export class KanbanComponent implements OnInit {

  usuarios: IUsuarioDTO[] = [];
  tarefas: ITarefaDTO[] = [];
  etapas: IEtapaDTO[] = [];
  iteracaoEtapas: IEtapasComTarefas[] = [];
  usuadioSelecionado: number = 0;

  constructor(private api: KanbanApi) { }

  ngOnInit(): void {
    this.atualizaEtapas();
    this.atualizaUsuarios();
  }

  async atualizaUsuarios() {
    const usuariosAtualizado = await this.api.listaUsuario();
    this.usuarios = usuariosAtualizado;
    const [primeiroUsuario] = usuariosAtualizado;
    this.usuadioSelecionado = primeiroUsuario.id;
    this.atualizaTarefas(primeiroUsuario.id);
  }

  async atualizaTarefas(idUsuario: number) {
    const tarefasAtualizado = await this.api.listaTarefa(idUsuario);
    this.tarefas = tarefasAtualizado;

    setTimeout(() => {
      this.iteracaoEtapas = this.etapas.map(t => {
        const etapa: IEtapasComTarefas = {
          id: t.id,
          nome: t.nome,
          tarefas: tarefasAtualizado.filter(x => x.usuarioId == idUsuario && x.etapa == t.id)
        }
        return etapa;
      })
    }, 500);
  }

  async adicionaTarefa(idEtapa: number) {
    const tarefaNova: ITarefaDTO = {
      id: 0,
      usuarioId: this.usuadioSelecionado,
      titulo: '',
      subtitulo: '',
      descricao: '',
      seCompleto: false,
      etapa: idEtapa,
      favorito: false
    }
    const idEtapaNova = await this.api.adicionaTarefa(tarefaNova);

    if (idEtapaNova != 0)
      this.atualizaTarefas(this.usuadioSelecionado);
  }

  async atualizaEtapas() {
    this.etapas = await this.api.listaEtapa();
  }

  async adicionaUsuario() {
    const usuarioNovo: IUsuarioDTO = {
      id: 0,
      nome: ''
    };
    await this.api.adicionaUsuario(usuarioNovo);
    await this.atualizaUsuarios()
  }

  exibeTarefas(idUsuario: number) {
    this.usuadioSelecionado = idUsuario;
    this.atualizaTarefas(idUsuario);
  }

  alteraNomeEtapa(idEtapa: number, objeto: any) {
    const nome = objeto.value;
    const etapaParaEdicao: IEtapaDTO = {
      id: idEtapa,
      nome: nome
    }
    this.api.editaEtapa(etapaParaEdicao);
  }

}
