import { VetproviehElement, WebComponent } from '@tomuench/vetprovieh-shared/lib';

/**
 * `vetprovieh-sidemenu`
 * Responsive Sidemenu featuring Bulma.css
 *
 * @customElement
 * @demo demo/index.html
 */
@WebComponent({
  template: VetproviehElement.template + `
  <style>
    nav{
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
    }

    nav {
      width: \${this.width};
      \${this.orientation}: -\${this.width};
    }

    .open #body-overlay {
      display: block;
    }

    .open nav{
      \${this.orientation}: 0;
    }
  </style>
  <div id="menu">
      <div id="body-overlay"></div>
      <nav role="navigation">            
       \${this._content}
      </nav>
  </div>`,
  tag: 'vetprovieh-sidemenu'
})
export class VetproviehSidemenu extends VetproviehElement {
  private _width: string = "300px";
  private _orientation: string = "left";
  private _content : String = "";

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

  static blablabalTest(): string {
    return "hello";
  }


  /**
   * Default-Constructor
   */
  constructor() {
    super(true,false);
    this._content = this.innerHTML;
  }


  render() {
    super.render();
    this._addListener();
  }
  
  /**
   * PUBLIC
   * Getter for Width of the Popup-Menu
   * @return {string}
   */
  get width() {
    return this._width;
  }

  /**
   * PUBLIC
   * Setter for Widh of the Popup-Menu
   * @param {string} val
   */
  set width(val) {
    if (val !== this.width) {
      this._width = val;
    }
  }

  /**
   * PUBLIC
   * Getter for Orientation of the Popup-Menu
   * @return {string}
   */
  get orientation() {
    return this._orientation;
  }

  /**
   * PUBLIC
   * Setter for Orientation of the Popup-Menu
   * @param {string} val
   */
  set orientation(val) {
    const included = VetproviehSidemenu.orientations.includes(val);
    if (val !== this.orientation && included) {
      this._orientation = val;
    }
  }

  /**
   * PUBLIC
   * Menü öffnen/schließen
   */
  public toggleMenu() {
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
  private _addListener() {
    this.addEventListener('toggle', this.toggleMenu);
    const element = this.getByIdFromShadowRoot('body-overlay') as HTMLElement;
    element.addEventListener('click', () => this.toggleMenu());
  }
}
