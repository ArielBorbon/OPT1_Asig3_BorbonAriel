import estilos from "./boton-app.css?inline";

export class BotonApp extends HTMLElement {
    //ENTRADAS
    static observedAttributes = ["variante", "deshabilitado"];

    private boton!: HTMLButtonElement;


    //SE EJECUTA CUANDO SE CREA EL ELEMENTO
    constructor() {
        super();

        const sombra = this.attachShadow({ mode: "open" });

        sombra.innerHTML = `
        <style>${estilos}</style>
        <button><slot>  </slot></button>
        `;

        this.boton = sombra.querySelector('button') as HTMLButtonElement;

    }

    connectedCallback() {
        this.pintar();
    }

    attributeChangedCallback() {
        this.pintar();
    }



    private pintar() {

        if (!this.boton) return;

        this.boton.className = this.getAttribute("variante") ?? "primario";
        this.boton.disabled = this.hasAttribute("deshabilitado");
    }



}


customElements.define("boton-app", BotonApp);