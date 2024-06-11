export function generateSlug(text: string): string {
  return text
    .normalize("NFD")
    .replace(/[\u300-\u36f]/g,"")
    .toLocaleLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
}