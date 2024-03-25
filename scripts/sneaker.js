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
    component.onRender();
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
  component.onRender();
};

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

export const asLocalStorage = (inital, name) => {
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