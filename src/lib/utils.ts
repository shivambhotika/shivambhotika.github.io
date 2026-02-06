export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function formatDateShort(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export function formatDateMonthYear(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
  });
}

export function classNames(...classes: (string | boolean | undefined)[]): string {
  return classes.filter(Boolean).join(' ');
}

export function truncate(str: string, length: number): string {
  if (str.length <= length) return str;
  return str.slice(0, length).trim() + '...';
}

export function getTypeLabel(type: string): string {
  const labels: Record<string, string> = {
    book: 'Reading',
    listening: 'Listening',
    thought: 'Thought',
    investment: 'Investment',
  };
  return labels[type] || type;
}

export function getTypeColor(type: string): string {
  const colors: Record<string, string> = {
    book: 'text-blue-600',
    listening: 'text-purple-600',
    thought: 'text-amber-600',
    investment: 'text-green-600',
  };
  return colors[type] || 'text-slate-600';
}

export function getRatingStars(rating: number): string {
  return '★'.repeat(rating) + '☆'.repeat(5 - rating);
}
