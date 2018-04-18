import Load from './load.js'

const components = [
    Load
]


const install = function (Vue, opts = {}) {

    components.map(component => {
      Vue.component(component.name, component);
    });

    // Vue.component(Load.name, Load)

    // Vue.use(Loading.directive);


    // Vue.prototype.$loading = Loading;
};

if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
    console.log(41234)
}

export default Load 