export function removeAcento(text: string): string {
  return text.replace(new RegExp('[áàâã]', 'gi'), 'a')
      .replace(new RegExp('[éèê]', 'gi'), 'e')
      .replace(new RegExp('[íìî]', 'gi'), 'i')
      .replace(new RegExp('[óòôõ]', 'gi'), 'o')
      .replace(new RegExp('[úùû]', 'gi'), 'u')
      .replace(new RegExp('[ç]', 'gi'), 'c')
      .replace(new RegExp('[ÁÀÂÃ]', 'gi'), 'A')
      .replace(new RegExp('[ÉÈÊ]', 'gi'), 'E')
      .replace(new RegExp('[ÍÌÎ]', 'gi'), 'I')
      .replace(new RegExp('[ÓÒÔÕ]', 'gi'), 'O')
      .replace(new RegExp('[ÚÙÛ]', 'gi'), 'U')
      .replace(new RegExp('[Ç]', 'gi'), 'C');
}
