import { MessageService } from 'primeng/api';
import {
  MENSAGEM_ALTERACAO_STATUS_SUCESSO,
  MENSAGEM_ALTERACAO_SUCESSO,
  MENSAGEM_INCLUSAO_SUCESSO,
  MENSAGEM_LISTA_VAZIA,
  MENSAGEM_PERGUNTA,
  MENSAGEM_REGISTRO_SALVO_COM_SUCESSO,
} from '../messages';

export function emitirMensagem(
  messageService: MessageService,
  tipo: 'success' | 'info' | 'warn' | 'error' | 'custom',
  mensagem: string,
  isWide = null
) {
  messageService?.clear();
  messageService?.add({
    severity: tipo,
    detail: mensagem,
    life: 3500,
    sticky: false,
  });
}

export function emitirMensagemInclusaoSucesso(messageService: MessageService) {
  emitirMensagem(messageService, 'success', MENSAGEM_INCLUSAO_SUCESSO);
}

export function emitirMensagemAlertaCommon(messageService: MessageService, message) {
    emitirMensagem(messageService, 'warn', message);
}

export function emitirMensagemAlteracaoStatusSucesso(
  messageService: MessageService
) {
  emitirMensagem(messageService, 'success', MENSAGEM_ALTERACAO_STATUS_SUCESSO);
}

export function emitirMensagemListaVaziaComFiltro(
  messageService: MessageService
) {
  emitirMensagem(messageService, 'warn', MENSAGEM_LISTA_VAZIA);
}

export function emitirMensagemAlteracaoSucesso(messageService: MessageService) {
  emitirMensagem(messageService, 'success', MENSAGEM_ALTERACAO_SUCESSO);
}

export function emitirMensagemSelecionePergunta(
  messageService: MessageService
) {
  emitirMensagem(messageService, 'warn', MENSAGEM_PERGUNTA);
}

export function emitirMensagemRegistroSalvoComSucesso(
  messageService: MessageService
  ) {
    emitirMensagem(messageService, 'success', MENSAGEM_REGISTRO_SALVO_COM_SUCESSO)
  }

