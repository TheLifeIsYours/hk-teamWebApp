class TLIY_Component {
    constructor(name, parent, path) {
        this.name = name;
        this.parent = parent;
        this.path = path;

        this.init();

        return this;
    }

    async init() {
        this.component = document.createElement('div');

        this.component.innerHTML = await this.getComponent(this.path);

        this.parent.appendChild(this.component);
    }

    getComponent(_path) {
        return new Promise((resolve, reject) => {
            let http = new XMLHttpRequest();

            http.addEventListener('load', (event) => {
                return resolve(http.responseText);
            });

            http.open('GET', _path);

            http.send();
        });
    }
}

class TLIYClient {
    constructor() {
     this.components = [];
     this.storage = window.localStorage.getItem('hk-teamWebapp');

     this.init();
    }

    init() {
        if(this.storage == null) {
            window.localStorage.setItem('hk-teamWebapp', JSON.stringify({"arbeidsoppgave": [], "teammedlem": [], "tildeling": []}));
            window.localStorage.getItem('hk-teamWebapp');
        }
    }

    addComponent(_name, _parent, _path) {
        console.log(_parent);
        let component = new TLIY_Component(_name, _parent, _path);
        this.components.push(component);
        return component;
    }
}