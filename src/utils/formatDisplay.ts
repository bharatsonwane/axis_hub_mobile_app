export function formatUserName({
  firstName,
  lastName,
  email,
}: {
  firstName?: string | null;
  lastName?: string | null;
  email?: string | null;
}): string {
  const name = [firstName, lastName].filter(Boolean).join(' ').trim();
  return name || email || '—';
}

export function formatBoolean(value: boolean | undefined): string {
  if (value === undefined) {
    return '—';
  }
  return value ? 'Yes' : 'No';
}

export function formatDate(value: string | null | undefined): string {
  if (!value) {
    return '—';
  }
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }
  return date.toLocaleDateString();
}
