import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { saveAs as importedSaveAs } from 'file-saver';
import { MessageService } from 'primeng/api';
import { environment } from 'src/environments/environment';
import * as pdfjs from 'pdfjs-dist/webpack';
import * as XLSX from 'xlsx';

@Injectable({
    providedIn: 'root'
})
export class RelatorioService {

    constructor(protected http: HttpClient,
        protected messageService: MessageService) { }


    exportar(urlSistema: string, nomeRelatorio: string, extensao: string, parametros?: {}, nomeArquivo?: string) {
        const urlreport = this.montarUrl(urlSistema, nomeRelatorio, extensao, parametros);
        this.httpGet(urlreport, nomeRelatorio, extensao, nomeArquivo);
    }


    exportarTuxedoRelatorio(url_sufix: string, obj: any, nomeRelatorio: string, extensao: string = 'pdf') {

        this.http.post(`${environment.API_OASIS}${url_sufix}`, obj, {
            responseType: 'blob',
            observe: 'response'
        })
            .subscribe((res: any) => {
                importedSaveAs(res.body, `${nomeRelatorio}.${extensao}`);
            },
                err => {
                    this.messageService.add({
                        severity: 'error', detail: 'Não foi possível imprimir o relatório.',
                        life: 5000
                    });
                })
    }

    // private httpGet(urlreport: string, nomeRelatorio: string, extensao: string, nomeArquivo?: string) {
    //     const nomeArquivoFinal = nomeArquivo == null ? nomeRelatorio : nomeArquivo;
    //     this.http.get(urlreport, {
    //         headers: new HttpHeaders({ timeout: '200000' }).set('Content-Type', 'application/json'),
    //         responseType: 'blob'
    //     }).subscribe((resp: any) => {
    //         debugger;
    //         if (resp != null && resp.size > 0) {
    //             importedSaveAs(resp, `${nomeArquivoFinal}.${extensao}`);
    //         } else {
    //             this.messageService.add({
    //                 severity: 'error', detail: 'Não foi possível imprimir o relatório.',
    //                 life: 5000
    //             });
    //         }
    //     }, ex => {
    //         this.messageService.add({
    //             severity: 'error', detail: 'Não foi possível imprimir o relatório.',
    //             life: 5000
    //         });
    //     });
    // }
    private httpGet(urlreport: string, nomeRelatorio: string, extensao: string, nomeArquivo?: string) {
        const nomeArquivoFinal = nomeArquivo || nomeRelatorio;
        this.http.get(urlreport, {
            headers: new HttpHeaders({ timeout: '200000' }).set('Content-Type', 'application/json'),
            responseType: 'blob'
        }).subscribe((resp: any) => {
            if (extensao === 'pdf') {
                this.checkPdfContent(resp, nomeArquivoFinal);
            } else if (extensao === 'xlsx') {
                this.checkExcelContent(resp, nomeArquivoFinal);
            } else {
                importedSaveAs(resp, `${nomeArquivoFinal}.${extensao}`);
            }
        }, ex => {
            this.messageService.add({
                severity: 'error', detail: 'Não foi possível imprimir o relatório.',
                life: 5000
            });
        });
    }

    private checkPdfContent(resp: Blob, nomeArquivoFinal: string) {
        const fileReader = new FileReader();
        fileReader.onloadend = () => {
            const uint8Array = new Uint8Array(fileReader.result as ArrayBuffer);
            pdfjs.getDocument(uint8Array).promise.then(pdf => {
                const numPages = pdf.numPages;
                let hasContent = false;
                const pagePromises = [];

                for (let i = 1; i <= numPages; i++) {
                    pagePromises.push(pdf.getPage(i).then(page => {
                        return page.getTextContent().then(content => {
                            return content.items.length > 0;
                        });
                    }));
                }

                Promise.all(pagePromises).then(results => {
                    for (let i = 0; i < results.length; i++) {
                        if (results[i]) {
                            hasContent = true;
                            break;
                        }
                    }

                    if (resp.size > 0 && hasContent) {
                        importedSaveAs(resp, `${nomeArquivoFinal}.pdf`);
                    } else {
                        this.messageService.add({
                            severity: 'warn', detail: 'Nenhum resultado encontrado.',
                            life: 5000
                        });
                    }
                });
            }).catch(error => {
                console.error(error);
                this.messageService.add({
                    severity: 'error', detail: 'Não foi possível imprimir o relatório.',
                    life: 5000
                });
            });
        };
        fileReader.readAsArrayBuffer(resp);
    }

    private checkExcelContent(resp: Blob, nomeArquivoFinal: string) {
        const fileReader = new FileReader();
        fileReader.onloadend = () => {
            const uint8Array = new Uint8Array(fileReader.result as ArrayBuffer);
            const workbook = XLSX.read(uint8Array, { type: 'array' });
            let hasData = false;
            workbook.SheetNames.forEach(sheetName => {
                const sheet = workbook.Sheets[sheetName];
                const sheetData = XLSX.utils.sheet_to_json(sheet, { header: 1 }) as any[][];
                if (sheetData.some(row => row.some(cell => cell !== null))) {
                    hasData = true;
                }
            });
            if (hasData) {
                importedSaveAs(resp, `${nomeArquivoFinal}.xlsx`);
            } else {
                this.messageService.add({
                    severity: 'warn', detail: 'Nenhum resultado encontrado.',
                    life: 5000
                });
            }
        };
        fileReader.readAsArrayBuffer(resp);
    }
    private montarUrl(urlSistema: string, nomeRelatorio: string, extensao: string, parametros: {}) {
        return `${urlSistema}/Report/Publica?reportName=${nomeRelatorio}&ext=${extensao}` +
            (parametros == null ? '' : '&' +
                Object.keys(parametros).map(k => `${k}=${encodeURI(parametros[k])}`).reduce((a, b) => a + '&' + b));
    }

    public consultarRelatorioSiop(urlSistema: string, controller: string, metodo: string, parametros: {}, callback?) {

        var urlParametros = `${urlSistema}/${controller}/${metodo}?` + (parametros == null
            ? ''
            : Object.keys(parametros).map(k => `${k}=${encodeURI(parametros[k])}`).reduce((a, b) => a + '&' + b));

        this.http.get(urlParametros).subscribe((resp: any) => {
            callback(resp);
        });
    }

    public verificarQuantidade(urlSistema: string, controller: string, metodo: string, parametros: {}, callback?) {
        var urlParametros = `${urlSistema}/${controller}/${metodo}?` + (parametros == null
            ? ''
            : Object.keys(parametros).map(k => `${k}=${encodeURI(parametros[k])}`).reduce((a, b) => a + '&' + b));

        this.http.get(urlParametros).subscribe((resp: any) => {
            callback(resp);
        }, ex => {
            if (ex.status == 400) {
                this.messageService.add({
                    severity: 'warn', detail: 'Nenhum registro foi encontrado.',
                    life: 5000
                });
            } else {
                this.messageService.add({
                    severity: 'error', detail: 'Não foi possível imprimir o relatório.',
                    life: 5000
                });
            }
        });
    }

    public verificarQuantidadeComTramentoMensagem(urlSistema: string, controller: string, metodo: string, parametros: {}, callback?) {
        var urlParametros = `${urlSistema}/${controller}/${metodo}?` + (parametros == null
            ? ''
            : Object.keys(parametros).map(k => `${k}=${encodeURI(parametros[k])}`).reduce((a, b) => a + '&' + b));

        this.http.get(urlParametros).subscribe((resp: any) => {
            callback(resp);
        });
    }

}
