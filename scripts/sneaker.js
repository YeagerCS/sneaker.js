import InputBind from "./models/InputBind.js";

const PATH_PREFIX = "src/components/";

const fetchComponent = async (component, callback) => {
  const path = `${PATH_PREFIX}${component.replace(".html", "")}/`;
  const response = await fetch(path + component);
  if (response.status === 200) {
    const result = await response.text();
    callback(result);
  }
};

export const initialRender = async (Component, parent) => {
  const component = new Component();

  const app = document.getElementById(parent);

  await fetchComponent("App.html", (html) => {
    const htmlComponent = document.createElement("div");
    htmlComponent.innerHTML = html;

    app.appendChild(htmlComponent);
    component.init();
  });
};

export const initHtml = async (component) => {
  const response = await fetch(
    PATH_PREFIX + `${component.replace(".html", "")}/${component}`
  );

  const result = await response.text();
  return result;
};

export const initRender = (html, parent) => {
  document.getElementById(parent).innerHTML = html;
};

export const render = async (Component, parent) => {
  const component = new Component();
  const html = await initHtml(component.name);
  initRender(html, parent);
  setTitle(component.title)
  component.init();
};

const setTitle = (title) => {
  if(title){
    document.title = title;
  }
}

export const initCss = async (script) => {
  const response = await fetch(
    PATH_PREFIX + `${script.replace(".css", "")}/${script}`
  );

  const css = await response.text();
  const style = document.createElement("style");
  style.textContent = css;
  document.head.appendChild(style);
};

export const DOMLoaded = (init) => {
  document.addEventListener("DOMContentLoaded", () => {
    setTimeout(async () => {
      await init();
    }, 200);
  });
};

export const bindButton = (button, action) => {
  document.getElementById(button).addEventListener("click", action);
};

export const setInput = (inputBind) => {
  const elem = document.getElementById(inputBind.elem);
  elem.onkeyup = () => {
    inputBind.value = elem.value;
  };
};

export const enableRoutes = (routes) => {
    document.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', e => {
          e.preventDefault();
  
          const href = link.getAttribute('href');
  
          history.pushState(null, null, href);
  
          routes();
        });
    });
}

export const emit = (e, data) => {
  const newEvent = new CustomEvent(e, { detail: data });
  window.dispatchEvent(newEvent)
}

export const receive = (e, action) => {
  window.addEventListener(e, action);
}

export const populateTable = (table, tableData, action = null) => {
  const tableBody = document.querySelector(`#${table} tbody`)
        
  tableBody.innerHTML = "";

  tableData && tableData.forEach(data => {
      const row = document.createElement("tr")

      if(action){
        row.addEventListener("click", () => {
          action(data)
        })
      }

      Object.keys(data).forEach(key => {
          const cell = document.createElement("td")
          cell.textContent = data[key]
          row.appendChild(cell)
      })

      tableBody.appendChild(row)
  })
}

export const uuid = () => {
  const hex = "abcdef0123456789"
  const pattern = [8, 4, 4, 4, 12];
  let uuid = ""

  pattern.forEach((length, index) => {
    for(let i = 0; i <length; i++){
      uuid += hex[Math.floor(Math.random() * hex.length)]
    }

    if(index < pattern.length - 1){
      uuid += "-"
    }
  })

  return uuid;
}

export const asLocalStorage = (inital, name = uuid()) => {
  let data = JSON.parse(localStorage.getItem(name)) || inital;

  const handler = {
    get: (target, prop) => {
      return target[prop]
    },

    set: (target, prop, value) => {
      target[prop] = value;

      localStorage.setItem(name, JSON.stringify(target))
      return true;
    },

    apply: (target, thisArg, args) => {
      const result = target.apply(thisArg, args)
      localStorage.setItem(name, JSON.stringify(target))
      return result;
    }
  }

  const proxy = new Proxy(data, handler)
  return proxy;
}

export const renderEach = (arrayObj, attach, inElem, elem = "div", action = null) => {
  const attachToElem = document.getElementById(attach)
  arrayObj && arrayObj.forEach((obj) => {
    const element = document.createElement(inElem)

    if(action){
      element.addEventListener("click", () => {
        action(obj)
      })
    }

    Object.keys(data).forEach(key => {
      const cell = document.createElement(elem)
      cell.textContent = data[key]
      element.appendChild(cell)
    })

    attachToElem.appendChild(element)
  })
}

export const bindInputs = (object) => {
  Object.keys(object).forEach(key => {
    object[key] = new InputBind(key)
  })
}

// Maps keys in objects which are InputBind instances to the values of the input bind
export const values = (object) => {
  return Object.keys(object).reduce((valueObject, key) => {
    const inputBind = object[key]
    valueObject[key] = inputBind.value;
    return valueObject;
  }, {})
}

export const validate = (inputObj, 
  pwRegex = /^(?=.[a-z])(?=.[A-Z])(?=.\d)(?=.[@$!%?&])[A-Za-z\d@$!%?&]{8,}$/g,
  pwKey = "password", emailKey = "email"
  ) => {
  Object.keys(inputObj).forEach(key => {
    if(!inputObj[key]){
      return false;
    }

    if(key === pwKey){
      if(!inputObj[key].match(pwRegex)){
        return false;
      }
    }

    if(key === emailKey){
      const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
      if(!inputObj[key].match(emailRegex)){
        return false;
      }
    }
  })

  return true;
}

export const applyStyles = (...styles) => {
  let styleString = "";

  for(let val of styles){
    styleString += `${val}${val.endsWith(";") ? "" : ";"}\n`;
  }
  return styleString;
}