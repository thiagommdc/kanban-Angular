import { IUsuarioDTO } from './../../../../Tipos/DTO/IUsuarioDTO';
import { Component, Input, OnInit } from '@angular/core';
import { KanbanApi } from 'src/app/Servicos/KanbanApi';

@Component({
  selector: 'app-card-usuarios',
  templateUrl: './card-usuarios.component.html',
  styleUrls: ['./card-usuarios.component.scss']
})
export class CardUsuariosComponent implements OnInit {

  @Input() usuario: IUsuarioDTO;
  seAtivo: boolean = true;

  constructor(private api: KanbanApi) {
    this.usuario = {
      id: 0,
      nome: '',
    }
  }

  ngOnInit(): void {
  }

  async atualizaNome() {
    await this.api.editaUsuario(this.usuario);
  }

  async excluiUsuario() {
    if (!confirm("Tem certeza que deseja excluir?")) return;
    await this.api.excluiUsuario(this.usuario.id);
    this.seAtivo = false;
  }

}
