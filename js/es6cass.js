// Class
class Options {
    constructor(height, width, bg, fontSize, textAlign){
        this.height = height;
        this.width = width;
        this.bg = bg;
        this.fontSize = fontSize;
        this.textAlign = textAlign;
    }
    newDiv(text, style) {
        let div = document.createElement('div');
        div.innerText = text;
        div.style.cssText = style;

        let testDivCont = document.querySelectorAll('.description-text')[0];
        testDivCont.appendChild(div);
    }
}

let newObj = new Options();
newObj.newDiv("тестовый текст", 'color: red; font-size: 20px;');