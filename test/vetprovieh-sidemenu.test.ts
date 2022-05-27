import {VetproviehSidemenu} from '../lib/vetprovieh-sidemenu';

describe('constructor', () => {
    test("default values", () => {
        const menu: VetproviehSidemenu = new VetproviehSidemenu();

        expect(menu.width).toBe("300px");
        expect(menu.orientation).toBe("left");
    });

    test("default values", () => {
        const div = document.createElement("div");
        div.innerHTML = "<vetprovieh-sidemenu><template><p>hello</p></template></vetprovieh-sidemenu>"
        const menu:VetproviehSidemenu = div.getElementsByTagName("vetprovieh-sidemenu")[0] as VetproviehSidemenu;

        expect(menu["_content"]).toEqual("<p>hello</p>")

    });

});


describe('observedAttributes', () => {
    test("return expected values", () => {
        const values = VetproviehSidemenu.observedAttributes;
        const expected = ["width", "orientation"];
        expect(values).toEqual(expected);
    });
});


describe('menuTemplate', () => {
    test("should return something in menu template", () => {
        const template = new VetproviehSidemenu().template;

        expect(template).not.toEqual(undefined);
    });
});

describe('connectedCallback', () => {
    test("should add shadow root with content", () => {
        const menu = new VetproviehSidemenu();
        menu["_content"] = "<p>test</p>";
        menu.connectedCallback();
        expect(menu.shadowRoot).not.toEqual(undefined)

    });
    test("default values", () => {

    });
});

describe('width', () => {
    test("set width should work as expected", () => {
        const menu = new VetproviehSidemenu();
        const expected: string = "400px";
        menu.width = expected;
        menu.width = expected;
        expect(menu.width).toEqual(expected)
    });
});


describe('orientation', () => {
    test("set orientation should work as expected", () => {
        const menu = new VetproviehSidemenu();
        const expected: string = "right";
        menu.orientation = expected;

        expect(menu.orientation).toEqual(expected);
    });

    test("should not allow not accepted values",  () => {
        const menu = new VetproviehSidemenu();
        const wrongValue: string = "wrongValue";
        menu.orientation = wrongValue;

        expect(menu.orientation).toEqual("left");
    })
});

describe('toggleMenu', () => {
    test("should open and close menu", () => {
        const menu = new VetproviehSidemenu();
        menu.connectedCallback();
        const shadowRoot = menu.shadowRoot as ShadowRoot;
        const menuElement: HTMLElement = shadowRoot.getElementById('menu') as HTMLElement;

        expect(menuElement.classList.contains('open')).toEqual(false)

        menu.toggleMenu();

        expect(menuElement.classList.contains('open')).toEqual(true)

        menu.toggleMenu();

        expect(menuElement.classList.contains('open')).toEqual(false)
    });
});
