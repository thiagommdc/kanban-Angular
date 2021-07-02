export interface ITarefaDTO {
    id: number,
    usuarioId: number,
    titulo: string,
    subtitulo: string,
    descricao: string,
    dataCadastro?: Date,
    seCompleto: boolean,
    etapa: number,
    favorito: boolean
}