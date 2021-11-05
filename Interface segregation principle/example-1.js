// Definition :
// No client should be forced to depend on methods it does not use

// Problem statement :
// Say we want to make a 3 in 1 printer that can be used as a scanner , fax and printer. How will you go about designing such structure?

// Bad Approach :
// As the principle states interfaces should be seperated but unfortunately Javascript doens't have interfaces so we will wrap around it as we will see. First we need to make a Machine class interface that has abstract methods to print , fax and printer

class Machine {
    constructor() {
        if (this.constructor.name === "Machine")
            throw new Error("Machine is abstract!");
    }

    print(doc) {}
    fax(doc) {}
    scan(doc) {}
}

// now the user wants a 3 in 1 printer let's define it as follows

class MultiFunctionPrinter extends Machine {
    print(doc) {
        //
    }

    fax(doc) {
        //
    }

    scan(doc) {
        //
    }
}

class NotImplementedError extends Error {
    constructor(name) {
        let msg = `${name} is not implemented!`;
        super(msg);
        // maintain proper stack trace
        if (Error.captureStackTrace)
            Error.captureStackTrace(this, NotImplementedError);
        // your custom stuff here :)
    }
}

// seems ok but what if another use wants to have a printer that only prints , bear in mind classes that inherets from interfaces must implement the abstract methods ok we can do some thing like that

class OldFashionedPrinter extends Machine {
    print(doc) {
        // ok
    }

    // omitting this is the same as no-op impl

    // fax(doc) {
    //   // do nothing
    // }

    scan(doc) {
        // throw new Error('not implemented!');
        throw new NotImplementedError("OldFashionedPrinter.scan");
    }
}

// Better Approach :
// A better approach is to make an interface for each functionality

class Printer {
    constructor() {
        if (this.constructor.name === "Printer")
            throw new Error("Printer is abstract!");
    }

    print() {}
}

class Scanner {
    constructor() {
        if (this.constructor.name === "Scanner")
            throw new Error("Scanner is abstract!");
    }

    scan() {}
}

var aggregation = (baseClass, ...mixins) => {
    class base extends baseClass {
        constructor(...args) {
            super(...args);
            mixins.forEach((mixin) => {
                copyProps(this, new mixin());
            });
        }
    }
    let copyProps = (target, source) => {
        // this function copies all properties and symbols, filtering out some special ones
        Object.getOwnPropertyNames(source)
            .concat(Object.getOwnPropertySymbols(source))
            .forEach((prop) => {
                if (
                    !prop.match(
                        /^(?:constructor|prototype|arguments|caller|name|bind|call|apply|toString|length)$/
                    )
                )
                    Object.defineProperty(
                        target,
                        prop,
                        Object.getOwnPropertyDescriptor(source, prop)
                    );
            });
    };
    mixins.forEach((mixin) => {
        // outside constructor() to allow aggregation(A,B,C).staticFunction() to be called etc.
        copyProps(base.prototype, mixin.prototype);
        copyProps(base, mixin);
    });
    return base;
};

// now you can make multi functioning printer as follows

class Photocopier extends aggregation(Printer, Scanner) {
    print() {
        // IDE won't help you here
    }

    scan() {
        //
    }
}

// we don't allow this!
// let m = new Machine();

let printer = new OldFashionedPrinter();
printer.fax(); // nothing happens
//printer.scan();

// Unfortunately Javascript doesn't support multible inhertance so we use outside help by this aggregation function its implementation is provided in the files.
