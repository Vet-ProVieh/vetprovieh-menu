/**
 * `vetprovieh-sidemenu`
 * Responsive Sidemenu featuring Bulma.css
 *
 * @customElement
 * @demo demo/index.html
 */
export class VetproviehSidemenu extends VetproviehElement {
    /**
     * Returning observed Attributes
     * @return {Array<string>}
     */
    static get observedAttributes(): string[];
    /**
     * Possible Orientations
     * @return {Array<string>}
     */
    static get orientations(): string[];
    /**
     * Returning Menu Template
     * @return {string}
     */
    static get menuTemplate(): string;
    _properties: {
        width: string;
        orientation: string;
        content: string;
    };
    /**
     * Listining to Callback
     */
    connectedCallback(): void;
    /**
     * PUBLIC
     * Setter for Widh of the Popup-Menu
     * @param {string} val
     */
    set width(arg: string);
    /**
     * PUBLIC
     * Getter for Width of the Popup-Menu
     * @return {string}
     */
    get width(): string;
    /**
     * PUBLIC
     * Setter for Orientation of the Popup-Menu
     * @param {string} val
     */
    set orientation(arg: string);
    /**
     * PUBLIC
     * Getter for Orientation of the Popup-Menu
     * @return {string}
     */
    get orientation(): string;
    /**
     * PUBLIC
     * Menü öffnen/schließen
     */
    toggleMenu(): void;
    /**
     * PRIVATE
     * Add EventListener to Component
     */
    _addListener(): void;
    /**
     * PRIVATE
     * Writing HTML-Output
     */
    _updateRendering(): void;
}
/**
 * Helper to get and set Attributes on Objects
 */
/**
 * BaseClass for view Elements
 */
declare class VetproviehElement extends HTMLElement {
    /**
       * Getting Template
       * @return {string}
       */
    static get template(): string;
    /**
       * Callback Implementation
       * @param {string} name
       * @param {any} old
       * @param {any} value
       */
    attributeChangedCallback(name: string, old: any, value: any): void;
    /**
     * Loading HTML-Element From ShadowRoot
     * @param {string} id
     * @return {HTMLElement | undefined}
     */
    getByIdFromShadowRoot(id: string): HTMLElement | undefined;
    /**
       * Hide Or Show Element
       * @param {string} id
       * @param {boolean} show
       */
    updateVisibility(id: string, show: boolean): void;
}
export {};
