// Definition :
// Software entities should be open for extension, but closed for modification.

// Problem statement :
// Say we need to make class Product which have some proprities of the poduct like its name , color and size. We also need to make a filter to filter these products by size , color , name or combination of the three.

// Abstraction :
// Make a Product class with the dfined proprities
// Make a Filter to filter the products by a certain criteria

// Bad Approach :
// Again an easy problem that you will try to complicate it huh . First we will make a class Product and assign the needed proprities to it
class Product {
    constructor(name, color, size) {
        this.name = name;
        this.color = color;
        this.size = size;
    }
}

// now to the filter part, We also make a filter class to filter at first by color
class ProductFilter {
    byColor(products, color) {
        return products.filter((p) => p.color === color);
    }
}

// so far so good now what if after a while of launching this code to the production we wanted to add another filtring criteria such as filtering by size, note that this class was already tested and launched and it's all good. we will go to the ProducFilter class and modify it to add a filter by size method
class ProductFilter {
    byColor(products, color) {
        return products.filter((p) => product.color === color);
    }
    bySize(products, size) {
        return products.filter((p) => product.size === size);
    }
}

// again after a while the client wanted to add another filtering criteria which is filtering by both color and size.
class ProductFilter {
    byColor(products, color) {
        return products.filter((product) => product.color === color);
    }
    bySize(products, size) {
        return products.filter((product) => product.size === size);
    }
    bySizeAndColor(products, size, color) {
        return products.filter((p) => p.size === size && p.color === color);
    }
}

let apple = new Product("Apple", "green", "small");
let tree = new Product("Tree", "green", "large");
let house = new Product("House", "blue", "large");

let products = [apple, tree, house];

let pf = new ProductFilter();
for (let p of pf.bySize(products, "large"))
    console.log(` * ${p.name} is green`);

// and after a while the client want to add another proprity to the product and filter by it. I guess you can see where this is going, we contniously modifying an already tested production ready class ,which is not a good thing to do, and now this class is exploded (state space explosion)with methods and each time we want to add another filtering criteria you go and modify and test it again and so on..

// Better Approach :
// We will create the product class no problem like the previous approach

class Product {
    constructor(name, color, size) {
        this.name = name;
        this.color = color;
        this.size = size;
    }
}

class ColorFilter {
    constructor(color) {
        this.criteria = color;
    }
    isOk(item) {
        return item.color === this.criteria;
    }
}
class SizeFilter {
    constructor(size) {
        this.criteria = size;
    }
    isOk(item) {
        return item.size === this.criteria;
    }
}
class AndFilter {
    constructor(...filters) {
        this.criterias = filters;
    }
    isOk(item) {
        return this.criterias.every((f) => f.isOk(item));
    }
}
class ProductFilter {
    filter(products, xFilter) {
        return products.filter((p) => xFilter.isOk(p));
    }
}

const pf = new ProductFilter();
let apple = new Product("Apple", "green", "small");
let tree = new Product("Tree", "green", "large");
let house = new Product("House", "blue", "large");

let products = [apple, tree, house];
console.log(`Only green \n`);

const filterByGreen = new ColorFilter("green");
const filteredProducts = pf.filter(products, filterByGreen);
for (let p of filteredProducts) {
    console.log(`# ${p.name} is green`);
}

console.log(`\n green and large \n`);
for (let p of pf.filter(
    products,
    new AndFilter(new ColorFilter("green"), new SizeFilter("large"))
)) {
    console.log(`# ${p.name} is green and large`);
}
