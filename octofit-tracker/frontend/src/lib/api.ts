export function getApiBaseUrl(): string {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
  const normalized = codespaceName?.trim();

  if (normalized && normalized !== 'your-codespace-name' && !normalized.startsWith('undefined')) {
    return `https://${normalized}-8000.app.github.dev`;
  }

  return 'http://localhost:8000';
}

export function getApiUrl(resource: string): string {
  return `${getApiBaseUrl()}/api/${resource}/`;
}

export function normalizeListResponse<T>(payload: T | { results?: T[]; data?: T[]; items?: T[]; docs?: T[]; records?: T[] } | null | undefined): T[] {
  if (Array.isArray(payload)) {
    return payload;
  }

  if (!payload || typeof payload !== 'object') {
    return [];
  }

  const candidate = payload as {
    results?: T[];
    data?: T[];
    items?: T[];
    docs?: T[];
    records?: T[];
  };

  return (
    candidate.results ??
    candidate.data ??
    candidate.items ??
    candidate.docs ??
    candidate.records ??
    []
  );
}
