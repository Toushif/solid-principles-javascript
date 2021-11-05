// https://softwareengineering.stackexchange.com/questions/103508/how-is-dependency-inversion-related-to-higher-order-functions

// Dependency Inversion in OOP means that you code against an interface which is then provided by an implementation in an object.

// Languages that support higher language functions can often solve simple dependency inversion problems by passing behaviour as a function instead of an object which implements an interface in the OO-sense.

// In such languages, the function's signature can become the interface and a function is passed in instead of a traditional object to provide the desired behaviour. The hole in the middle pattern is a good example for this.