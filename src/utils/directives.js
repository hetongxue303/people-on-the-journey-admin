export const directives = (app) => {
    deleteElementDirective(app)
}

/**
 * 删除元素指令
 */
const deleteElementDirective = (app) => {
    app.directive('delEl', {
        mounted(el, binding) {
            const {value} = binding
            if (value) el.parentNode?.removeChild(el)
        }
    })
}
