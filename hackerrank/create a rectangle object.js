class Rectangle {
    constructor (a, b) {
        this.length = a;
        this.width = b;
        this.perimeter = 2 * (a + b);
        this.area = a * b;
    }

}
const rec = new Rectangle(2, 3);
console.log(rec);