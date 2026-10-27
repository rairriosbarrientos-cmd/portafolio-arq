// Marca si ya se montó la app en el navegador, para no repetir intro/cortina en la carga inicial.
// Solo se escribe desde efectos (cliente), así el HTML del servidor siempre es el de la primera carga.
let mounted = false;

export function hasMounted() {
  return mounted;
}

export function markMounted() {
  mounted = true;
}
