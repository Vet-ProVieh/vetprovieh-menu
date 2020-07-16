/**
 * Helper to get and set Attributes on Objects
 */

/**
 * BaseClass for view Elements
 */
class VetproviehElement extends HTMLElement {
    /**
       * Callback Implementation
       * @param {string} name
       * @param {any} old
       * @param {any} value
       */
    attributeChangedCallback(name, old, value) {
        if (old !== value) {
            this[name] = value;
        }
    }
    /**
     * Loading HTML-Element From ShadowRoot
     * @param {string} id
     * @return {HTMLElement | undefined}
     */
    getByIdFromShadowRoot(id) {
        if (this.shadowRoot) {
            return this.shadowRoot.getElementById(id);
        }
    }
    /**
       * Hide Or Show Element
       * @param {string} id
       * @param {boolean} show
       */
    updateVisibility(id, show) {
        const search = this.getByIdFromShadowRoot(id);
        if (search) {
            if (!show) {
                search.classList.add('is-hidden');
            }
            else {
                search.classList.remove('is-hidden');
            }
        }
    }
    // -----------------
    // CLASS METHODS
    // -----------------
    /**
       * Getting Template
       * @return {string}
       */
    static get template() {
        return `<link href="/node_modules/bulma/css/bulma.min.css" 
                  rel="stylesheet" type="text/css">`;
    }
}

/**
 * `vetprovieh-sidemenu`
 * Responsive Sidemenu featuring Bulma.css
 *
 * @customElement
 * @demo demo/index.html
 */
class VetproviehSidemenu extends VetproviehElement {
    /**
     * Default-Constructor
     */
    constructor() {
        super();
        this._properties = {
            width: '300px',
            orientation: 'left',
            content: '',
        };
        this._properties.content = this.innerHTML;
    }
    /**
     * Returning observed Attributes
     * @return {Array<string>}
     */
    static get observedAttributes() {
        return ['width', 'orientation'];
    }
    /**
     * Possible Orientations
     * @return {Array<string>}
     */
    static get orientations() {
        return ['right', 'left'];
    }
    /**
     * Returning Menu Template
     * @return {string}
     */
    static get menuTemplate() {
        return `nav{
                  position: fixed;
                  top: 0;
                  z-index: 100;
                  height: 100%;
                  padding: .5rem 1rem;
                  box-shadow: 0 6px 12px rgba(107, 82, 82, 0.3);
                  background-color: white;
                  -webkit-box-sizing: border-box;
                  -moz-box-sizing: border-box;
                  box-sizing: border-box;
                  transition: ease 0.2s all;
                  overflow-y:auto;
              }
                
                #body-overlay {
                  width: 100vw;
                  height: 100vh;
                  display: none;
                  position: fixed;
                  z-index: 3;
                  top: 0;
                  left:0;
                  overflow: hidden;
                  background: rgba(0, 0, 0, 0.5);
                }`;
    }
    /**
     * Listining to Callback
     */
    connectedCallback() {
        if (!this.shadowRoot) {
            this.attachShadow({
                mode: 'open',
            }).innerHTML = '';
        }
        this._updateRendering();
        this._addListener();
    }
    /**
     * PUBLIC
     * Getter for Width of the Popup-Menu
     * @return {string}
     */
    get width() {
        return this._properties.width;
    }
    /**
     * PUBLIC
     * Setter for Widh of the Popup-Menu
     * @param {string} val
     */
    set width(val) {
        if (val !== this.width) {
            this._properties.width = val;
            this._updateRendering();
        }
    }
    /**
     * PUBLIC
     * Getter for Orientation of the Popup-Menu
     * @return {string}
     */
    get orientation() {
        return this._properties.orientation;
    }
    /**
     * PUBLIC
     * Setter for Orientation of the Popup-Menu
     * @param {string} val
     */
    set orientation(val) {
        const included = VetproviehSidemenu.orientations.includes(val);
        if (val !== this.orientation && included) {
            this._properties.orientation = val;
            this._updateRendering();
        }
    }
    /**
     * PUBLIC
     * Menü öffnen/schließen
     */
    toggleMenu() {
        if (this.shadowRoot) {
            const menu = this.getByIdFromShadowRoot('menu');
            if (!menu.classList.contains('open')) {
                menu.classList.add('open');
            }
            else {
                menu.classList.remove('open');
            }
        }
    }
    /**
     * PRIVATE
     * Add EventListener to Component
     */
    _addListener() {
        this.addEventListener('toggle', this.toggleMenu);
        const element = this.getByIdFromShadowRoot('body-overlay');
        element.addEventListener('click', () => this.toggleMenu());
    }
    /**
     * PRIVATE
     * Writing HTML-Output
     */
    _updateRendering() {
        if (this.shadowRoot) {
            this.shadowRoot.innerHTML = VetproviehElement.template + `
                <style>
                  ` + VetproviehSidemenu.menuTemplate + `
            
                  nav {
                    width: ` + this.width + `;
                    ` + this.orientation + `: -` + this.width + `;
                  }
            
                  .open #body-overlay {
                    display: block;
                  }
            
                  .open nav{
                    ` + this.orientation + `: 0;
                  }
                </style>
                <div id="menu">
                    <div id="body-overlay"></div>
                    <nav role="navigation">            
                    ` + this._properties.content + `
                    </nav>
                </div>`;
        }
    }
}
window.customElements.define('vetprovieh-sidemenu', VetproviehSidemenu);

export { VetproviehSidemenu };
//# sourceMappingURL=vetprovieh-sidemenu.js.map
