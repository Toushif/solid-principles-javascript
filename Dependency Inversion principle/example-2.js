// https://hackernoon.com/understanding-solid-principles-in-javascript-w1cx3yrv

// The Dependency Inversion Principle (DIP) tells us that the most flexible systems are those in which source code dependencies refer only to abstractions, not to concretions. Rather, details should depend on policies.

// Looking at a real-life example
// You can consider the real-life example of a TV remote battery. Your remote needs a battery but it’s not dependent on the battery brand. You can use any XYZ brand that you want and it will work. So we can say that the TV remote is loosely coupled with the brand name. Dependency Inversion makes your code more reusable.

// How to implement the DIP in JavaScript?
// In a statically typed language, like Java, this means that the use, import, and include statements should refer only to source modules containing interfaces, abstract classes, or some other kind of abstract declaration. Nothing concrete should be depended on. In case of JavaScript How we can implement the DIP?

// Let take a simple example to understand how we can do it easily.

// I want to contact the server for some data. Without applying DIP, this might look like as follows.

$.get("/address/to/data", function(data) {
    $('#thingy1').text(data.property1)
    $('#thingy2').text(data.property2)
})
// With DIP, I might instead write code like.

fillFromServer("/address/to/data", thingyView)

// Where the abstraction fillFromServer function can for the particular case where we want to use jQuery's Ajax be implemented as follows.

function fillFromServer(url, view) {
    $.get(url, function(data) {
        view.setValues(data)
    })
}

// The abstraction view can be implemented for the particular case of a view based on elements with IDs thingy1 and thingy2 as follows.

var thingyView = {
    setValues: function(data) {
        $('#thingy1').text(data.property1)
        $('#thingy2').text(data.property2)
    }
}