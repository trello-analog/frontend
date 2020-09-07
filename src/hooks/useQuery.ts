export function useQuery(name: string): string {
    const urlParams = new URLSearchParams(window.location.search.substring(1));
    return urlParams.get(name) || "";
}
