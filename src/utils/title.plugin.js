import localizeFilter from '@/filtres/localize.js'

export default {
    install(Vue) {
        Vue.prototype.$title = function(titlerKey) {
            const appName = process.env.VUE_APP_TITLE
            return `${localizeFilter(titlerKey)} | ${appName} `
        }
    }
}