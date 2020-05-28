import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';

/**
 * `vetprovieh-sidemenu`
 * Responsive Sidemenu featuring Bulma.css
 *
 * @customElement
 * @demo demo/index.html
 */
class VetproviehSidemenu extends PolymerElement {


    static get observedAttributes() {
        return ["width", "orientation"];
    }


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

    constructor() {
        super();
        /**
         * @type {!Object}
         * @private
         */
        this._properties = {
            width: "300px",
            orientation: "left",
            content: this.innerHTML
        };
    }

    /**
     * Listining to Callback
     */
    connectedCallback() {  // Lazy creation of shadowRoot.
        if (!this.shadowRoot) {
            this.attachShadow({
                mode: 'open'
            }).innerHTML = "";
        }
        this._updateRendering();
        this._addListener();
    }

    /**
     * Callback for Attributes
     * @param {*} name
     * @param {*} oldValue
     * @param {*} newValue
     */
    attributeChangedCallback(name, old, value) {
        if (old !== value) {
            this[name] = value;
        }
    }

    /**
     * PUBLIC
     * Getter for Width of the Popup-Menu
     */
    get width() {
        return this._properties.width;
    }

    /**
     * PUBLIC
     * Setter for Widh of the Popup-Menu
     */
    set width(val) {
        if (val !== this.width) {
            this._properties.page = val;
            this._updateRendering();
        }
    }

    /**
     * PUBLIC
     * Getter for Orientation of the Popup-Menu
     */
    get orientation() {
        return this._properties.orientation;
    }

    /**
     * PUBLIC
     * Setter for Orientation of the Popup-Menu
     */
    set orientation(val) {
        if (val !== this.orientation) {
            this._properties.orientation = val;
            this._updateRendering();
        }
    }

    /**
     * PUBLIC
     * Menü öffnen/schließen
     */
    toggleMenu() {
        let menu = this.shadowRoot.getElementById("menu");
        if (!menu.classList.contains("open")) {
            menu.classList.add("open");
        } else {
            menu.classList.remove("open");
        }
    }

    /**
     * PRIVATE
     * Add EventListener to Component
     */
    _addListener() {
        this.addEventListener('toggle', this.toggleMenu);
        this.shadowRoot.getElementById("body-overlay")
            .addEventListener("click", (_) => this.toggleMenu());
    }

    /**
     * PRIVATE
     * Writing HTML-Output
     */
    _updateRendering() {
        if (this.shadowRoot) {
            this.shadowRoot.innerHTML = `
                <link rel="stylesheet" href="/node_modules/bulma/css/bulma.min.css">
                    
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
