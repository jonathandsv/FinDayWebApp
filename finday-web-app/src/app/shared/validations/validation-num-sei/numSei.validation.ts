import { AbstractControl, ValidationErrors, ValidatorFn, FormControl } from "@angular/forms";

export function numSeiValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const valorForm = control.value;
    if (valorForm != null && valorForm.length === 19) {
      const valorSemFormatacao = valorForm.replace(/[^0-9]/g, '');
      if (/^\d+$/.test(valorSemFormatacao)) {
        const primeiroDV = calcularPrimeiroDV(valorSemFormatacao);
        const segundoDV = calcularSegundoDV(String(valorSemFormatacao) + String(primeiroDV));
        if (primeiroDV === valorSemFormatacao[valorSemFormatacao.length - 2] && segundoDV === valorSemFormatacao[valorSemFormatacao.length - 1]) {
          return null;
        } else {
          return { notValidSei: true };
        }
      }
    }
    return null;
  };
}
function calcularPrimeiroDV(valorSemFormatacao: string) {
  const pesos = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];
  let totalSoma = 0;
  const valorInvertido = valorSemFormatacao.substring(0, 17).split('').reverse().join('');
  for (let i = 0; i < pesos.length; i++) {
    totalSoma += Number(valorInvertido[i]) * pesos[i];
  }
  const restoDivisaoPor11 = totalSoma % 11;
  const dv1 = 11 - restoDivisaoPor11;
  return dv1 > 10 ? String(dv1)[1] : String(dv1);
}

function calcularSegundoDV(valorSemFormatacao: string) {
  const pesos = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19];
  const valorInvertido = valorSemFormatacao.substring(0, 18).split('').reverse().join('');
  let totalSoma = 0;
  for (let i = 0; i < pesos.length; i++) {
    totalSoma += Number(valorInvertido[i]) * pesos[i];
  }
  const restoDivisaoPor11 = totalSoma % 11;
  const dv2 = 11 - restoDivisaoPor11;
  return dv2 > 10 ? String(dv2)[1] : String(dv2);
}
