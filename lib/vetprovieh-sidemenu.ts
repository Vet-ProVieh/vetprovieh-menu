import {VetproviehElement} from '@tomuench/vetprovieh-shared';

/**
 * `vetprovieh-sidemenu`
 * Responsive Sidemenu featuring Bulma.css
 *
 * @customElement
 * @demo demo/index.html
 */
export class VetproviehSidemenu extends VetproviehElement {
    private _properties = {
      width: '300px',
      orientation: 'left',
      content: '',
    };

    /**
     * Returning observed Attributes
     * @return {Array<string>}
     */
    static get observedAttributes(): string[] {
      return ['width', 'orientation'];
    }

    /**
     * Possible Orientations
     * @return {Array<string>}
     */
    static get orientations(): string[] {
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
     * Default-Constructor
     */
    constructor() {
      super();
      this._properties.content = this.innerHTML;
    }

    /**
     * Listining to Callback
     */
    connectedCallback() { // Lazy creation of shadowRoot.
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
        const menu = this.getByIdFromShadowRoot('menu') as HTMLElement;
        if (!menu.classList.contains('open')) {
          menu.classList.add('open');
        } else {
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
      const element = this.getByIdFromShadowRoot('body-overlay') as HTMLElement;
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
