export interface DropdownOption {
  label: string;
  value: string;
}

export const DOSE_UNITS: DropdownOption[] = [
  { label: 'Miligramos (mg)', value: 'mg' },
  { label: 'Mililitros (ml)', value: 'ml' },
  { label: 'Tabletas', value: 'tablet' },
  { label: 'Cápsulas', value: 'capsule' },
  { label: 'Gotas', value: 'drops' },
  { label: 'Cucharadas', value: 'tbsp' },
];

export const DURATION_UNITS: DropdownOption[] = [
  { label: 'Horas', value: 'h' },
  { label: 'Días', value: 'd' },
  { label: 'Semanas', value: 'wk' },
];
