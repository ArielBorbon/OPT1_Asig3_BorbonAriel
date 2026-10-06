import estilos from "./alerta-mensaje.css?inline";

export class AlertaMensaje extends HTMLElement {
    static observedAttributes = ["tipo"];
    
    private contenedor!: HTMLDivElement;
    private botonCerrar!: HTMLButtonElement;

    constructor() {
        super();
        const sombra = this.attachShadow({ mode: "open" });
        sombra.innerHTML = `
            <style>${estilos}</style>
            <div class="alerta exito" id="contenedor">
                <div class="mensaje">
                    <slot></slot>
                </div>
                <button class="boton-cerrar" id="cerrar" aria-label="Cerrar alerta">&times;</button>
            </div>
        `;
        this.contenedor = sombra.querySelector('#contenedor') as HTMLDivElement;
        this.botonCerrar = sombra.querySelector('#cerrar') as HTMLButtonElement;
    }

    connectedCallback() {
        this.pintar();
        
        this.botonCerrar.addEventListener('click', () => {
            this.dispatchEvent(
                new CustomEvent("cerrar", {
                    bubbles: true,
                    composed: true
                })
            );
        });
    }

    attributeChangedCallback() {
        this.pintar();
    }

    private pintar() {
        if (!this.contenedor) return;
        const tipo = this.getAttribute("tipo") ?? "exito";
        this.contenedor.className = `alerta ${tipo}`;
    }
}

customElements.define("alerta-mensaje", AlertaMensaje);