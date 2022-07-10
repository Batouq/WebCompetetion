
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
var app = (function () {
    'use strict';

    function noop() { }
    function add_location(element, file, line, column, char) {
        element.__svelte_meta = {
            loc: { file, line, column, char }
        };
    }
    function run(fn) {
        return fn();
    }
    function blank_object() {
        return Object.create(null);
    }
    function run_all(fns) {
        fns.forEach(run);
    }
    function is_function(thing) {
        return typeof thing === 'function';
    }
    function safe_not_equal(a, b) {
        return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
    }
    let src_url_equal_anchor;
    function src_url_equal(element_src, url) {
        if (!src_url_equal_anchor) {
            src_url_equal_anchor = document.createElement('a');
        }
        src_url_equal_anchor.href = url;
        return element_src === src_url_equal_anchor.href;
    }
    function is_empty(obj) {
        return Object.keys(obj).length === 0;
    }
    function append(target, node) {
        target.appendChild(node);
    }
    function insert(target, node, anchor) {
        target.insertBefore(node, anchor || null);
    }
    function detach(node) {
        node.parentNode.removeChild(node);
    }
    function destroy_each(iterations, detaching) {
        for (let i = 0; i < iterations.length; i += 1) {
            if (iterations[i])
                iterations[i].d(detaching);
        }
    }
    function element(name) {
        return document.createElement(name);
    }
    function text(data) {
        return document.createTextNode(data);
    }
    function space() {
        return text(' ');
    }
    function listen(node, event, handler, options) {
        node.addEventListener(event, handler, options);
        return () => node.removeEventListener(event, handler, options);
    }
    function attr(node, attribute, value) {
        if (value == null)
            node.removeAttribute(attribute);
        else if (node.getAttribute(attribute) !== value)
            node.setAttribute(attribute, value);
    }
    function children(element) {
        return Array.from(element.childNodes);
    }
    function set_input_value(input, value) {
        input.value = value == null ? '' : value;
    }
    function set_style(node, key, value, important) {
        if (value === null) {
            node.style.removeProperty(key);
        }
        else {
            node.style.setProperty(key, value, important ? 'important' : '');
        }
    }
    function toggle_class(element, name, toggle) {
        element.classList[toggle ? 'add' : 'remove'](name);
    }
    function custom_event(type, detail, { bubbles = false, cancelable = false } = {}) {
        const e = document.createEvent('CustomEvent');
        e.initCustomEvent(type, bubbles, cancelable, detail);
        return e;
    }

    let current_component;
    function set_current_component(component) {
        current_component = component;
    }
    function get_current_component() {
        if (!current_component)
            throw new Error('Function called outside component initialization');
        return current_component;
    }
    function onMount(fn) {
        get_current_component().$$.on_mount.push(fn);
    }

    const dirty_components = [];
    const binding_callbacks = [];
    const render_callbacks = [];
    const flush_callbacks = [];
    const resolved_promise = Promise.resolve();
    let update_scheduled = false;
    function schedule_update() {
        if (!update_scheduled) {
            update_scheduled = true;
            resolved_promise.then(flush);
        }
    }
    function add_render_callback(fn) {
        render_callbacks.push(fn);
    }
    // flush() calls callbacks in this order:
    // 1. All beforeUpdate callbacks, in order: parents before children
    // 2. All bind:this callbacks, in reverse order: children before parents.
    // 3. All afterUpdate callbacks, in order: parents before children. EXCEPT
    //    for afterUpdates called during the initial onMount, which are called in
    //    reverse order: children before parents.
    // Since callbacks might update component values, which could trigger another
    // call to flush(), the following steps guard against this:
    // 1. During beforeUpdate, any updated components will be added to the
    //    dirty_components array and will cause a reentrant call to flush(). Because
    //    the flush index is kept outside the function, the reentrant call will pick
    //    up where the earlier call left off and go through all dirty components. The
    //    current_component value is saved and restored so that the reentrant call will
    //    not interfere with the "parent" flush() call.
    // 2. bind:this callbacks cannot trigger new flush() calls.
    // 3. During afterUpdate, any updated components will NOT have their afterUpdate
    //    callback called a second time; the seen_callbacks set, outside the flush()
    //    function, guarantees this behavior.
    const seen_callbacks = new Set();
    let flushidx = 0; // Do *not* move this inside the flush() function
    function flush() {
        const saved_component = current_component;
        do {
            // first, call beforeUpdate functions
            // and update components
            while (flushidx < dirty_components.length) {
                const component = dirty_components[flushidx];
                flushidx++;
                set_current_component(component);
                update(component.$$);
            }
            set_current_component(null);
            dirty_components.length = 0;
            flushidx = 0;
            while (binding_callbacks.length)
                binding_callbacks.pop()();
            // then, once components are updated, call
            // afterUpdate functions. This may cause
            // subsequent updates...
            for (let i = 0; i < render_callbacks.length; i += 1) {
                const callback = render_callbacks[i];
                if (!seen_callbacks.has(callback)) {
                    // ...so guard against infinite loops
                    seen_callbacks.add(callback);
                    callback();
                }
            }
            render_callbacks.length = 0;
        } while (dirty_components.length);
        while (flush_callbacks.length) {
            flush_callbacks.pop()();
        }
        update_scheduled = false;
        seen_callbacks.clear();
        set_current_component(saved_component);
    }
    function update($$) {
        if ($$.fragment !== null) {
            $$.update();
            run_all($$.before_update);
            const dirty = $$.dirty;
            $$.dirty = [-1];
            $$.fragment && $$.fragment.p($$.ctx, dirty);
            $$.after_update.forEach(add_render_callback);
        }
    }
    const outroing = new Set();
    let outros;
    function transition_in(block, local) {
        if (block && block.i) {
            outroing.delete(block);
            block.i(local);
        }
    }
    function transition_out(block, local, detach, callback) {
        if (block && block.o) {
            if (outroing.has(block))
                return;
            outroing.add(block);
            outros.c.push(() => {
                outroing.delete(block);
                if (callback) {
                    if (detach)
                        block.d(1);
                    callback();
                }
            });
            block.o(local);
        }
        else if (callback) {
            callback();
        }
    }
    function create_component(block) {
        block && block.c();
    }
    function mount_component(component, target, anchor, customElement) {
        const { fragment, on_mount, on_destroy, after_update } = component.$$;
        fragment && fragment.m(target, anchor);
        if (!customElement) {
            // onMount happens before the initial afterUpdate
            add_render_callback(() => {
                const new_on_destroy = on_mount.map(run).filter(is_function);
                if (on_destroy) {
                    on_destroy.push(...new_on_destroy);
                }
                else {
                    // Edge case - component was destroyed immediately,
                    // most likely as a result of a binding initialising
                    run_all(new_on_destroy);
                }
                component.$$.on_mount = [];
            });
        }
        after_update.forEach(add_render_callback);
    }
    function destroy_component(component, detaching) {
        const $$ = component.$$;
        if ($$.fragment !== null) {
            run_all($$.on_destroy);
            $$.fragment && $$.fragment.d(detaching);
            // TODO null out other refs, including component.$$ (but need to
            // preserve final state?)
            $$.on_destroy = $$.fragment = null;
            $$.ctx = [];
        }
    }
    function make_dirty(component, i) {
        if (component.$$.dirty[0] === -1) {
            dirty_components.push(component);
            schedule_update();
            component.$$.dirty.fill(0);
        }
        component.$$.dirty[(i / 31) | 0] |= (1 << (i % 31));
    }
    function init(component, options, instance, create_fragment, not_equal, props, append_styles, dirty = [-1]) {
        const parent_component = current_component;
        set_current_component(component);
        const $$ = component.$$ = {
            fragment: null,
            ctx: null,
            // state
            props,
            update: noop,
            not_equal,
            bound: blank_object(),
            // lifecycle
            on_mount: [],
            on_destroy: [],
            on_disconnect: [],
            before_update: [],
            after_update: [],
            context: new Map(options.context || (parent_component ? parent_component.$$.context : [])),
            // everything else
            callbacks: blank_object(),
            dirty,
            skip_bound: false,
            root: options.target || parent_component.$$.root
        };
        append_styles && append_styles($$.root);
        let ready = false;
        $$.ctx = instance
            ? instance(component, options.props || {}, (i, ret, ...rest) => {
                const value = rest.length ? rest[0] : ret;
                if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
                    if (!$$.skip_bound && $$.bound[i])
                        $$.bound[i](value);
                    if (ready)
                        make_dirty(component, i);
                }
                return ret;
            })
            : [];
        $$.update();
        ready = true;
        run_all($$.before_update);
        // `false` as a special case of no DOM component
        $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
        if (options.target) {
            if (options.hydrate) {
                const nodes = children(options.target);
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.l(nodes);
                nodes.forEach(detach);
            }
            else {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.c();
            }
            if (options.intro)
                transition_in(component.$$.fragment);
            mount_component(component, options.target, options.anchor, options.customElement);
            flush();
        }
        set_current_component(parent_component);
    }
    /**
     * Base class for Svelte components. Used when dev=false.
     */
    class SvelteComponent {
        $destroy() {
            destroy_component(this, 1);
            this.$destroy = noop;
        }
        $on(type, callback) {
            const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
            callbacks.push(callback);
            return () => {
                const index = callbacks.indexOf(callback);
                if (index !== -1)
                    callbacks.splice(index, 1);
            };
        }
        $set($$props) {
            if (this.$$set && !is_empty($$props)) {
                this.$$.skip_bound = true;
                this.$$set($$props);
                this.$$.skip_bound = false;
            }
        }
    }

    function dispatch_dev(type, detail) {
        document.dispatchEvent(custom_event(type, Object.assign({ version: '3.49.0' }, detail), { bubbles: true }));
    }
    function append_dev(target, node) {
        dispatch_dev('SvelteDOMInsert', { target, node });
        append(target, node);
    }
    function insert_dev(target, node, anchor) {
        dispatch_dev('SvelteDOMInsert', { target, node, anchor });
        insert(target, node, anchor);
    }
    function detach_dev(node) {
        dispatch_dev('SvelteDOMRemove', { node });
        detach(node);
    }
    function listen_dev(node, event, handler, options, has_prevent_default, has_stop_propagation) {
        const modifiers = options === true ? ['capture'] : options ? Array.from(Object.keys(options)) : [];
        if (has_prevent_default)
            modifiers.push('preventDefault');
        if (has_stop_propagation)
            modifiers.push('stopPropagation');
        dispatch_dev('SvelteDOMAddEventListener', { node, event, handler, modifiers });
        const dispose = listen(node, event, handler, options);
        return () => {
            dispatch_dev('SvelteDOMRemoveEventListener', { node, event, handler, modifiers });
            dispose();
        };
    }
    function attr_dev(node, attribute, value) {
        attr(node, attribute, value);
        if (value == null)
            dispatch_dev('SvelteDOMRemoveAttribute', { node, attribute });
        else
            dispatch_dev('SvelteDOMSetAttribute', { node, attribute, value });
    }
    function set_data_dev(text, data) {
        data = '' + data;
        if (text.wholeText === data)
            return;
        dispatch_dev('SvelteDOMSetData', { node: text, data });
        text.data = data;
    }
    function validate_each_argument(arg) {
        if (typeof arg !== 'string' && !(arg && typeof arg === 'object' && 'length' in arg)) {
            let msg = '{#each} only iterates over array-like objects.';
            if (typeof Symbol === 'function' && arg && Symbol.iterator in arg) {
                msg += ' You can use a spread to convert this iterable into an array.';
            }
            throw new Error(msg);
        }
    }
    function validate_slots(name, slot, keys) {
        for (const slot_key of Object.keys(slot)) {
            if (!~keys.indexOf(slot_key)) {
                console.warn(`<${name}> received an unexpected slot "${slot_key}".`);
            }
        }
    }
    /**
     * Base class for Svelte components with some minor dev-enhancements. Used when dev=true.
     */
    class SvelteComponentDev extends SvelteComponent {
        constructor(options) {
            if (!options || (!options.target && !options.$$inline)) {
                throw new Error("'target' is a required option");
            }
            super();
        }
        $destroy() {
            super.$destroy();
            this.$destroy = () => {
                console.warn('Component was already destroyed'); // eslint-disable-line no-console
            };
        }
        $capture_state() { }
        $inject_state() { }
    }

    /* src\components\Nav.svelte generated by Svelte v3.49.0 */

    const file$5 = "src\\components\\Nav.svelte";

    function create_fragment$5(ctx) {
    	let nav;
    	let img0;
    	let img0_src_value;
    	let t0;
    	let ul;
    	let li0;
    	let img1;
    	let img1_src_value;
    	let t1;
    	let li1;
    	let img2;
    	let img2_src_value;
    	let t2;
    	let li2;
    	let img3;
    	let img3_src_value;
    	let t3;
    	let li3;
    	let img4;
    	let img4_src_value;
    	let t4;
    	let img5;
    	let img5_src_value;

    	const block = {
    		c: function create() {
    			nav = element("nav");
    			img0 = element("img");
    			t0 = space();
    			ul = element("ul");
    			li0 = element("li");
    			img1 = element("img");
    			t1 = space();
    			li1 = element("li");
    			img2 = element("img");
    			t2 = space();
    			li2 = element("li");
    			img3 = element("img");
    			t3 = space();
    			li3 = element("li");
    			img4 = element("img");
    			t4 = space();
    			img5 = element("img");
    			attr_dev(img0, "class", "logo  svelte-1bfb2yb");
    			if (!src_url_equal(img0.src, img0_src_value = /*logo*/ ctx[1])) attr_dev(img0, "src", img0_src_value);
    			attr_dev(img0, "alt", "");
    			add_location(img0, file$5, 10, 2, 410);
    			attr_dev(img1, "class", "hoverr svg svelte-1bfb2yb");
    			if (!src_url_equal(img1.src, img1_src_value = /*grid*/ ctx[2])) attr_dev(img1, "src", img1_src_value);
    			attr_dev(img1, "alt", "grid");
    			add_location(img1, file$5, 12, 27, 510);
    			attr_dev(li0, "class", "list--item svelte-1bfb2yb");
    			add_location(li0, file$5, 12, 4, 487);
    			attr_dev(img2, "class", "hoverr svg svelte-1bfb2yb");
    			if (!src_url_equal(img2.src, img2_src_value = /*todo*/ ctx[4])) attr_dev(img2, "src", img2_src_value);
    			attr_dev(img2, "alt", "");
    			add_location(img2, file$5, 13, 27, 592);
    			attr_dev(li1, "class", "list--item svelte-1bfb2yb");
    			add_location(li1, file$5, 13, 4, 569);
    			attr_dev(img3, "class", "hoverr svg svelte-1bfb2yb");
    			if (!src_url_equal(img3.src, img3_src_value = /*school*/ ctx[3])) attr_dev(img3, "src", img3_src_value);
    			attr_dev(img3, "alt", "");
    			add_location(img3, file$5, 14, 27, 670);
    			attr_dev(li2, "class", "list--item svelte-1bfb2yb");
    			add_location(li2, file$5, 14, 4, 647);
    			attr_dev(img4, "class", "svg hoverr svelte-1bfb2yb");
    			if (!src_url_equal(img4.src, img4_src_value = /*setting*/ ctx[5])) attr_dev(img4, "src", img4_src_value);
    			attr_dev(img4, "alt", "setting");
    			add_location(img4, file$5, 16, 6, 758);
    			attr_dev(li3, "class", "list--item svelte-1bfb2yb");
    			add_location(li3, file$5, 15, 4, 727);
    			attr_dev(ul, "class", "list--container svelte-1bfb2yb");
    			add_location(ul, file$5, 11, 2, 453);
    			attr_dev(img5, "class", "logout svg svelte-1bfb2yb");
    			if (!src_url_equal(img5.src, img5_src_value = /*src*/ ctx[0])) attr_dev(img5, "src", img5_src_value);
    			attr_dev(img5, "alt", "sign out");
    			add_location(img5, file$5, 19, 2, 836);
    			attr_dev(nav, "class", "nav--container svelte-1bfb2yb");
    			add_location(nav, file$5, 9, 0, 378);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, nav, anchor);
    			append_dev(nav, img0);
    			append_dev(nav, t0);
    			append_dev(nav, ul);
    			append_dev(ul, li0);
    			append_dev(li0, img1);
    			append_dev(ul, t1);
    			append_dev(ul, li1);
    			append_dev(li1, img2);
    			append_dev(ul, t2);
    			append_dev(ul, li2);
    			append_dev(li2, img3);
    			append_dev(ul, t3);
    			append_dev(ul, li3);
    			append_dev(li3, img4);
    			append_dev(nav, t4);
    			append_dev(nav, img5);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(nav);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$5.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$5($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Nav', slots, []);
    	let src = "Icons/logout_FILL0_wght400_GRAD0_opsz48.svg";
    	let logo = "Icons/logo-white.png";
    	let grid = "Icons/grid_view_FILL0_wght400_GRAD0_opsz48.svg";
    	let school = "Icons/school_FILL0_wght400_GRAD0_opsz48.svg";
    	let todo = "Icons/checklist_FILL0_wght400_GRAD0_opsz48.svg";
    	let setting = "Icons/settings_FILL0_wght400_GRAD0_opsz48.svg";
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Nav> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ src, logo, grid, school, todo, setting });

    	$$self.$inject_state = $$props => {
    		if ('src' in $$props) $$invalidate(0, src = $$props.src);
    		if ('logo' in $$props) $$invalidate(1, logo = $$props.logo);
    		if ('grid' in $$props) $$invalidate(2, grid = $$props.grid);
    		if ('school' in $$props) $$invalidate(3, school = $$props.school);
    		if ('todo' in $$props) $$invalidate(4, todo = $$props.todo);
    		if ('setting' in $$props) $$invalidate(5, setting = $$props.setting);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [src, logo, grid, school, todo, setting];
    }

    class Nav extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$5, create_fragment$5, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Nav",
    			options,
    			id: create_fragment$5.name
    		});
    	}
    }

    /* src\components\Profile.svelte generated by Svelte v3.49.0 */

    const file$4 = "src\\components\\Profile.svelte";

    function create_fragment$4(ctx) {
    	let div2;
    	let div0;
    	let img;
    	let img_src_value;
    	let t0;
    	let div1;
    	let h1;
    	let t2;
    	let h20;
    	let t4;
    	let h21;

    	const block = {
    		c: function create() {
    			div2 = element("div");
    			div0 = element("div");
    			img = element("img");
    			t0 = space();
    			div1 = element("div");
    			h1 = element("h1");
    			h1.textContent = "User Name #2222";
    			t2 = space();
    			h20 = element("h2");
    			h20.textContent = "King Fahd University of Petroleum and Minerals";
    			t4 = space();
    			h21 = element("h2");
    			h21.textContent = "Software Engineering - senior";
    			if (!src_url_equal(img.src, img_src_value = /*person*/ ctx[0])) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "alt", "Profile image");
    			add_location(img, file$4, 6, 4, 129);
    			attr_dev(div0, "class", "profile--image svelte-xx1x04");
    			add_location(div0, file$4, 5, 2, 95);
    			attr_dev(h1, "class", "svelte-xx1x04");
    			add_location(h1, file$4, 9, 4, 216);
    			attr_dev(h20, "class", "svelte-xx1x04");
    			add_location(h20, file$4, 10, 4, 246);
    			attr_dev(h21, "class", "svelte-xx1x04");
    			add_location(h21, file$4, 11, 4, 307);
    			attr_dev(div1, "class", "profile--info svelte-xx1x04");
    			add_location(div1, file$4, 8, 2, 183);
    			attr_dev(div2, "class", "profile--container svelte-xx1x04");
    			add_location(div2, file$4, 4, 0, 59);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div2, anchor);
    			append_dev(div2, div0);
    			append_dev(div0, img);
    			append_dev(div2, t0);
    			append_dev(div2, div1);
    			append_dev(div1, h1);
    			append_dev(div1, t2);
    			append_dev(div1, h20);
    			append_dev(div1, t4);
    			append_dev(div1, h21);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div2);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$4.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$4($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Profile', slots, []);
    	let person = "Icons/person.png";
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Profile> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ person });

    	$$self.$inject_state = $$props => {
    		if ('person' in $$props) $$invalidate(0, person = $$props.person);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [person];
    }

    class Profile extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$4, create_fragment$4, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Profile",
    			options,
    			id: create_fragment$4.name
    		});
    	}
    }

    /* src\components\Todo--preview--item.svelte generated by Svelte v3.49.0 */

    const file$3 = "src\\components\\Todo--preview--item.svelte";

    function get_each_context(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[8] = list[i];
    	child_ctx[9] = list;
    	child_ctx[10] = i;
    	return child_ctx;
    }

    // (34:2) {#each todoList as item, index}
    function create_each_block(ctx) {
    	let div;
    	let input;
    	let t0;
    	let span0;
    	let t1_value = /*item*/ ctx[8].text + "";
    	let t1;
    	let t2;
    	let span1;
    	let img;
    	let img_src_value;
    	let t3;
    	let br;
    	let t4;
    	let mounted;
    	let dispose;

    	function input_change_handler() {
    		/*input_change_handler*/ ctx[6].call(input, /*each_value*/ ctx[9], /*index*/ ctx[10]);
    	}

    	function click_handler() {
    		return /*click_handler*/ ctx[7](/*index*/ ctx[10]);
    	}

    	const block = {
    		c: function create() {
    			div = element("div");
    			input = element("input");
    			t0 = space();
    			span0 = element("span");
    			t1 = text(t1_value);
    			t2 = space();
    			span1 = element("span");
    			img = element("img");
    			t3 = space();
    			br = element("br");
    			t4 = space();
    			attr_dev(input, "style", "");
    			attr_dev(input, "type", "checkbox");
    			add_location(input, file$3, 35, 6, 899);
    			attr_dev(span0, "class", "svelte-14blos0");
    			toggle_class(span0, "checked", /*item*/ ctx[8].status);
    			add_location(span0, file$3, 36, 6, 968);
    			attr_dev(img, "class", "trash svelte-14blos0");
    			if (!src_url_equal(img.src, img_src_value = /*trash*/ ctx[2])) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "alt", "");
    			attr_dev(img, "width", "40px");
    			attr_dev(img, "height", "20pxpx");
    			set_style(img, "float", "right");
    			set_style(img, "cursor", "pointer");
    			add_location(img, file$3, 38, 8, 1083);
    			add_location(span1, file$3, 37, 6, 1028);
    			add_location(br, file$3, 47, 6, 1289);
    			attr_dev(div, "class", "item svelte-14blos0");
    			add_location(div, file$3, 34, 4, 873);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, input);
    			input.checked = /*item*/ ctx[8].status;
    			append_dev(div, t0);
    			append_dev(div, span0);
    			append_dev(span0, t1);
    			append_dev(div, t2);
    			append_dev(div, span1);
    			append_dev(span1, img);
    			append_dev(div, t3);
    			append_dev(div, br);
    			append_dev(div, t4);

    			if (!mounted) {
    				dispose = [
    					listen_dev(input, "change", input_change_handler),
    					listen_dev(span1, "click", click_handler, false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(new_ctx, dirty) {
    			ctx = new_ctx;

    			if (dirty & /*todoList*/ 2) {
    				input.checked = /*item*/ ctx[8].status;
    			}

    			if (dirty & /*todoList*/ 2 && t1_value !== (t1_value = /*item*/ ctx[8].text + "")) set_data_dev(t1, t1_value);

    			if (dirty & /*todoList*/ 2) {
    				toggle_class(span0, "checked", /*item*/ ctx[8].status);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block.name,
    		type: "each",
    		source: "(34:2) {#each todoList as item, index}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$3(ctx) {
    	let div;
    	let input;
    	let t0;
    	let button;
    	let t2;
    	let br;
    	let t3;
    	let mounted;
    	let dispose;
    	let each_value = /*todoList*/ ctx[1];
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
    	}

    	const block = {
    		c: function create() {
    			div = element("div");
    			input = element("input");
    			t0 = space();
    			button = element("button");
    			button.textContent = "Add";
    			t2 = space();
    			br = element("br");
    			t3 = space();

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			set_style(input, "width", "30rem");
    			set_style(input, "height", "2rem");
    			set_style(input, "margin-bottom", "1.5rem");
    			set_style(input, "border", "1px soild #6ac977 ");
    			attr_dev(input, "type", "text");
    			attr_dev(input, "placeholder", "new todo item..");
    			add_location(input, file$3, 24, 2, 569);
    			attr_dev(button, "class", "addbtn svelte-14blos0");
    			add_location(button, file$3, 30, 2, 755);
    			add_location(br, file$3, 32, 2, 826);
    			attr_dev(div, "class", "container svelte-14blos0");
    			add_location(div, file$3, 23, 0, 542);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, input);
    			set_input_value(input, /*newItem*/ ctx[0]);
    			append_dev(div, t0);
    			append_dev(div, button);
    			append_dev(div, t2);
    			append_dev(div, br);
    			append_dev(div, t3);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(div, null);
    			}

    			if (!mounted) {
    				dispose = [
    					listen_dev(input, "input", /*input_input_handler*/ ctx[5]),
    					listen_dev(
    						button,
    						"click",
    						function () {
    							if (is_function(/*addToList*/ ctx[3](/*newItem*/ ctx[0]))) /*addToList*/ ctx[3](/*newItem*/ ctx[0]).apply(this, arguments);
    						},
    						false,
    						false,
    						false
    					)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(new_ctx, [dirty]) {
    			ctx = new_ctx;

    			if (dirty & /*newItem*/ 1 && input.value !== /*newItem*/ ctx[0]) {
    				set_input_value(input, /*newItem*/ ctx[0]);
    			}

    			if (dirty & /*removeFromList, trash, todoList*/ 22) {
    				each_value = /*todoList*/ ctx[1];
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(div, null);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value.length;
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			destroy_each(each_blocks, detaching);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$3.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$3($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Todo_preview_item', slots, []);
    	let trash = "Icons/delete_FILL0_wght400_GRAD0_opsz48.svg";
    	let newItem = "";

    	let todoList = [
    		{
    			text: "Write my first post",
    			status: true
    		},
    		{
    			text: "Upload the post to the blog",
    			status: false
    		},
    		{
    			text: "Publish the post at Facebook",
    			status: false
    		}
    	];

    	function addToList() {
    		$$invalidate(1, todoList = [...todoList, { text: newItem, status: false }]);
    		$$invalidate(0, newItem = "");
    	}

    	function removeFromList(index) {
    		todoList.splice(index, 1);
    		$$invalidate(1, todoList);
    	}

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Todo_preview_item> was created with unknown prop '${key}'`);
    	});

    	function input_input_handler() {
    		newItem = this.value;
    		$$invalidate(0, newItem);
    	}

    	function input_change_handler(each_value, index) {
    		each_value[index].status = this.checked;
    		$$invalidate(1, todoList);
    	}

    	const click_handler = index => removeFromList(index);

    	$$self.$capture_state = () => ({
    		trash,
    		newItem,
    		todoList,
    		addToList,
    		removeFromList
    	});

    	$$self.$inject_state = $$props => {
    		if ('trash' in $$props) $$invalidate(2, trash = $$props.trash);
    		if ('newItem' in $$props) $$invalidate(0, newItem = $$props.newItem);
    		if ('todoList' in $$props) $$invalidate(1, todoList = $$props.todoList);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [
    		newItem,
    		todoList,
    		trash,
    		addToList,
    		removeFromList,
    		input_input_handler,
    		input_change_handler,
    		click_handler
    	];
    }

    class Todo_preview_item extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$3, create_fragment$3, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Todo_preview_item",
    			options,
    			id: create_fragment$3.name
    		});
    	}
    }

    /* src\components\Todo-preview.svelte generated by Svelte v3.49.0 */
    const file$2 = "src\\components\\Todo-preview.svelte";

    function create_fragment$2(ctx) {
    	let div1;
    	let h1;
    	let t1;
    	let div0;
    	let todopreviewitem;
    	let current;
    	todopreviewitem = new Todo_preview_item({ $$inline: true });

    	const block = {
    		c: function create() {
    			div1 = element("div");
    			h1 = element("h1");
    			h1.textContent = "Todo list";
    			t1 = space();
    			div0 = element("div");
    			create_component(todopreviewitem.$$.fragment);
    			attr_dev(h1, "class", "svelte-11eiwt9");
    			add_location(h1, file$2, 8, 2, 175);
    			attr_dev(div0, "class", "todo--pre--list svelte-11eiwt9");
    			add_location(div0, file$2, 9, 2, 197);
    			attr_dev(div1, "class", "todo--pre--container svelte-11eiwt9");
    			add_location(div1, file$2, 7, 0, 137);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);
    			append_dev(div1, h1);
    			append_dev(div1, t1);
    			append_dev(div1, div0);
    			mount_component(todopreviewitem, div0, null);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(todopreviewitem.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(todopreviewitem.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div1);
    			destroy_component(todopreviewitem);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$2.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$2($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Todo_preview', slots, []);
    	let person = "Icons/person.png";
    	let work;
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Todo_preview> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ TodoPreviewItem: Todo_preview_item, person, work });

    	$$self.$inject_state = $$props => {
    		if ('person' in $$props) person = $$props.person;
    		if ('work' in $$props) work = $$props.work;
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [];
    }

    class Todo_preview extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$2, create_fragment$2, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Todo_preview",
    			options,
    			id: create_fragment$2.name
    		});
    	}
    }

    /* src\components\watch.svelte generated by Svelte v3.49.0 */
    const file$1 = "src\\components\\watch.svelte";

    function create_fragment$1(ctx) {
    	let div1;
    	let h1;
    	let t1;
    	let div0;
    	let span0;
    	let t2_value = getHour(/*currentDateTime*/ ctx[0]) + "";
    	let t2;
    	let t3;
    	let t4_value = getMinute(/*currentDateTime*/ ctx[0]) + "";
    	let t4;
    	let t5;
    	let t6_value = getMeridiem(/*currentDateTime*/ ctx[0]) + "";
    	let t6;
    	let t7;
    	let span1;
    	let t8_value = getWeekDay(/*currentDateTime*/ ctx[0]) + "";
    	let t8;
    	let t9;
    	let t10_value = getMonth(/*currentDateTime*/ ctx[0]) + "";
    	let t10;
    	let t11;
    	let t12_value = getDate(/*currentDateTime*/ ctx[0]) + "";
    	let t12;

    	const block = {
    		c: function create() {
    			div1 = element("div");
    			h1 = element("h1");
    			h1.textContent = "Time and Date";
    			t1 = space();
    			div0 = element("div");
    			span0 = element("span");
    			t2 = text(t2_value);
    			t3 = text(":");
    			t4 = text(t4_value);
    			t5 = space();
    			t6 = text(t6_value);
    			t7 = space();
    			span1 = element("span");
    			t8 = text(t8_value);
    			t9 = space();
    			t10 = text(t10_value);
    			t11 = space();
    			t12 = text(t12_value);
    			attr_dev(h1, "class", "svelte-3eqtv2");
    			add_location(h1, file$1, 60, 4, 1204);
    			attr_dev(span0, "class", "time svelte-3eqtv2");
    			add_location(span0, file$1, 63, 4, 1265);
    			attr_dev(span1, "class", "date svelte-3eqtv2");
    			add_location(span1, file$1, 66, 4, 1398);
    			attr_dev(div0, "class", "date-time svelte-3eqtv2");
    			add_location(div0, file$1, 62, 2, 1236);
    			attr_dev(div1, "class", "container svelte-3eqtv2");
    			add_location(div1, file$1, 59, 0, 1175);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);
    			append_dev(div1, h1);
    			append_dev(div1, t1);
    			append_dev(div1, div0);
    			append_dev(div0, span0);
    			append_dev(span0, t2);
    			append_dev(span0, t3);
    			append_dev(span0, t4);
    			append_dev(span0, t5);
    			append_dev(span0, t6);
    			append_dev(div0, t7);
    			append_dev(div0, span1);
    			append_dev(span1, t8);
    			append_dev(span1, t9);
    			append_dev(span1, t10);
    			append_dev(span1, t11);
    			append_dev(span1, t12);
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*currentDateTime*/ 1 && t2_value !== (t2_value = getHour(/*currentDateTime*/ ctx[0]) + "")) set_data_dev(t2, t2_value);
    			if (dirty & /*currentDateTime*/ 1 && t4_value !== (t4_value = getMinute(/*currentDateTime*/ ctx[0]) + "")) set_data_dev(t4, t4_value);
    			if (dirty & /*currentDateTime*/ 1 && t6_value !== (t6_value = getMeridiem(/*currentDateTime*/ ctx[0]) + "")) set_data_dev(t6, t6_value);
    			if (dirty & /*currentDateTime*/ 1 && t8_value !== (t8_value = getWeekDay(/*currentDateTime*/ ctx[0]) + "")) set_data_dev(t8, t8_value);
    			if (dirty & /*currentDateTime*/ 1 && t10_value !== (t10_value = getMonth(/*currentDateTime*/ ctx[0]) + "")) set_data_dev(t10, t10_value);
    			if (dirty & /*currentDateTime*/ 1 && t12_value !== (t12_value = getDate(/*currentDateTime*/ ctx[0]) + "")) set_data_dev(t12, t12_value);
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$1.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function getWeekDay(c) {
    	let daysList = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    	return daysList[c.getDay()];
    }

    function getMonth(c) {
    	let monthsList = [
    		"January",
    		"February",
    		"March",
    		"April",
    		"May",
    		"June",
    		"July",
    		"August",
    		"September",
    		"October",
    		"November",
    		"December"
    	];

    	return monthsList[c.getMonth()];
    }

    function getDate(c) {
    	return c.getDate();
    }

    function getHour(c) {
    	return c.getHours() % 12 || 12;
    }

    function getMinute(c) {
    	return c.getMinutes() < 10
    	? "0" + c.getMinutes()
    	: c.getMinutes();
    }

    function getMeridiem(c) {
    	return c.getHours() < 12 ? "AM" : "PM";
    }

    function instance$1($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Watch', slots, []);
    	let currentDateTime = new Date();

    	onMount(() => {
    		const interval = setInterval(
    			() => {
    				$$invalidate(0, currentDateTime = new Date());
    			},
    			1000
    		);

    		return () => {
    			clearInterval(interval);
    		};
    	});

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Watch> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({
    		onMount,
    		currentDateTime,
    		getWeekDay,
    		getMonth,
    		getDate,
    		getHour,
    		getMinute,
    		getMeridiem
    	});

    	$$self.$inject_state = $$props => {
    		if ('currentDateTime' in $$props) $$invalidate(0, currentDateTime = $$props.currentDateTime);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [currentDateTime];
    }

    class Watch extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$1, create_fragment$1, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Watch",
    			options,
    			id: create_fragment$1.name
    		});
    	}
    }

    /* src\App.svelte generated by Svelte v3.49.0 */
    const file = "src\\App.svelte";

    function create_fragment(ctx) {
    	let main;
    	let div1;
    	let nav;
    	let t0;
    	let div0;
    	let todopreview;
    	let t1;
    	let profile;
    	let t2;
    	let watch;
    	let current;
    	nav = new Nav({ $$inline: true });
    	todopreview = new Todo_preview({ $$inline: true });
    	profile = new Profile({ $$inline: true });
    	watch = new Watch({ $$inline: true });

    	const block = {
    		c: function create() {
    			main = element("main");
    			div1 = element("div");
    			create_component(nav.$$.fragment);
    			t0 = space();
    			div0 = element("div");
    			create_component(todopreview.$$.fragment);
    			t1 = space();
    			create_component(profile.$$.fragment);
    			t2 = space();
    			create_component(watch.$$.fragment);
    			attr_dev(div0, "class", "thepages-containers svelte-1pbbmvt");
    			add_location(div0, file, 10, 4, 278);
    			attr_dev(div1, "class", "container svelte-1pbbmvt");
    			add_location(div1, file, 8, 2, 238);
    			add_location(main, file, 7, 0, 229);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, main, anchor);
    			append_dev(main, div1);
    			mount_component(nav, div1, null);
    			append_dev(div1, t0);
    			append_dev(div1, div0);
    			mount_component(todopreview, div0, null);
    			append_dev(div0, t1);
    			mount_component(profile, div0, null);
    			append_dev(div0, t2);
    			mount_component(watch, div0, null);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(nav.$$.fragment, local);
    			transition_in(todopreview.$$.fragment, local);
    			transition_in(profile.$$.fragment, local);
    			transition_in(watch.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(nav.$$.fragment, local);
    			transition_out(todopreview.$$.fragment, local);
    			transition_out(profile.$$.fragment, local);
    			transition_out(watch.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(main);
    			destroy_component(nav);
    			destroy_component(todopreview);
    			destroy_component(profile);
    			destroy_component(watch);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('App', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<App> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ Nav, Profile, TodoPreview: Todo_preview, Watch });
    	return [];
    }

    class App extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance, create_fragment, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "App",
    			options,
    			id: create_fragment.name
    		});
    	}
    }

    const app = new App({
    	target: document.body,
    	props: {
    		name: 'world'
    	}
    });

    return app;

})();
//# sourceMappingURL=bundle.js.map
