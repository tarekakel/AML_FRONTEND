export function extractErrorMessage(apiError: any): string {
    if (apiError?.errors && Array.isArray(apiError.errors)) {
        return apiError.errors.map((e: any) => {
            // Remove prefix before colon for clarity
            // const idx = e.indexOf(':');
            return e;
        }).join('; ');
    }
    return apiError?.message || 'Unknown error';
}
export function formatDate(date: Date): string {
    return date.toISOString().split('T')[0]; // "2025-08-01"
};