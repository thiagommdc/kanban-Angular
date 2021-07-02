import { ITarefaDTO } from '../DTO/ITarefaDTO';
import { IEtapaDTO } from '../DTO/IEtapaDTO';

export interface IEtapasComTarefas extends IEtapaDTO {
    tarefas: ITarefaDTO[];
}