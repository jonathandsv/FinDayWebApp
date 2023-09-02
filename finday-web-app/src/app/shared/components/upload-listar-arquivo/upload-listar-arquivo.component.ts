import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { pluck } from 'rxjs/operators';
import { UserService } from 'src/app/core/services/user.service';
import { emitirMensagem } from 'src/app/shared/utils/emitirMensagem';

import { Autocomplete } from '../../models/autocomplete';
import { IArquivo } from './interfaces/IArquivo';
import { ArquivoService } from './services/arquivo.service';
import { TipoDocumentoService } from './services/tipo-documento.service';

@Component({
  selector: 'oasis-upload-listar-arquivo',
  templateUrl: './upload-listar-arquivo.component.html',
  styleUrls: ['./upload-listar-arquivo.component.scss']
})
export class UploadListarArquivoComponent implements OnInit {
  @ViewChild("fileInput", { static: true }) fileInput: ElementRef<HTMLInputElement> | undefined;
  @Input() ehPermitidoExcluir: boolean = false;
  @Input() ehAlteracao: boolean = false;
  @Input() ehTipoDocumentoPadrao: boolean = false;
  @Input() listaArquivos: IArquivo[] = []; //para receber arquivos já adicionados
  @Output() listaArquivosAtualizada = new EventEmitter<IArquivo[]>(); //atualiza os arquivos no componente de escopo de pagina
  @Output() arquivoNovo = new EventEmitter<IArquivo>(); //emit o ultimo arquivo ADICIONADO
  listaTiposDocumento: Autocomplete[] = [];
  arquivoBase64: string = '';
  documentoNome: string = '';
  labelAnexarDocumento: string;
  podeAnexar: boolean = false;
  form: FormGroup;
  codigoUsuario: number;
  nomeUsuario: string;
  extensao: string = '';
  desabilitarExcluir: boolean = false;
  mostrarExcluirPorPermissao: boolean = false;
  emitirMensagem = emitirMensagem;


