import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KanbanComponent } from './kanban.component';
import { FormsModule } from '@angular/forms';
import { CardUsuariosComponent } from './componentes/card-usuarios/card-usuarios.component';
import { CardTarefasComponent } from './componentes/card-tarefas/card-tarefas.component';
import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
  declarations: [
    KanbanComponent,
    CardUsuariosComponent,
    CardTarefasComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    DragDropModule
  ],
  exports: [
    KanbanComponent
  ]
})
export class KanbanModule { }
