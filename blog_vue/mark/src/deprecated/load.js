import Vue from 'Vue'
import Loading from './Loading.vue'

let LoadConstructor = Vue.extend(Loading);

let instance

LoadConstructor.prototype.close = function () {
    // console.log(this)
    this.mask = false;
}

const Load = function (options = {}) {
    // if (Vue.prototype.$isServer) return ;
    // options.onShowLoad = function () {
    //   Load.showLoad()
    // }
    // let onShowLoad = options.showLoad
    options = merge({}, defaults, options);
    
    let mask = options.mask

    Vue.nextTick(() => {
        instance.visible = true;
    });

    instance = new LoadConstructor({ data: options })

    instance.vm = instance.$mount();

    document.body.appendChild(instance.vm.$el);

    return instance;
}

export default Load