  constructor(private messageService: MessageService,
    private tipoDocumentoService: TipoDocumentoService,
    private fb: FormBuilder,
    private arquivoService: ArquivoService,
    private userService: UserService) {
    this.userService.$usuario.subscribe({
      next: (resp) => {
        this.codigoUsuario = resp.codigo;
        this.nomeUsuario = resp.nome;
        this.mostrarExcluirPorPermissao = this.userService.verificarPermissaoAcao('documentos', 'excluir');
      }
    });
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      tipoDocumento: ['', Validators.required],
      nomeDocumento: ''
    });
    this.tipoDocumentoService.autoComplete().subscribe({
      next: (resp: any) => {
        this.listaTiposDocumento = resp?.data;
        if (!this.ehTipoDocumentoPadrao) {
          this.listaTiposDocumento = this.listaTiposDocumento.filter(x => x.codigo != 16);
        }
      }
    })
  }
  validatorFile(file) {
    if (file[0].size > 20000000) {
      this.limpar();
      this.emitirMensagem(this.messageService, 'warn', 'Arquivo maior que tamanho máximo permitido de 20 MB.');
      return false;
    }
    return true;
  }
  upload(file: any) {
    if (!this.validatorFile(file)) return;
    this.form.get('nomeDocumento').setValue(`${file[0].name}`);
    let arraySplit = this.form.get('nomeDocumento').value.split('.');
    this.extensao = arraySplit[arraySplit.length - 1].replace('"', '').toLowerCase();
    if (this.extensao) {
      if (this.extensao != 'pdf' && this.extensao != 'png'
        && this.extensao != 'bmp' && this.extensao != 'jpg'
        && this.extensao != 'jpeg' && this.extensao != 'zip'
        && this.extensao != 'pdm' && this.extensao != 'doc'
        && this.extensao != 'docx' && this.extensao != 'xls'
        && this.extensao != 'xlsx' && this.extensao != 'rar'
        && this.extensao != 'msg' && this.extensao != 'txt'
        && this.extensao != 'sql') {
        this.limpar()
        this.podeAnexar = false;
        emitirMensagem(this.messageService, 'warn', 'Formato do arquivo selecionado não é permitido. \n\nFormatos permitidos: csv, doc, docx, jpeg, jpg, png, msg, pdf, pdm, rar, xls, xlsx, zip, rar, txt e sql');
        return;
      } else {
        var reader = new FileReader();
        reader.onload = this.manipularReader.bind(this);
        reader.readAsBinaryString(file[0]);
        this.labelAnexarDocumento = 'Documento anexado!'
        this.podeAnexar = true;
      }
    }
  }

  manipularReader(readerEvt: any) {
    let binaryString = readerEvt.target.result;
    this.arquivoBase64 = btoa(binaryString);
  }

  limpar(): void {
    this.form.get('nomeDocumento').setValue('');
    this.arquivoBase64 = '';
    this.labelAnexarDocumento = 'Nenhum arquivo selecionado';
    (this.fileInput as ElementRef<HTMLInputElement>).nativeElement.value = '';
    this.podeAnexar = false;
  }

  anexar(): void {
    if (this.form.get('tipoDocumento').invalid) {
      if (!this.ehTipoDocumentoPadrao) {
        this.form.get('tipoDocumento').markAsTouched();
      }
    }

    const nome = this.form.get('nomeDocumento').value;
    const tipoDocumentoSelecionado = this.form.get('tipoDocumento').value;
    const tipoDocumento = !this.ehTipoDocumentoPadrao ? this.listaTiposDocumento.find(x => x.codigo == tipoDocumentoSelecionado) : this.listaTiposDocumento.find(x => x.codigo == 16);

    if (nome != '' || this.arquivoBase64 != '') {
      let codigo = Math.floor(Math.random() * 1001);
      var dataPura = new Date();

      const arquivo: IArquivo = {
        codigo: codigo,
        codigoTipoDocumento: tipoDocumento.codigo,
        tipoDocumento: tipoDocumento.nome,
        codigoUsuarioCriacao: this.codigoUsuario,
        data: dataPura,
        dataFormatada: this.formatDate(dataPura),
        nome: nome,
        usuarioCriacao: this.nomeUsuario,
        base64: this.arquivoBase64,
        extensao: this.extensao
      };

      this.listaArquivos.push(arquivo);
      this.limpar();
      this.listaArquivosAtualizada.emit(this.listaArquivos);
      this.arquivoNovo.emit(arquivo);
    }
    else {
      emitirMensagem(this.messageService, 'warn', 'Por favor escolha um aquivo.');
    }
  }

  salvarArquivo(arquivo: IArquivo): void {
    const downloadLink = document.createElement("a");
    const extensao = this.obterExtensoes(arquivo.extensao);
    if (arquivo.base64) {
      downloadLink.href = `data:${extensao};base64,${arquivo.base64}`;
      downloadLink.download = arquivo.nome;
      downloadLink.click();
      downloadLink.remove();
    }
    else {
      this.arquivoService.obterArquivoPorCodigo(arquivo.codigo)
        .pipe(pluck('data'))
        .subscribe({
          next: (resp) => {
            arquivo.base64 = resp.base64
            downloadLink.href = `data:${extensao};base64,${arquivo.base64}`;
            downloadLink.download = arquivo.nome;
            downloadLink.click();
            downloadLink.remove();
          }
        })
    }
  }

  obterExtensoes(extensao: string): string {
    switch (extensao.toLowerCase()) {
      case 'pdf':
        return 'application/pdf';
      case 'png':
        return 'image/png';
      case 'jpg':
      case 'jpeg':
        return 'image/jpeg';
      case 'doc':
        return 'application/msword';
      case 'docx':
        return 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
      case 'xls':
        return 'application/vnd.ms-excel';
      case 'xlsx':
        return 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
      case 'csv':
        return 'text/csv';
      case 'pdm':
        return 'application/x-pdm';
      case 'rar':
        return 'application/x-rar-compressed';
      case 'zip':
        return 'application/zip';
      case 'msg':
        return 'application/vnd.ms-outlook';
      case 'txt':
      case 'sql':
        return 'text/plain';
      default:
        return 'application/octet-stream';
    }
  }

  formatDate(date): string {
    return [
      this.padTo2Digits(date.getDate()),
      this.padTo2Digits(date.getMonth() + 1),
      date.getFullYear(),
    ].join('/');
  }

  padTo2Digits(num) {
    return num.toString().padStart(2, '0');
  }

  remover(codigo: number): void {
    if (codigo && codigo != 0) {
      this.listaArquivos = this.listaArquivos.filter(arquivo => arquivo.codigo != codigo);
      this.listaArquivosAtualizada.emit(this.listaArquivos);
    }
  }

  removerAlteracao(codigo: number): void {
    if (this.ehAlteracao) {
      if (codigo && codigo != 0) {
        this.desabilitarExcluir = true;
        this.listaArquivos = this.listaArquivos.filter(arquivo => arquivo.codigo != codigo);
        
        //Excluir arquivos
        this.arquivoService.excluir(codigo).subscribe(
        {
          next: (resp) => {
            if (resp.data) {
              this.emitirMensagem(this.messageService, 'success', 'Arquivo excluído com sucesso.');
              this.desabilitarExcluir = false;
            }
            else {
              this.emitirMensagem(this.messageService, 'error', 'Não foi possível excluir o arquivo.');
              this.desabilitarExcluir = false;
            }

          },
          error: (error) => {
            this.emitirMensagem(this.messageService, 'error', 'Não foi possível excluir o arquivo.');
            this.desabilitarExcluir = false;
          }
        });

        // this.listaArquivosAtualizada.emit(this.listaArquivos);
      }
    }
  }

}
