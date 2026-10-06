import estilos from "./tabla-generica.css?inline";

export interface ColumnaTabla {
    clave: string;
    titulo: string;
}

export class TablaGenerica extends HTMLElement {
    private _columnas: ColumnaTabla[] = [];
    private _filas: Record<string, any>[] = [];

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }

    get columnas() { return this._columnas; }
    set columnas(valor: ColumnaTabla[]) {
        this._columnas = valor;
        this.pintar();
    }

    get filas() { return this._filas; }
    set filas(valor: Record<string, any>[]) {
        this._filas = valor;
        this.pintar();
    }

    connectedCallback() {
        this.pintar();
    }

    private pintar() {
        if (!this.shadowRoot) return;

        if (this._filas.length === 0) {
            this.shadowRoot.innerHTML = `
                <style>${estilos}</style>
                <div class="vacio">Sin datos</div>
            `;
            return;
        }

        const theadHTML = this._columnas
            .map(col => `<th>${col.titulo}</th>`)
            .join("");

        const tbodyHTML = this._filas.map(fila => {
            const celdasHTML = this._columnas
                .map(col => `<td>${fila[col.clave]}</td>`)
                .join("");
            return `<tr>${celdasHTML}</tr>`;
        }).join("");

        this.shadowRoot.innerHTML = `
            <style>${estilos}</style>
            <table>
                <thead>
                    <tr>${theadHTML}</tr>
                </thead>
                <tbody>
                    ${tbodyHTML}
                </tbody>
            </table>
        `;
    }
}

customElements.define("tabla-generica", TablaGenerica);