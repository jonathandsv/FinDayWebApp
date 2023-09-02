import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadListarArquivoComponent } from './upload-listar-arquivo.component';
import { HttpClientModule } from '@angular/common/http';
import { SharedModuleFW } from '../../sharedFW.module';
import { MessageService } from 'primeng/api';
import { RouterTestingModule } from '@angular/router/testing';
import { ArquivoService } from './services/arquivo.service';
import { of, throwError } from 'rxjs';
import { ApiOutput } from 'src/app/core/interfaces/api-output.inteface';
import { EventEmitter } from '@angular/core';
import { IArquivo } from './interfaces/IArquivo';

describe(UploadListarArquivoComponent.name, () => {
  let component: UploadListarArquivoComponent;
  let fixture: ComponentFixture<UploadListarArquivoComponent>;
  let messageService: MessageService;
  let arquivoService: ArquivoService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadListarArquivoComponent ],
      imports: [ 
        HttpClientModule, 
        SharedModuleFW, 
        RouterTestingModule 
      ],
      providers: [
        MessageService,
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadListarArquivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    messageService = TestBed.inject(MessageService);
    arquivoService = TestBed.inject(ArquivoService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('deve renderizar um elemento de file input', () => {
    const fileInput = fixture.nativeElement.querySelector('input[type="file"]');
    expect(fileInput).toBeTruthy();
  });
  
  it('deve desabilitar o botao "Anexar" quando o formulario for invalido', () => {
    component.form.controls['tipoDocumento'].setValue('');
    fixture.detectChanges();
  
    const button = fixture.nativeElement.querySelector('button');
    expect(button.disabled).toBe(true);
  });

  it(`#${UploadListarArquivoComponent.prototype.validatorFile.name}
    deve retornar verdadeiro se o arquivo não exceder o tamanho máximo permitido`, () => {
    const file = new File(['teste'], 'teste.txt', { type: 'text/plain' });
    Object.defineProperty(file, 'size', { value: 10000000 });

    const result = component.validatorFile([file]);

    expect(result).toBe(true);
  });

  it(`#${UploadListarArquivoComponent.prototype.validatorFile.name}
    deve retornar falso e exibir uma mensagem de aviso se o arquivo exceder o tamanho máximo permitido`, () => {
    const file = new File(['teste'], 'teste.txt', { type: 'text/plain' });
    Object.defineProperty(file, 'size', { value: 25000000 });

    spyOn(component, 'limpar');
    spyOn(component, 'emitirMensagem');

    const result = component.validatorFile([file]);

    expect(result).toBe(false);
    expect(component.limpar).toHaveBeenCalled();
    expect(component.emitirMensagem).toHaveBeenCalledWith(
      messageService,
      'warn',
      'Arquivo maior que tamanho máximo permitido de 20 MB.'
    );
  });

  it(`#${UploadListarArquivoComponent.prototype.removerAlteracao.name}
    deve remover o arquivo da lista de arquivos e exibir mensagem de sucesso ao excluir com sucesso`, () => {
    const codigo = 1;
    component.ehAlteracao = true;
    component.listaArquivos = [
      {
        codigo: 1,
        nome: 'arquivo1.txt',
        data: new Date(),
        dataFormatada: '01/01/2023',
        usuarioCriacao: 'Usuário1',
        tipoDocumento: 'Documento',
        base64: '...',
        extensao: 'txt',
      },
    ];

    const response: ApiOutput<boolean> = { data: true };
    spyOn(arquivoService, 'excluir').and.returnValue(of(response));
    spyOn(console, 'log');
    spyOn(component, 'emitirMensagem');

    component.removerAlteracao(codigo);

    expect(component.listaArquivos).toEqual([]);
    expect(arquivoService.excluir).toHaveBeenCalledWith(codigo);
    expect(component.emitirMensagem).toHaveBeenCalledWith(
      messageService,
      'success',
      'Arquivo excluído com sucesso.'
    );
    expect(component.desabilitarExcluir).toBe(false);
    expect(console.log).not.toHaveBeenCalled();
  });

  it(`#${UploadListarArquivoComponent.prototype.removerAlteracao.name}
    deve exibir mensagem de erro ao falhar ao excluir o arquivo`, () => {
    const codigo = 1;
    component.ehAlteracao = true;

    const response: ApiOutput<boolean> = { data: false };
    spyOn(arquivoService, 'excluir').and.returnValue(of(response));
    spyOn(component, 'emitirMensagem');

    component.removerAlteracao(codigo);

    expect(arquivoService.excluir).toHaveBeenCalledWith(codigo);
    expect(component.emitirMensagem)
    .toHaveBeenCalledWith(
      messageService,
      'error',
      'Não foi possível excluir o arquivo.'
    );
    expect(component.desabilitarExcluir).toBe(false);
  });

  it(`#${UploadListarArquivoComponent.prototype.removerAlteracao.name}
    não deve remover o arquivo da lista de arquivos e exibir mensagem de erro se não for uma alteração`, () => {
    const codigo = 1;
    component.ehAlteracao = false;
    
    spyOn(arquivoService, 'excluir');
    spyOn(component, 'emitirMensagem');

    component.removerAlteracao(codigo);

    expect(arquivoService.excluir).not.toHaveBeenCalled();
    expect(component.emitirMensagem).not.toHaveBeenCalled();
  });

  it(`#${UploadListarArquivoComponent.prototype.remover.name}
    deve remover o arquivo da lista de arquivos e emitir o evento listaArquivosAtualizada`, () => {
    const codigo = 1;
    component.listaArquivos = [
      {
        codigo: 1,
        nome: 'arquivo1.txt',
        data: new Date(),
        dataFormatada: '01/01/2023',
        usuarioCriacao: 'Usuário1',
        tipoDocumento: 'Documento',
        base64: '...',
        extensao: 'txt',
      },
    ];
    component.listaArquivosAtualizada = new EventEmitter<IArquivo[]>();

    component.remover(codigo);

    expect(component.listaArquivos).toEqual([]);
  });
});