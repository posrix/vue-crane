/* eslint-disable */
const createReference = (el, binding, vnode) => {
  let bindElm = vnode.context.$refs[binding.arg]
  if (bindElm) {
    bindElm.$refs.reference = el
  }
}

export default {
  bind(el, binding, vnode) {
    createReference(el, binding, vnode)
  },
  inserted(el, binding, vnode) {
    createReference(el, binding, vnode)
  }
}
