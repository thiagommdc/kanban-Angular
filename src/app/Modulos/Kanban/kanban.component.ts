import { IEtapaDTO } from './../../Tipos/DTO/IEtapaDTO';
import { ITarefaDTO } from './../../Tipos/DTO/ITarefaDTO';
import { KanbanApi } from './../../Servicos/KanbanApi';
import { IUsuarioDTO } from './../../Tipos/DTO/IUsuarioDTO';
import { Component, OnInit } from '@angular/core';
import { IEtapasComTarefas } from 'src/app/Tipos/Models/IEtapasComTarefas';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

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

  drop(event: CdkDragDrop<ITarefaDTO[]>) {
    console.log(event);
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
    this.atualizaTarefaEtapa(event.container.id, event.container.data[event.currentIndex]);
  }

  atualizaTarefaEtapa(strIdEtapa: string, tarefa: ITarefaDTO) {
    const temp = strIdEtapa.split("-");
    const ultimoIndex = temp.length - 1;
    const IdEtapa = Number(temp[ultimoIndex]) + 1;

    tarefa.etapa = IdEtapa;
    this.api.editaTarefa(tarefa);
    if (IdEtapa == 5)
      this.exibeMsgCompleto(tarefa);

  }

  exibeMsgCompleto(tarefa: ITarefaDTO) {
    const newLine = "\r\n";
    let msg = "Assunto: Tarefa completada!";
    msg += newLine;
    msg += "Mensagem: A tarefa foi completada";
    msg += newLine;
    msg += "Usuário: " + this.usuarios.find(t => t.id == tarefa.usuarioId)?.nome;
    msg += newLine;
    msg += "Tarefa: " + tarefa.titulo;
    msg += newLine;
    msg += "Descrição: " + tarefa.descricao;
    alert(msg);
  }

}
