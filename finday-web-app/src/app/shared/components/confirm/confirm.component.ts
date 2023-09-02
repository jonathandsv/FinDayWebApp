import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  template: '',
})
export class ConfirmComponent implements OnInit {
  @Input() titulo: string;
  @Input() texto: string;
  @Input() icone: any;
  @Input() confirmaTexto: string = 'Sim';
  @Input() cancelaTexto: string = 'Não';

  constructor() {}

  ngOnInit() {}

  confirmar(form: any) {
    Swal.fire({
      title: this.titulo,
      text: this.texto,
      icon: this.icone,
      showCancelButton: true,
      confirmButtonText: this.confirmaTexto,
      cancelButtonText: this.cancelaTexto,
    }).then((result) => {
      if (result.value) {
        try {
          form.onConfirma();
        } catch (ex) {}
        /*
              Swal.fire(  
                'Deleted!',  
                'Your imaginary file has been deleted.',  
                'success'  
              )  
              */
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        try {
          form.onCancela();
        } catch (ex) {}
        /*
              Swal.fire(  
                'Cancelled',  
                'Your imaginary file is safe :)',  
                'error'  
              )  
              */
      }
    });
  }
}
