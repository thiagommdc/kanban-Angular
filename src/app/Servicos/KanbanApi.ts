import { ETAPA_ADICIONA, ETAPA_EDITA, ETAPA_EXCLUI, ETAPA_LISTA, TAREFA_ADICIONA, TAREFA_EDITA, TAREFA_EXCLUI, TAREFA_LISTA, USUARIO_ADICIONA, USUARIO_EDITA, USUARIO_EXCLUI, USUARIO_LISTA } from '../Constantes/api';
import { IUsuarioDTO } from '../Tipos/DTO/IUsuarioDTO';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ITarefaDTO } from '../Tipos/DTO/ITarefaDTO';
import { IEtapaDTO } from '../Tipos/DTO/IEtapaDTO';

@Injectable({
  providedIn: 'root'
})
export class KanbanApi {

  constructor(private http: HttpClient) { }

  async listaUsuario() {
    return await this.getGenerico<IUsuarioDTO[]>(USUARIO_LISTA);
  }

  async adicionaUsuario(usuario: IUsuarioDTO) {
    return await this.postGenerico<number>(usuario, USUARIO_ADICIONA);
  }

  async editaUsuario(usuario: IUsuarioDTO) {
    await this.postGenerico<any>(usuario, USUARIO_EDITA);
  }
  
  async excluiUsuario(usuarioId: number) {
    await this.postGenerico<any>(null, `${USUARIO_EXCLUI}${usuarioId}`);
  }
  
  async listaTarefa(usuarioId: number) {
    return await this.getGenerico<ITarefaDTO[]>(`${TAREFA_LISTA}${usuarioId}`);
  }

  async adicionaTarefa(tarefa: ITarefaDTO) {
    return await this.postGenerico<number>(tarefa, TAREFA_ADICIONA);
  }
  
  async editaTarefa(tarefa: ITarefaDTO) {
    await this.postGenerico<any>(tarefa, TAREFA_EDITA);
  }

  async excluiTarefa(tarefaId: number) {
    await this.postGenerico<any>(null, `${TAREFA_EXCLUI}${tarefaId}`);
  }

  async listaEtapa() {
    return await this.getGenerico<IEtapaDTO[]>(ETAPA_LISTA);
  }

  async adicionaEtapa(etapa: IEtapaDTO) {
    return await this.postGenerico<number>(etapa, ETAPA_ADICIONA);
  }
  
  async editaEtapa(etapa: IEtapaDTO) {
    await this.postGenerico<any>(etapa, ETAPA_EDITA);
  }

  async excluiEtapa(etapaId: number) {
    await this.postGenerico<any>(null, `${ETAPA_EXCLUI}${etapaId}`);
  }
  
  async getGenerico<T>(endpoint: string) {
    return await this.http.get<T>(endpoint).toPromise();
  }

  async postGenerico<T>(payload: any, endpoint: string) {
    return await this.http.post<T>(endpoint, payload).toPromise();
  }

}