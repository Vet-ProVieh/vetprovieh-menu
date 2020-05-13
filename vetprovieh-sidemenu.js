import { html, PolymerElement } from '@polymer/polymer/polymer-element.js';

/**
 * `vetprovieh-sidemenu`
 * Responsive Sidemenu featuring Bulma.css
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
class VetproviehSidemenu extends PolymerElement {


  static get observedAttributes() {
    return ["width", "orientation"];
  }


  static get template() {
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
    
    div.body-overlay {
      width: 100vw;
      height: 100vh;
      display: none;
      position: fixed;
      z-index: 3;
      top: 0;
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
    console.log("X");
    this._addListener();
    this._updateRendering();
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
    if (!this.classList.contains("open")) {
      this.classList.add("open");
    } else {
      this.classList.remove("open");
    }
  }

  /**
   * PRIVATE
   * Add EventListener to Component
   */
  _addListener() {
    this.addEventListener('toggle', this.toggleMenu);
    document.getElementById("body-overlay-" + this._orientation).addEventListener("click", (_) => this.toggleMenu());
  }

  /**
   * PRIVATE
   * Writing HTML-Output
   */
  _updateRendering() {
    if (this.shadowRoot) {
      console.log("XX");
      this.shadowRoot.innerHTML = `
    <link rel="stylesheet" href="/node_modules/bulma/css/bulma.min.css">
        
    <style>
      ` + VetproviehSidemenu.template + `

      nav.` + this._orientation + `{
        width: ` + this._width + `;
        ` + this._orientation + `: -` + this._width + `;
      }

    div.body-overlay {
        display: block;
      }

      nav.open{
        ` + this._orientation + `: 0;
      }
    </style>
    <div id="body-overlay-` + this._orientation + `" class="body-overlay"></div>
    <nav class="`+ this._orientation + `" role="navigation">            
    ` + this._properties.content + `
    </nav>`
    ;
    }
  }
}

window.customElements.define('vetprovieh-sidemenu', VetproviehSidemenu);
