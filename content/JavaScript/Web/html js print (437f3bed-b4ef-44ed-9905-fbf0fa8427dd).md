# Hello World in JavaScript #

A simple "Hello, World!" program is often used as a first example when learning a new programming language. Here's how to create and run a "Hello, World!" program in JavaScript.

## Basic Console Output ##

The simplest way to output "Hello, World!" in JavaScript is by using the `console.log()` function:

```javascript
console.log('Hello, World!');
```

This code will print "Hello, World!" to the console.

## Using JavaScript in HTML ##

To run JavaScript in a web browser, you can include it in an HTML file:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Hello World</title>
  </head>
  <body>
    <script>
      console.log('Hello, World!');
    </script>
  </body>
</html>
```

Save this as an HTML file and open it in a web browser. You can view the output in the browser's developer console.

## Displaying in the Browser ##

To display the message on the web page itself, you can modify the HTML content:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Hello World</title>
  </head>
  <body>
    <h1 id="greeting"></h1>
    <script>
      document.getElementById('greeting').textContent = 'Hello, World!';
    </script>
  </body>
</html>
```

This will display "Hello, World!" as a heading on the web page.

## Using an External JavaScript File ##

For better organization, you can separate your JavaScript code into an external file:

1. Create a file named `script.js` with the following content:

   ```javascript
   function displayGreeting() {
     document.getElementById('greeting').textContent = 'Hello, World!';
   }
   
   displayGreeting();
   ```

2. Update your HTML file to reference the external script:

   ```html
   <!DOCTYPE html>
   <html lang="en">
     <head>
       <meta charset="UTF-8" />
       <meta name="viewport" content="width=device-width, initial-scale=1.0" />
       <title>Hello World</title>
     </head>
     <body>
       <h1 id="greeting"></h1>
       <script src="script.js"></script>
     </body>
   </html>
   ```

This approach allows for better code organization and reusability.
