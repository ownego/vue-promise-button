import { defineComponent, ref, computed, openBlock, createElementBlock, normalizeClass, withModifiers, renderSlot, createElementVNode, createCommentVNode, withDirectives, vShow } from "vue";
var PromiseButton_vue_vue_type_style_index_0_lang = "";
const _hoisted_1 = ["disabled"];
const _hoisted_2 = { key: 0 };
const _hoisted_3 = {
  class: "promise-button-spinner",
  role: "status"
};
const _sfc_main = defineComponent({
  __name: "PromiseButton",
  props: {
    promise: {},
    autoHide: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    forceProcessing: { type: Boolean, default: false }
  },
  setup(__props, { expose: __expose }) {
    const props = __props;
    const isProcessing = ref(false);
    const isShowText = computed(() => {
      if (isProcessing.value || props.forceProcessing) {
        return !props.autoHide;
      }
      return true;
    });
    const handle = () => {
      if (!isProcessing.value) {
        isProcessing.value = true;
        props.promise().catch((e) => {
          isProcessing.value = false;
          throw e;
        }).finally(() => {
          isProcessing.value = false;
        });
      }
    };
    __expose({
      handle,
      isShowText
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("button", {
        class: normalizeClass(["promise-button", { "promise-button--notext": !isShowText.value }]),
        type: "button",
        onClick: withModifiers(handle, ["stop"]),
        disabled: _ctx.disabled
      }, [
        isShowText.value ? (openBlock(), createElementBlock("span", _hoisted_2, [
          renderSlot(_ctx.$slots, "default", {}, () => [
            _cache[0] || (_cache[0] = createElementVNode("span", { class: "promise-button-text" }, null, -1))
          ])
        ])) : createCommentVNode("", true),
        renderSlot(_ctx.$slots, "spinner", {}, () => [
          withDirectives(createElementVNode("span", _hoisted_3, _cache[1] || (_cache[1] = [
            createElementVNode("span", { class: "promise-button-visually-hidden" }, "Loading...", -1)
          ]), 512), [
            [vShow, isProcessing.value || _ctx.forceProcessing]
          ])
        ])
      ], 10, _hoisted_1);
    };
  }
});
export { _sfc_main as PromiseButton };
