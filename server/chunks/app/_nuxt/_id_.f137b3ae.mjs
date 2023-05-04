import { d as useRoute, e as useRuntimeConfig } from '../server.mjs';
import { defineComponent, withAsyncContext, unref, useSSRContext, computed, reactive } from 'vue';
import { hash } from 'ohash';
import { a as useAsyncData } from './asyncData.d6078788.mjs';
import { ssrRenderAttrs, ssrRenderAttr, ssrInterpolate } from 'vue/server-renderer';
import 'ofetch';
import 'hookable';
import 'unctx';
import 'ufo';
import 'h3';
import '@unhead/vue';
import '@unhead/dom';
import 'vue-router';
import 'defu';
import '../../nitro/node-server.mjs';
import 'node-fetch-native/polyfill';
import 'http';
import 'https';
import 'destr';
import 'unenv/runtime/fetch/index';
import 'scule';
import 'unstorage';
import 'radix3';
import 'node:fs';
import 'node:url';
import 'pathe';

function useFetch(request, arg1, arg2) {
  const [opts = {}, autoKey] = typeof arg1 === "string" ? [{}, arg1] : [arg1, arg2];
  const _key = opts.key || hash([autoKey, unref(opts.baseURL), typeof request === "string" ? request : "", unref(opts.params)]);
  if (!_key || typeof _key !== "string") {
    throw new TypeError("[nuxt] [useFetch] key must be a string: " + _key);
  }
  if (!request) {
    throw new Error("[nuxt] [useFetch] request is missing.");
  }
  const key = _key === autoKey ? "$f" + _key : _key;
  const _request = computed(() => {
    let r = request;
    if (typeof r === "function") {
      r = r();
    }
    return unref(r);
  });
  const {
    server,
    lazy,
    default: defaultFn,
    transform,
    pick,
    watch,
    immediate,
    ...fetchOptions
  } = opts;
  const _fetchOptions = reactive({
    ...fetchOptions,
    cache: typeof opts.cache === "boolean" ? void 0 : opts.cache
  });
  const _asyncDataOptions = {
    server,
    lazy,
    default: defaultFn,
    transform,
    pick,
    immediate,
    watch: [
      _fetchOptions,
      _request,
      ...watch || []
    ]
  };
  let controller;
  const asyncData = useAsyncData(key, () => {
    var _a;
    (_a = controller == null ? void 0 : controller.abort) == null ? void 0 : _a.call(controller);
    controller = typeof AbortController !== "undefined" ? new AbortController() : {};
    return $fetch(_request.value, { signal: controller.signal, ..._fetchOptions });
  }, _asyncDataOptions);
  return asyncData;
}
function useLazyFetch(request, arg1, arg2) {
  const [opts, autoKey] = typeof arg1 === "string" ? [{}, arg1] : [arg1, arg2];
  return useFetch(
    request,
    {
      ...opts,
      lazy: true
    },
    autoKey
  );
}
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "[id]",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const route = useRoute();
    const config = useRuntimeConfig();
    const pokemonId = route.params.id;
    const { pending, data: pokemon } = ([__temp, __restore] = withAsyncContext(() => useLazyFetch(
      `${config.public.API_BASE_URL}/pokemon/${pokemonId}`,
      "$YL19P83ara"
    )), __temp = await __temp, __restore(), __temp);
    return (_ctx, _push, _parent, _attrs) => {
      if (unref(pending)) {
        _push(`<div${ssrRenderAttrs(_attrs)}>Loading ...</div>`);
      } else {
        _push(`<div${ssrRenderAttrs(_attrs)}>`);
        if (unref(pokemon)) {
          _push(`<div class="detail-container"><div class="pokemon"><img class="pokemon__image"${ssrRenderAttr("src", unref(pokemon).image)}${ssrRenderAttr("alt", unref(pokemon).name)}><div class="pokemon__sound"></div><section class="pokemon__detail"><section class="pokemon__description"><div><h1 class="pokemon__name">${ssrInterpolate(unref(pokemon).name)}</h1><span class="pokemon__types">${ssrInterpolate(unref(pokemon).types.join(", "))}</span></div></section><section class="pokemon__stats"><div class="pokemon__stat"><div class="bar bar-top"></div><span class="stat">CP: ${ssrInterpolate(unref(pokemon).maxCP)}</span></div><div class="pokemon__stat"><div class="bar bar-bottom"></div><span class="stat">HP: ${ssrInterpolate(unref(pokemon).maxHP)}</span></div></section><section class="pokemon__features"><div class="pokemon__feature"><span class="feature__title">Weight</span><span>${ssrInterpolate(unref(pokemon).weight.maximum)} - ${ssrInterpolate(unref(pokemon).weight.minimum)}</span></div><div class="pokemon__feature"><span class="feature__title">Height</span><span>${ssrInterpolate(unref(pokemon).height.maximum)} - ${ssrInterpolate(unref(pokemon).height.minimum)}</span></div></section></section></div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      }
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/pokemon/[id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=_id_.f137b3ae.mjs.map
