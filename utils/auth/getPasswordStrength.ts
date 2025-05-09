export interface Strength {
  strength: number;
  label: string;
  color: string;
  textColor: string;
}

export const getPasswordStrength = (password: string): Strength => {
  if (!password) return { strength: 0, label: '', color: '', textColor: '' };

  let strength: number = 0;
  if (password.length >= 8) strength += 1;
  if (/[A-Z]/.test(password)) strength += 1;
  if (/[a-z]/.test(password)) strength += 1;
  if (/[0-9]/.test(password)) strength += 1;
  if (/[^A-Za-z0-9]/.test(password)) strength += 1;

  const strengthMap = [
    { label: 'Muy débil', color: 'bg-red-500', textColor: 'text-red-500' },
    { label: 'Débil', color: 'bg-orange-500', textColor: 'text-orange-500' },
    { label: 'Media', color: 'bg-yellow-500', textColor: 'text-yellow-500' },
    { label: 'Fuerte', color: 'bg-blue-500', textColor: 'text-blue-500' },
    { label: 'Muy fuerte', color: 'bg-green-500', textColor: 'text-green-500' },
  ];

  return {
    strength,
    label: strengthMap[strength - 1]?.label || '',
    color: strengthMap[strength - 1]?.color || '',
    textColor: strengthMap[strength - 1]?.textColor || '',
  };
};
