export const logicAppBaseUrl = String(
  import.meta.env.VITE_COVERFI_APP_URL || "https://app.coverfi.space",
).replace(/\/$/, "");

export const docsUrl = String(
  import.meta.env.VITE_COVERFI_DOCS_URL || "https://docs.coverfi.space",
).replace(/\/$/, "");

export const githubUrl =
  import.meta.env.VITE_COVERFI_GITHUB_URL || "https://github.com/CoverFI-space/";

export function getLogicAppHref(route = "login") {
  return `${logicAppBaseUrl}/${route.replace(/^\/+/, "")}`;
}
