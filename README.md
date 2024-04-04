# Documentation

## Table of Contents
- [What is sneaker.js](#sneakerjs)
- [How to run](#how-to-run)
- [Components](#components)
- [Rendering Components](#rendering-components)
- [Routing](#routing)
- [Form Input](#form-input)
- [Button Clicks](#button-clicks)
- [Emitting Data](#emitting-data)
- [Display Table Data](#display-table-data)
- [asLocalStorage](#aslocalstorage)


## <p id="sneakerjs">What is sneaker.js</p>
Sneaker.js is a JavaScript library which inspires features from JavaScript frameworks like React or Angular. It's a light-weight vanilla JavaScript library which allows the use of things like rendering multiple components or routing. The use of the library is very easy and the main features are documented. Each component is a class, which gives it a similar feeling to Angular but it still just is vanilla js. The routing is handled with an express server, which serves the index.html file on any route making it a Single Page Application (SPA).

## How to run
1. Clone this repository  
   `git clone https://github.com/YeagerCS/sneaker.js.git`
2. Run
   ```
   npm i
   npm start
   ```
3. Go to http://127.0.0.1:3000 (or your env port)

## Components
To start editting the application, you can go to `src/components/App/App` and modify the routes. In order to have routes, you'll need to generate components.

- Generate components with `npm run gc Componentname`

This will create a component with a css, html and js file. The js file gets generated with it's base structure:

```js
import { initCss, render } from "../../../scripts/sneaker";
import TheComponent from "../../../scripts/models/Component";

class ComponentnameComponent extends TheComponent {
    constructor(){
        super();
    }

    name = "Componentname.html";

    async init(){
        await initCss("Componentname.css");
        // Your initialization logic
    }

    onRender(){
        this.init();
    }
}

export { ComponentnameComponent };

```
Lets break it down:
- ```js
  class ComponentnameComponent extends TheComponent
  ```
  This is the class that you will use as your component. Every component extends from the TheComponent class which requires this base structure.
- `constructor()`: The super constructor needs to be called in order to bind the methods to 'this'. So for any component, leave the super() call.
- The `name` is simply the name of the html file of the component.
- `async init()`: Use this method to write any logic that should happen at initialization. That might include:
  - Rendering Components
  - Binding Buttons
  - Binding Input
  - Initializing the Css file (is generated)
  - etc.
- `onRender()` gets called when the component renders. You don't need to modify that method.

## Rendering Components
You can render components inside of other components. Here's how:
Let's take an example. Imagine you have a dashboard and you want a form and a table in that dashboard.

Dashboard.html
```html
<div class="dashboard">
  <div id="form"></div>
  <div id="table"></div>
</div>
```
The elements in which you want to render, require an id. You use the elements `id` to render in the element. Now lets say you have your FormComponent and TableComponent:  
`npm run gc Form`    
`npm run gc Table`

Form.snk
```js
class FormComponent extends TheComponent {
  // Default structure
}
```

Form.html   
```html
<p>Form Html</p>
```

Table.snk
```js
class TableComponent extends TheComponent {
  // Default structure
}
```

Table.html  
```html
<p>Table Html</p>
```


Once you have those components, you want to render them in the DashboardComponent. For that, go to Dashboard.snk:

Dashboard.snk
```js
import { initCss, render } from "../../../scripts/sneaker";
import { FormComponent } from "../Form/Form";
import { TableComponent } from "../Table/Table";

...
// In the init method
async init(){
  await initCss("Dashboard.css")

  await render(FormComponent, "form")
  await render(TableComponent, "table")
}
```
This will render the FormComponent in the 'form' div and the TableComponent in the 'table' div.  
You successfully rendered two components inside another! Now you just have to display that dashboard on your site. In order for that to work, you'll need to configure your Dashboard with [Routing](#routing).



## Routing
The router is placed in `App.snk` and you need to configure your routes there. The default structure of the AppComponent is as follows:

```js
// imports
class AppComponent extends TheComponent{
    constructor(){
        super()
    }

    name = "App.html";

    async init(){
        await initCss("App.css")

        this.routes();
    }

    onRender(){
        this.init()
        enableRoutes(this.routes)
    }

    async routes(){
        const path = window.location.pathname;

        const routes = {
            "/": WelcomeComponent
        }
          
        await render(routes[path] ?? NotFoundComponent, "router")
    }
}
export { AppComponent }
```
You'll only need to consider the `routes()` method. Lets display the Dashboard at the '/dashboard' route.

```js
 async routes(){
        const path = window.location.pathname;

        const routes = {
            "/": WelcomeComponent,
            "/dashboard": DashboardComponent
        }
          
        await render(routes[path] ?? NotFoundComponent, "router")
    }
```
By simply adding the route "/dashboard" with the value of the component, the given component is rendered dependent on the route. If the route that you're trying to access is undefined, on default the NotFoundComponent will be rendered. Replace that with any component you want.  
Great! Now you're rendering the Dashboard on the page. You're still missing some logic though. Learn how to handle inputs in a form [Here](#form-input)


## Form Input
Lets go and accept input from our form. For that, go to Form.snk. Lets say we have to input a name and an email.

Form.html
```html
<input type="name" id="name" name="name" required>
<input type="email" id="email" name="email" required>
```

Form.snk
```js
import InputBind from "../../../scripts/models/InputBind";
// Other imports

class FormComponent extends TheComponent {
  constructor(){
    super()
  }

  // ...
  // Set your input variables
  nameInput;
  emailInput;

  async init(){
    // ...
    this.nameInput = new InputBind("name")
    this.emailInput = new InputBind("email")
  }
  // ...
}
```
Now the variables nameInput and emailInput are bound to the element with the given id. In order to access the value of the inputs, you'll need to access `this.nameInput.value` and `this.emailInput.value`.
You have bound your input, now lets print the input on [click of a button](#button-clicks) to check.


## Button Clicks
Button clicks can be configured quite easily. Lets take the form again and add a button with the id 'btn':

Form.html
```html
<input type="name" id="name" name="name" required>
<input type="email" id="email" name="email" required>
<button id="btn">Submit</button>
```
We know want to bind that button to an action. Lets say we just want to console.log or inputs. Here's how you can do it:

Form.snk
```js
import { bindButton, ... } from "../../../scripts/sneaker";

// ...

submitForm(e){
  e.preventDefault()
  console.log(this.nameInput.value + " " + this.emailInput.value)
}

async init(){
  // ...
  this.nameInput = new InputBind("name")
  this.emailInput = new InputBind("email")
  bindButton("btn", submitForm)
}
```
Now when the button is pressed, the method 'submitForm' will get executed.  
Instead of logging to the console, lets try and [display our added person in the TableComponent](#emitting-data).

## Emitting Data
You can emit data as an event in order to access it in another component. Let's say we want to emit the person with name and email and receive it within the TableComponent.

Form.snk
```js
import { bindButton, emit, ... } from "../../../scripts/sneaker";

// ...

submitForm(e){
  e.preventDefault()

  emit("emitEventName", {
    name: this.nameInput.value,
    email: this.emailInput.value
  })
}

// ...
```
Now it emitted the object under the name 'emitEventName'. In the table component, you can receive it.

Table.snk
```js
import { receive, ... } from "../../../scripts/sneaker";

// ...
tableData = [];

async init() {
  receive("emitEventName", (e) => {
    const data = e.detail;

    this.tableData.push(data)
    console.log(tableData)
  })
}
```
Now we receive the data in our TableComponent. Only thing that's missing is to [display the data in the table](#display-table-data).

## Display table data
For this to work properly, you'll need to have a table structure like this:

Table.html
```html
<table id="table">
    <thead>
      <tr>
        <th>Name</th>
        <th>Email</th>
      </tr>
    </thead>
    <tbody>

    </tbody>
</table>
```
Define the headers that you need, but leave the tbody blank. Here's how you display the data:

Table.snk
```js
import { receive, populateTable, ... } from "../../../scripts/sneaker";

// ...
tableData = [];

updateTable(){
  populateTable("table", this.tableData)
}

async init() {
  this.updateTable()

  receive("emitEventName", (e) => {
    const data = e.detail;

    this.tableData.push(data)
    this.updateTable()
  })
}

// ...
```
Just like that you are displaying the data that gets emitted into the table. If you want to store the added data, you can define your data [asLocalStorage](#aslocalstorage), which will store and load the data out of localStorage.

## asLocalStorage
Serialize your 'tableData' in localStorage with one simple change:

Table.snk
```js
import { asLocalStorage, populateTable, ... } from "../../../scripts/sneaker";

// ...

tableData = asLocalStorage([], "uniqueIdentifier")

updateTable(){
  populateTable("table", this.tableData)
}

// ...
```
The first parameter is the inital value for the variable, which is just an empty array here and the second parameter requires a unique identifier with which it is saved in localstorage. Just like that your data persists between sessions locally.

## Conclusion
That is the first documentation of sneaker.js and might be expanded upon in the future.
