import { VetproviehElement } from '@tomuench/vetprovieh-shared';
/**
 * `vetprovieh-sidemenu`
 * Responsive Sidemenu featuring Bulma.css
 *
 * @customElement
 * @demo demo/index.html
 */
export declare class VetproviehSidemenu extends VetproviehElement {
    private _properties;
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
    /**
     * Default-Constructor
     */
    constructor();
    /**
     * Listining to Callback
     */
    connectedCallback(): void;
    /**
     * PUBLIC
     * Getter for Width of the Popup-Menu
     * @return {string}
     */
    get width(): string;
    /**
     * PUBLIC
     * Setter for Widh of the Popup-Menu
     * @param {string} val
     */
    set width(val: string);
    /**
     * PUBLIC
     * Getter for Orientation of the Popup-Menu
     * @return {string}
     */
    get orientation(): string;
    /**
     * PUBLIC
     * Setter for Orientation of the Popup-Menu
     * @param {string} val
     */
    set orientation(val: string);
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
//# sourceMappingURL=vetprovieh-sidemenu.d.ts.map