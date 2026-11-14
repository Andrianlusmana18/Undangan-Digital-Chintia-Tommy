/** Copy text cleanly via Clipboard API with textarea execCommand fallback. */
export async function copyToClipboard(text: string): Promise<boolean> {
  if (!text) return false;

  if (typeof navigator !== "undefined" && navigator.clipboard && window.isSecureContext) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      // Continue to legacy textarea fallback
    }
  }

  if (typeof document === "undefined") return false;
  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.left = "-9999px";
  textarea.style.top = "-9999px";
  document.body.appendChild(textarea);

  try {
    textarea.select();
    textarea.setSelectionRange(0, text.length);
    return document.execCommand("copy");
  } catch {
    return false;
  } finally {
    document.body.removeChild(textarea);
  }
}
