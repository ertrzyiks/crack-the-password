
(function(l, r) { if (l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (window.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.head.appendChild(r) })(window.document);
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
    function empty() {
        return text('');
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
        if (value != null || input.value) {
            input.value = value;
        }
    }
    function set_style(node, key, value, important) {
        node.style.setProperty(key, value, important ? 'important' : '');
    }
    function custom_event(type, detail) {
        const e = document.createEvent('CustomEvent');
        e.initCustomEvent(type, false, false, detail);
        return e;
    }

    let current_component;
    function set_current_component(component) {
        current_component = component;
    }
    function get_current_component() {
        if (!current_component)
            throw new Error(`Function called outside component initialization`);
        return current_component;
    }
    function onMount(fn) {
        get_current_component().$$.on_mount.push(fn);
    }
    function onDestroy(fn) {
        get_current_component().$$.on_destroy.push(fn);
    }
    function createEventDispatcher() {
        const component = get_current_component();
        return (type, detail) => {
            const callbacks = component.$$.callbacks[type];
            if (callbacks) {
                // TODO are there situations where events could be dispatched
                // in a server (non-DOM) environment?
                const event = custom_event(type, detail);
                callbacks.slice().forEach(fn => {
                    fn.call(component, event);
                });
            }
        };
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
    function flush() {
        const seen_callbacks = new Set();
        do {
            // first, call beforeUpdate functions
            // and update components
            while (dirty_components.length) {
                const component = dirty_components.shift();
                set_current_component(component);
                update(component.$$);
            }
            while (binding_callbacks.length)
                binding_callbacks.pop()();
            // then, once components are updated, call
            // afterUpdate functions. This may cause
            // subsequent updates...
            for (let i = 0; i < render_callbacks.length; i += 1) {
                const callback = render_callbacks[i];
                if (!seen_callbacks.has(callback)) {
                    callback();
                    // ...so guard against infinite loops
                    seen_callbacks.add(callback);
                }
            }
            render_callbacks.length = 0;
        } while (dirty_components.length);
        while (flush_callbacks.length) {
            flush_callbacks.pop()();
        }
        update_scheduled = false;
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
    function group_outros() {
        outros = {
            r: 0,
            c: [],
            p: outros // parent group
        };
    }
    function check_outros() {
        if (!outros.r) {
            run_all(outros.c);
        }
        outros = outros.p;
    }
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
    }
    function create_component(block) {
        block && block.c();
    }
    function mount_component(component, target, anchor) {
        const { fragment, on_mount, on_destroy, after_update } = component.$$;
        fragment && fragment.m(target, anchor);
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
    function init(component, options, instance, create_fragment, not_equal, props, dirty = [-1]) {
        const parent_component = current_component;
        set_current_component(component);
        const prop_values = options.props || {};
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
            before_update: [],
            after_update: [],
            context: new Map(parent_component ? parent_component.$$.context : []),
            // everything else
            callbacks: blank_object(),
            dirty
        };
        let ready = false;
        $$.ctx = instance
            ? instance(component, prop_values, (i, ret, ...rest) => {
                const value = rest.length ? rest[0] : ret;
                if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
                    if ($$.bound[i])
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
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.l(children(options.target));
            }
            else {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.c();
            }
            if (options.intro)
                transition_in(component.$$.fragment);
            mount_component(component, options.target, options.anchor);
            flush();
        }
        set_current_component(parent_component);
    }
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
        $set() {
            // overridden by instance, if it has props
        }
    }

    function dispatch_dev(type, detail) {
        document.dispatchEvent(custom_event(type, Object.assign({ version: '3.17.3' }, detail)));
    }
    function append_dev(target, node) {
        dispatch_dev("SvelteDOMInsert", { target, node });
        append(target, node);
    }
    function insert_dev(target, node, anchor) {
        dispatch_dev("SvelteDOMInsert", { target, node, anchor });
        insert(target, node, anchor);
    }
    function detach_dev(node) {
        dispatch_dev("SvelteDOMRemove", { node });
        detach(node);
    }
    function listen_dev(node, event, handler, options, has_prevent_default, has_stop_propagation) {
        const modifiers = options === true ? ["capture"] : options ? Array.from(Object.keys(options)) : [];
        if (has_prevent_default)
            modifiers.push('preventDefault');
        if (has_stop_propagation)
            modifiers.push('stopPropagation');
        dispatch_dev("SvelteDOMAddEventListener", { node, event, handler, modifiers });
        const dispose = listen(node, event, handler, options);
        return () => {
            dispatch_dev("SvelteDOMRemoveEventListener", { node, event, handler, modifiers });
            dispose();
        };
    }
    function attr_dev(node, attribute, value) {
        attr(node, attribute, value);
        if (value == null)
            dispatch_dev("SvelteDOMRemoveAttribute", { node, attribute });
        else
            dispatch_dev("SvelteDOMSetAttribute", { node, attribute, value });
    }
    function set_data_dev(text, data) {
        data = '' + data;
        if (text.data === data)
            return;
        dispatch_dev("SvelteDOMSetData", { node: text, data });
        text.data = data;
    }
    class SvelteComponentDev extends SvelteComponent {
        constructor(options) {
            if (!options || (!options.target && !options.$$inline)) {
                throw new Error(`'target' is a required option`);
            }
            super();
        }
        $destroy() {
            super.$destroy();
            this.$destroy = () => {
                console.warn(`Component was already destroyed`); // eslint-disable-line no-console
            };
        }
    }

    /* src/Letter.svelte generated by Svelte v3.17.3 */

    const file = "src/Letter.svelte";

    function create_fragment(ctx) {
    	let div;
    	let t;

    	const block = {
    		c: function create() {
    			div = element("div");
    			t = text(/*displayValue*/ ctx[0]);
    			attr_dev(div, "class", "svelte-fwrfyt");
    			add_location(div, file, 7, 0, 114);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, t);
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*displayValue*/ 1) set_data_dev(t, /*displayValue*/ ctx[0]);
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
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
    	let { value } = $$props;
    	let { uncovered } = $$props;
    	const writable_props = ["value", "uncovered"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Letter> was created with unknown prop '${key}'`);
    	});

    	$$self.$set = $$props => {
    		if ("value" in $$props) $$invalidate(1, value = $$props.value);
    		if ("uncovered" in $$props) $$invalidate(2, uncovered = $$props.uncovered);
    	};

    	$$self.$capture_state = () => {
    		return { value, uncovered, displayValue };
    	};

    	$$self.$inject_state = $$props => {
    		if ("value" in $$props) $$invalidate(1, value = $$props.value);
    		if ("uncovered" in $$props) $$invalidate(2, uncovered = $$props.uncovered);
    		if ("displayValue" in $$props) $$invalidate(0, displayValue = $$props.displayValue);
    	};

    	let displayValue;

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*uncovered, value*/ 6) {
    			 $$invalidate(0, displayValue = uncovered ? value : "");
    		}
    	};

    	return [displayValue, value, uncovered];
    }

    class Letter extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance, create_fragment, safe_not_equal, { value: 1, uncovered: 2 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Letter",
    			options,
    			id: create_fragment.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*value*/ ctx[1] === undefined && !("value" in props)) {
    			console.warn("<Letter> was created without expected prop 'value'");
    		}

    		if (/*uncovered*/ ctx[2] === undefined && !("uncovered" in props)) {
    			console.warn("<Letter> was created without expected prop 'uncovered'");
    		}
    	}

    	get value() {
    		throw new Error("<Letter>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set value(value) {
    		throw new Error("<Letter>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get uncovered() {
    		throw new Error("<Letter>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set uncovered(value) {
    		throw new Error("<Letter>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/Progress.svelte generated by Svelte v3.17.3 */

    const file$1 = "src/Progress.svelte";

    function create_fragment$1(ctx) {
    	let div1;
    	let div0;

    	const block = {
    		c: function create() {
    			div1 = element("div");
    			div0 = element("div");
    			attr_dev(div0, "class", "bar svelte-ixkc1h");
    			set_style(div0, "width", Math.ceil(/*value*/ ctx[0] / /*total*/ ctx[1] * 100) + "%");
    			add_location(div0, file$1, 6, 2, 78);
    			attr_dev(div1, "class", "wrapper svelte-ixkc1h");
    			add_location(div1, file$1, 5, 0, 54);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);
    			append_dev(div1, div0);
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*value, total*/ 3) {
    				set_style(div0, "width", Math.ceil(/*value*/ ctx[0] / /*total*/ ctx[1] * 100) + "%");
    			}
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

    function instance$1($$self, $$props, $$invalidate) {
    	let { value } = $$props;
    	let { total } = $$props;
    	const writable_props = ["value", "total"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Progress> was created with unknown prop '${key}'`);
    	});

    	$$self.$set = $$props => {
    		if ("value" in $$props) $$invalidate(0, value = $$props.value);
    		if ("total" in $$props) $$invalidate(1, total = $$props.total);
    	};

    	$$self.$capture_state = () => {
    		return { value, total };
    	};

    	$$self.$inject_state = $$props => {
    		if ("value" in $$props) $$invalidate(0, value = $$props.value);
    		if ("total" in $$props) $$invalidate(1, total = $$props.total);
    	};

    	return [value, total];
    }

    class Progress extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$1, create_fragment$1, safe_not_equal, { value: 0, total: 1 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Progress",
    			options,
    			id: create_fragment$1.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*value*/ ctx[0] === undefined && !("value" in props)) {
    			console.warn("<Progress> was created without expected prop 'value'");
    		}

    		if (/*total*/ ctx[1] === undefined && !("total" in props)) {
    			console.warn("<Progress> was created without expected prop 'total'");
    		}
    	}

    	get value() {
    		throw new Error("<Progress>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set value(value) {
    		throw new Error("<Progress>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get total() {
    		throw new Error("<Progress>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set total(value) {
    		throw new Error("<Progress>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/Button.svelte generated by Svelte v3.17.3 */

    const file$2 = "src/Button.svelte";

    function create_fragment$2(ctx) {
    	let button;
    	let t;
    	let dispose;

    	const block = {
    		c: function create() {
    			button = element("button");
    			t = text(/*label*/ ctx[0]);
    			attr_dev(button, "type", /*type*/ ctx[1]);
    			attr_dev(button, "class", "svelte-ron3as");
    			add_location(button, file$2, 6, 0, 83);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, button, anchor);
    			append_dev(button, t);
    			dispose = listen_dev(button, "click", /*onClick*/ ctx[2], false, false, false);
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*label*/ 1) set_data_dev(t, /*label*/ ctx[0]);

    			if (dirty & /*type*/ 2) {
    				attr_dev(button, "type", /*type*/ ctx[1]);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(button);
    			dispose();
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
    	let { label } = $$props;
    	let { type } = $$props;

    	let { onClick = () => {
    		
    	} } = $$props;

    	const writable_props = ["label", "type", "onClick"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Button> was created with unknown prop '${key}'`);
    	});

    	$$self.$set = $$props => {
    		if ("label" in $$props) $$invalidate(0, label = $$props.label);
    		if ("type" in $$props) $$invalidate(1, type = $$props.type);
    		if ("onClick" in $$props) $$invalidate(2, onClick = $$props.onClick);
    	};

    	$$self.$capture_state = () => {
    		return { label, type, onClick };
    	};

    	$$self.$inject_state = $$props => {
    		if ("label" in $$props) $$invalidate(0, label = $$props.label);
    		if ("type" in $$props) $$invalidate(1, type = $$props.type);
    		if ("onClick" in $$props) $$invalidate(2, onClick = $$props.onClick);
    	};

    	return [label, type, onClick];
    }

    class Button extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$2, create_fragment$2, safe_not_equal, { label: 0, type: 1, onClick: 2 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Button",
    			options,
    			id: create_fragment$2.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*label*/ ctx[0] === undefined && !("label" in props)) {
    			console.warn("<Button> was created without expected prop 'label'");
    		}

    		if (/*type*/ ctx[1] === undefined && !("type" in props)) {
    			console.warn("<Button> was created without expected prop 'type'");
    		}
    	}

    	get label() {
    		throw new Error("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set label(value) {
    		throw new Error("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get type() {
    		throw new Error("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set type(value) {
    		throw new Error("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get onClick() {
    		throw new Error("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set onClick(value) {
    		throw new Error("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/Form.svelte generated by Svelte v3.17.3 */
    const file$3 = "src/Form.svelte";

    function create_fragment$3(ctx) {
    	let form;
    	let input;
    	let t;
    	let current;
    	let dispose;

    	const button = new Button({
    			props: { type: "submit", label: "Submit" },
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			form = element("form");
    			input = element("input");
    			t = space();
    			create_component(button.$$.fragment);
    			attr_dev(input, "type", "text");
    			attr_dev(input, "maxlength", /*desiredLength*/ ctx[0]);
    			attr_dev(input, "class", "svelte-1iihki3");
    			add_location(input, file$3, 23, 4, 409);
    			add_location(form, file$3, 22, 0, 377);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, form, anchor);
    			append_dev(form, input);
    			set_input_value(input, /*userInput*/ ctx[1]);
    			append_dev(form, t);
    			mount_component(button, form, null);
    			current = true;

    			dispose = [
    				listen_dev(input, "input", /*input_input_handler*/ ctx[4]),
    				listen_dev(form, "submit", /*onSubmit*/ ctx[2], false, false, false)
    			];
    		},
    		p: function update(ctx, [dirty]) {
    			if (!current || dirty & /*desiredLength*/ 1) {
    				attr_dev(input, "maxlength", /*desiredLength*/ ctx[0]);
    			}

    			if (dirty & /*userInput*/ 2 && input.value !== /*userInput*/ ctx[1]) {
    				set_input_value(input, /*userInput*/ ctx[1]);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(button.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(button.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(form);
    			destroy_component(button);
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
    	let { desiredLength } = $$props;
    	let userInput = "";
    	const dispatch = createEventDispatcher();

    	function onSubmit(e) {
    		e.preventDefault();

    		if (userInput.length !== desiredLength) {
    			return;
    		}

    		dispatch("submit", { value: userInput });
    		$$invalidate(1, userInput = "");
    	}

    	const writable_props = ["desiredLength"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Form> was created with unknown prop '${key}'`);
    	});

    	function input_input_handler() {
    		userInput = this.value;
    		$$invalidate(1, userInput);
    	}

    	$$self.$set = $$props => {
    		if ("desiredLength" in $$props) $$invalidate(0, desiredLength = $$props.desiredLength);
    	};

    	$$self.$capture_state = () => {
    		return { desiredLength, userInput };
    	};

    	$$self.$inject_state = $$props => {
    		if ("desiredLength" in $$props) $$invalidate(0, desiredLength = $$props.desiredLength);
    		if ("userInput" in $$props) $$invalidate(1, userInput = $$props.userInput);
    	};

    	return [desiredLength, userInput, onSubmit, dispatch, input_input_handler];
    }

    class Form extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$3, create_fragment$3, safe_not_equal, { desiredLength: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Form",
    			options,
    			id: create_fragment$3.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*desiredLength*/ ctx[0] === undefined && !("desiredLength" in props)) {
    			console.warn("<Form> was created without expected prop 'desiredLength'");
    		}
    	}

    	get desiredLength() {
    		throw new Error("<Form>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set desiredLength(value) {
    		throw new Error("<Form>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    function onInterval(callback, milliseconds) {
      const interval = setInterval(callback, milliseconds);

      onDestroy(() => {
        clearInterval(interval);
      });

      return interval
    }

    /* src/Game.svelte generated by Svelte v3.17.3 */
    const file$4 = "src/Game.svelte";

    function get_each_context(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[15] = list[i];
    	child_ctx[17] = i;
    	return child_ctx;
    }

    // (83:8) {#each letters as letter, i}
    function create_each_block(ctx) {
    	let current;

    	const letter = new Letter({
    			props: {
    				value: /*letter*/ ctx[15],
    				uncovered: /*matches*/ ctx[2].includes(/*i*/ ctx[17])
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(letter.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(letter, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const letter_changes = {};
    			if (dirty & /*letters*/ 16) letter_changes.value = /*letter*/ ctx[15];
    			if (dirty & /*matches*/ 4) letter_changes.uncovered = /*matches*/ ctx[2].includes(/*i*/ ctx[17]);
    			letter.$set(letter_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(letter.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(letter.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(letter, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block.name,
    		type: "each",
    		source: "(83:8) {#each letters as letter, i}",
    		ctx
    	});

    	return block;
    }

    // (98:4) {:else}
    function create_else_block(ctx) {
    	let div0;
    	let t1;
    	let div1;
    	let t2;
    	let a;
    	let t3;
    	let a_href_value;

    	const block = {
    		c: function create() {
    			div0 = element("div");
    			div0.textContent = "Time's up!";
    			t1 = space();
    			div1 = element("div");
    			t2 = text("Don't know the word? ");
    			a = element("a");
    			t3 = text("Look it up in the dictionary.");
    			set_style(div0, "margin-bottom", "1em");
    			add_location(div0, file$4, 98, 8, 2548);
    			attr_dev(a, "href", a_href_value = "https://www.dictionary.com/browse/" + encodeURIComponent(/*word*/ ctx[0]));
    			attr_dev(a, "class", "svelte-7qj2ix");
    			add_location(a, file$4, 99, 34, 2632);
    			add_location(div1, file$4, 99, 8, 2606);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div0, anchor);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, div1, anchor);
    			append_dev(div1, t2);
    			append_dev(div1, a);
    			append_dev(a, t3);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*word*/ 1 && a_href_value !== (a_href_value = "https://www.dictionary.com/browse/" + encodeURIComponent(/*word*/ ctx[0]))) {
    				attr_dev(a, "href", a_href_value);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div0);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(div1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block.name,
    		type: "else",
    		source: "(98:4) {:else}",
    		ctx
    	});

    	return block;
    }

    // (96:31) 
    function create_if_block_1(ctx) {
    	let div;

    	const block = {
    		c: function create() {
    			div = element("div");
    			div.textContent = "You won!";
    			add_location(div, file$4, 96, 8, 2508);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1.name,
    		type: "if",
    		source: "(96:31) ",
    		ctx
    	});

    	return block;
    }

    // (88:4) {#if status === 'active'}
    function create_if_block(ctx) {
    	let div1;
    	let t;
    	let div0;
    	let current;

    	const form = new Form({
    			props: { desiredLength: /*word*/ ctx[0].length },
    			$$inline: true
    		});

    	form.$on("submit", /*onSubmit*/ ctx[6]);

    	const progress = new Progress({
    			props: {
    				value: /*duration*/ ctx[1] - /*timeLeft*/ ctx[5],
    				total: /*duration*/ ctx[1]
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			div1 = element("div");
    			create_component(form.$$.fragment);
    			t = space();
    			div0 = element("div");
    			create_component(progress.$$.fragment);
    			set_style(div0, "margin-top", "4rem");
    			add_location(div0, file$4, 91, 12, 2328);
    			set_style(div1, "margin-top", "2em");
    			add_location(div1, file$4, 88, 8, 2214);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);
    			mount_component(form, div1, null);
    			append_dev(div1, t);
    			append_dev(div1, div0);
    			mount_component(progress, div0, null);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const form_changes = {};
    			if (dirty & /*word*/ 1) form_changes.desiredLength = /*word*/ ctx[0].length;
    			form.$set(form_changes);
    			const progress_changes = {};
    			if (dirty & /*duration, timeLeft*/ 34) progress_changes.value = /*duration*/ ctx[1] - /*timeLeft*/ ctx[5];
    			if (dirty & /*duration*/ 2) progress_changes.total = /*duration*/ ctx[1];
    			progress.$set(progress_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(form.$$.fragment, local);
    			transition_in(progress.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(form.$$.fragment, local);
    			transition_out(progress.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div1);
    			destroy_component(form);
    			destroy_component(progress);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block.name,
    		type: "if",
    		source: "(88:4) {#if status === 'active'}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$4(ctx) {
    	let div1;
    	let div0;
    	let t;
    	let current_block_type_index;
    	let if_block;
    	let current;
    	let each_value = /*letters*/ ctx[4];
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
    	}

    	const out = i => transition_out(each_blocks[i], 1, 1, () => {
    		each_blocks[i] = null;
    	});

    	const if_block_creators = [create_if_block, create_if_block_1, create_else_block];
    	const if_blocks = [];

    	function select_block_type(ctx, dirty) {
    		if (/*status*/ ctx[3] === "active") return 0;
    		if (/*status*/ ctx[3] === "win") return 1;
    		return 2;
    	}

    	current_block_type_index = select_block_type(ctx);
    	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

    	const block = {
    		c: function create() {
    			div1 = element("div");
    			div0 = element("div");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			t = space();
    			if_block.c();
    			attr_dev(div0, "class", "letters svelte-7qj2ix");
    			add_location(div0, file$4, 81, 4, 2020);
    			add_location(div1, file$4, 80, 0, 2010);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);
    			append_dev(div1, div0);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(div0, null);
    			}

    			append_dev(div1, t);
    			if_blocks[current_block_type_index].m(div1, null);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*letters, matches*/ 20) {
    				each_value = /*letters*/ ctx[4];
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    						transition_in(each_blocks[i], 1);
    					} else {
    						each_blocks[i] = create_each_block(child_ctx);
    						each_blocks[i].c();
    						transition_in(each_blocks[i], 1);
    						each_blocks[i].m(div0, null);
    					}
    				}

    				group_outros();

    				for (i = each_value.length; i < each_blocks.length; i += 1) {
    					out(i);
    				}

    				check_outros();
    			}

    			let previous_block_index = current_block_type_index;
    			current_block_type_index = select_block_type(ctx);

    			if (current_block_type_index === previous_block_index) {
    				if_blocks[current_block_type_index].p(ctx, dirty);
    			} else {
    				group_outros();

    				transition_out(if_blocks[previous_block_index], 1, 1, () => {
    					if_blocks[previous_block_index] = null;
    				});

    				check_outros();
    				if_block = if_blocks[current_block_type_index];

    				if (!if_block) {
    					if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    					if_block.c();
    				}

    				transition_in(if_block, 1);
    				if_block.m(div1, null);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;

    			for (let i = 0; i < each_value.length; i += 1) {
    				transition_in(each_blocks[i]);
    			}

    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			each_blocks = each_blocks.filter(Boolean);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				transition_out(each_blocks[i]);
    			}

    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div1);
    			destroy_each(each_blocks, detaching);
    			if_blocks[current_block_type_index].d();
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
    	let { word } = $$props;
    	let { duration } = $$props;
    	const dispatch = createEventDispatcher();
    	let start = new Date().getTime();
    	let now = new Date().getTime();
    	let matches = [];
    	let interval;
    	let status = "active";

    	onMount(() => {
    		$$invalidate(9, interval = onInterval(() => $$invalidate(8, now = new Date().getTime()), 500));
    	});

    	function onSubmit(e) {
    		processUserInput(e.detail.value).forEach(index => markAsGuessed(index));
    	}

    	function processUserInput(value) {
    		return letters.map((letter, index) => value[index] === letter).reduce(
    			(currentMatches, matches, index) => {
    				if (matches) {
    					return [...currentMatches, index];
    				}

    				return currentMatches;
    			},
    			[]
    		);
    	}

    	function markAsGuessed(index) {
    		if (!isGuessed(index)) {
    			$$invalidate(2, matches = [...matches, index]);
    		}

    		if (status === "active" && matches.length === letters.length) {
    			$$invalidate(3, status = "win");
    			dispatch("finish", { success: true });
    		}
    	}

    	function isGuessed(index) {
    		return matches.includes(index);
    	}

    	const writable_props = ["word", "duration"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Game> was created with unknown prop '${key}'`);
    	});

    	$$self.$set = $$props => {
    		if ("word" in $$props) $$invalidate(0, word = $$props.word);
    		if ("duration" in $$props) $$invalidate(1, duration = $$props.duration);
    	};

    	$$self.$capture_state = () => {
    		return {
    			word,
    			duration,
    			start,
    			now,
    			matches,
    			interval,
    			status,
    			letters,
    			until,
    			timeLeft
    		};
    	};

    	$$self.$inject_state = $$props => {
    		if ("word" in $$props) $$invalidate(0, word = $$props.word);
    		if ("duration" in $$props) $$invalidate(1, duration = $$props.duration);
    		if ("start" in $$props) $$invalidate(7, start = $$props.start);
    		if ("now" in $$props) $$invalidate(8, now = $$props.now);
    		if ("matches" in $$props) $$invalidate(2, matches = $$props.matches);
    		if ("interval" in $$props) $$invalidate(9, interval = $$props.interval);
    		if ("status" in $$props) $$invalidate(3, status = $$props.status);
    		if ("letters" in $$props) $$invalidate(4, letters = $$props.letters);
    		if ("until" in $$props) $$invalidate(10, until = $$props.until);
    		if ("timeLeft" in $$props) $$invalidate(5, timeLeft = $$props.timeLeft);
    	};

    	let letters;
    	let until;
    	let timeLeft;

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*word*/ 1) {
    			 $$invalidate(4, letters = word.split(""));
    		}

    		if ($$self.$$.dirty & /*word*/ 1) {
    			 if (word) {
    				$$invalidate(3, status = "active");
    				$$invalidate(2, matches = []);
    				$$invalidate(7, start = new Date().getTime());
    				$$invalidate(9, interval = onInterval(() => $$invalidate(8, now = new Date().getTime()), 500));
    			}
    		}

    		if ($$self.$$.dirty & /*start, duration*/ 130) {
    			 $$invalidate(10, until = start + duration * 1000);
    		}

    		if ($$self.$$.dirty & /*until, now*/ 1280) {
    			 $$invalidate(5, timeLeft = Math.round((until - now) / 1000));
    		}

    		if ($$self.$$.dirty & /*timeLeft, status, letters, interval*/ 568) {
    			 if (timeLeft <= 0) {
    				if (status === "active") {
    					$$invalidate(3, status = "fail");
    					letters.forEach((letter, index) => markAsGuessed(index));
    					clearInterval(interval);
    					dispatch("finish", { success: false });
    				}
    			}
    		}
    	};

    	return [word, duration, matches, status, letters, timeLeft, onSubmit];
    }

    class Game extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$4, create_fragment$4, safe_not_equal, { word: 0, duration: 1 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Game",
    			options,
    			id: create_fragment$4.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*word*/ ctx[0] === undefined && !("word" in props)) {
    			console.warn("<Game> was created without expected prop 'word'");
    		}

    		if (/*duration*/ ctx[1] === undefined && !("duration" in props)) {
    			console.warn("<Game> was created without expected prop 'duration'");
    		}
    	}

    	get word() {
    		throw new Error("<Game>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set word(value) {
    		throw new Error("<Game>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get duration() {
    		throw new Error("<Game>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set duration(value) {
    		throw new Error("<Game>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    const data = [
    "ache",
    "acid",
    "acme",
    "acre",
    "afro",
    "aged",
    "ally",
    "aloe",
    "alps",
    "ammo",
    "ante",
    "apex",
    "aqua",
    "arch",
    "area",
    "arms",
    "army",
    "atom",
    "aunt",
    "aura",
    "auto",
    "axis",
    "axle",
    "baby",
    "back",
    "bail",
    "bait",
    "bale",
    "balk",
    "ball",
    "balm",
    "band",
    "bane",
    "bank",
    "barb",
    "bard",
    "bark",
    "barn",
    "bars",
    "base",
    "bash",
    "bass",
    "bath",
    "bead",
    "beak",
    "beam",
    "bean",
    "bear",
    "beat",
    "beef",
    "beep",
    "beer",
    "beet",
    "bell",
    "belt",
    "bend",
    "bent",
    "beta",
    "bevy",
    "bias",
    "bike",
    "bill",
    "bind",
    "bird",
    "bite",
    "blip",
    "blob",
    "blog",
    "blow",
    "blue",
    "blur",
    "boar",
    "boat",
    "body",
    "boil",
    "bold",
    "bolt",
    "bomb",
    "bond",
    "bone",
    "bong",
    "book",
    "boom",
    "boon",
    "boot",
    "bore",
    "born",
    "boss",
    "bowl",
    "brag",
    "bran",
    "brat",
    "brew",
    "brie",
    "brim",
    "brit",
    "brow",
    "buck",
    "buff",
    "bulb",
    "bulk",
    "bull",
    "bump",
    "bung",
    "bunk",
    "buns",
    "bunt",
    "buoy",
    "burn",
    "burp",
    "bush",
    "buss",
    "bust",
    "buzz",
    "byte",
    "cafe",
    "cage",
    "cake",
    "calf",
    "call",
    "calm",
    "camp",
    "cane",
    "cape",
    "card",
    "care",
    "carp",
    "cart",
    "case",
    "cash",
    "cask",
    "cast",
    "cave",
    "cell",
    "cent",
    "chap",
    "chat",
    "chef",
    "chew",
    "chic",
    "chin",
    "chip",
    "chit",
    "chop",
    "chow",
    "chug",
    "chum",
    "cite",
    "city",
    "clam",
    "clan",
    "clap",
    "clay",
    "clip",
    "clog",
    "clot",
    "club",
    "clue",
    "coal",
    "coat",
    "code",
    "coil",
    "coin",
    "coke",
    "cola",
    "cold",
    "colt",
    "coma",
    "comb",
    "come",
    "cone",
    "conk",
    "cook",
    "cool",
    "coot",
    "cope",
    "copy",
    "cord",
    "core",
    "cork",
    "corn",
    "corp",
    "cost",
    "cosy",
    "cove",
    "cowl",
    "cows",
    "cozy",
    "crab",
    "cred",
    "cree",
    "crew",
    "crib",
    "crop",
    "crow",
    "crud",
    "crux",
    "cube",
    "cuff",
    "cull",
    "cult",
    "curb",
    "curd",
    "cure",
    "curl",
    "cyan",
    "dame",
    "damp",
    "dane",
    "dare",
    "dark",
    "dart",
    "dash",
    "data",
    "date",
    "dawn",
    "days",
    "daze",
    "dead",
    "deaf",
    "deal",
    "dean",
    "dear",
    "debt",
    "deck",
    "deed",
    "deep",
    "deer",
    "deli",
    "demo",
    "dent",
    "desk",
    "dial",
    "dibs",
    "dice",
    "diet",
    "digs",
    "dill",
    "dime",
    "ding",
    "dirt",
    "disc",
    "dish",
    "disk",
    "dive",
    "dock",
    "doll",
    "dolt",
    "dome",
    "doom",
    "door",
    "dope",
    "dork",
    "dorm",
    "dove",
    "down",
    "drag",
    "draw",
    "drew",
    "drip",
    "drop",
    "drug",
    "drum",
    "duck",
    "duct",
    "duel",
    "duet",
    "dune",
    "dunk",
    "dusk",
    "dust",
    "duty",
    "dyer",
    "ease",
    "east",
    "eats",
    "echo",
    "edge",
    "eggs",
    "envy",
    "epic",
    "even",
    "evil",
    "exam",
    "exit",
    "eyes",
    "face",
    "fact",
    "fade",
    "fair",
    "fake",
    "fall",
    "fame",
    "fang",
    "fare",
    "farm",
    "fast",
    "fate",
    "fawn",
    "fear",
    "feat",
    "feed",
    "feel",
    "felt",
    "fern",
    "feud",
    "file",
    "fill",
    "film",
    "find",
    "fine",
    "fire",
    "firm",
    "fish",
    "fist",
    "five",
    "fizz",
    "flag",
    "flak",
    "flap",
    "flat",
    "flaw",
    "flea",
    "flex",
    "flip",
    "flop",
    "flow",
    "flub",
    "flux",
    "foam",
    "foil",
    "fold",
    "folk",
    "font",
    "food",
    "fool",
    "foot",
    "fork",
    "form",
    "fort",
    "foul",
    "four",
    "fowl",
    "frat",
    "fray",
    "free",
    "fret",
    "frog",
    "fuel",
    "full",
    "fume",
    "fund",
    "funk",
    "fury",
    "fuse",
    "fuss",
    "fuze",
    "fuzz",
    "gage",
    "gain",
    "game",
    "gape",
    "gash",
    "gasp",
    "gate",
    "gawk",
    "gaze",
    "gear",
    "geek",
    "gene",
    "gent",
    "germ",
    "gift",
    "gild",
    "gimp",
    "girl",
    "gist",
    "give",
    "glad",
    "glee",
    "glow",
    "glue",
    "gnat",
    "goal",
    "goat",
    "gold",
    "golf",
    "good",
    "goof",
    "goon",
    "goth",
    "gown",
    "grab",
    "grad",
    "gram",
    "gray",
    "grey",
    "grid",
    "grin",
    "grip",
    "grit",
    "grub",
    "gulf",
    "gull",
    "gulp",
    "guru",
    "gush",
    "gust",
    "guts",
    "hack",
    "hail",
    "hair",
    "half",
    "hall",
    "halo",
    "halt",
    "hand",
    "hang",
    "hare",
    "harp",
    "hash",
    "hate",
    "have",
    "hawk",
    "haze",
    "head",
    "heap",
    "heat",
    "heed",
    "heel",
    "heft",
    "heir",
    "helm",
    "help",
    "hemp",
    "herb",
    "herd",
    "here",
    "hero",
    "hick",
    "hide",
    "high",
    "hike",
    "hill",
    "hilt",
    "hind",
    "hint",
    "hire",
    "hiss",
    "hive",
    "hoax",
    "hobo",
    "hold",
    "hole",
    "home",
    "honk",
    "hoof",
    "hook",
    "hoop",
    "hoot",
    "hope",
    "hops",
    "horn",
    "hose",
    "host",
    "hour",
    "howl",
    "huff",
    "hula",
    "hulk",
    "hull",
    "hump",
    "hunk",
    "hunt",
    "hurl",
    "hurt",
    "hush",
    "husk",
    "hymn",
    "hype",
    "ibis",
    "icon",
    "idea",
    "idle",
    "idol",
    "iglu",
    "inch",
    "info",
    "iris",
    "iron",
    "isle",
    "itch",
    "jack",
    "jail",
    "jamb",
    "java",
    "jazz",
    "jean",
    "jeep",
    "jeer",
    "jest",
    "jive",
    "jock",
    "join",
    "joke",
    "jolt",
    "juke",
    "jump",
    "junk",
    "jury",
    "kale",
    "keen",
    "keep",
    "kelp",
    "kick",
    "kiln",
    "kilo",
    "kilt",
    "kind",
    "king",
    "kiss",
    "kite",
    "kiwi",
    "knee",
    "knit",
    "knot",
    "know",
    "lace",
    "lack",
    "lady",
    "lair",
    "lake",
    "lamb",
    "lame",
    "lamp",
    "land",
    "lane",
    "lard",
    "lash",
    "lass",
    "last",
    "lava",
    "lawn",
    "laws",
    "lead",
    "leaf",
    "leak",
    "lean",
    "leap",
    "lear",
    "leek",
    "leer",
    "left",
    "lego",
    "legs",
    "lens",
    "lent",
    "liar",
    "lick",
    "lied",
    "life",
    "lift",
    "like",
    "limb",
    "lime",
    "limp",
    "line",
    "link",
    "lint",
    "lion",
    "lisp",
    "list",
    "load",
    "loaf",
    "loan",
    "lobe",
    "lock",
    "loft",
    "logo",
    "look",
    "loom",
    "loon",
    "loop",
    "loot",
    "lord",
    "loss",
    "lost",
    "lots",
    "love",
    "luck",
    "lump",
    "lung",
    "lure",
    "lush",
    "mace",
    "magi",
    "maid",
    "mail",
    "main",
    "male",
    "malt",
    "mama",
    "mane",
    "mare",
    "mark",
    "mars",
    "mash",
    "mask",
    "mass",
    "mast",
    "mate",
    "math",
    "mayo",
    "maze",
    "meal",
    "mean",
    "meat",
    "meet",
    "meld",
    "melt",
    "memo",
    "mend",
    "menu",
    "meow",
    "mesh",
    "mess",
    "meth",
    "mile",
    "milk",
    "mill",
    "mind",
    "mine",
    "mini",
    "mink",
    "mint",
    "miss",
    "mist",
    "mite",
    "mitt",
    "moan",
    "moat",
    "mock",
    "mode",
    "mojo",
    "mold",
    "mole",
    "molt",
    "monk",
    "mood",
    "moon",
    "mope",
    "moss",
    "moth",
    "move",
    "mule",
    "muse",
    "mush",
    "musk",
    "must",
    "mute",
    "mutt",
    "name",
    "navy",
    "neck",
    "need",
    "neon",
    "nerd",
    "nest",
    "news",
    "newt",
    "nick",
    "nine",
    "node",
    "none",
    "nook",
    "noon",
    "nose",
    "note",
    "noun",
    "nuke",
    "oath",
    "odds",
    "odor",
    "ogre",
    "oink",
    "okay",
    "omen",
    "ooze",
    "open",
    "oral",
    "orca",
    "oreo",
    "oval",
    "oven",
    "over",
    "oxen",
    "pace",
    "pack",
    "pact",
    "page",
    "pail",
    "pain",
    "pair",
    "pale",
    "palm",
    "pane",
    "pant",
    "papa",
    "park",
    "part",
    "pass",
    "past",
    "path",
    "pave",
    "peak",
    "pear",
    "peek",
    "peel",
    "peer",
    "pelt",
    "perk",
    "pick",
    "pier",
    "pike",
    "pile",
    "pill",
    "pimp",
    "pine",
    "ping",
    "pink",
    "pint",
    "pipe",
    "pita",
    "pitt",
    "pity",
    "plan",
    "play",
    "plea",
    "plot",
    "plow",
    "ploy",
    "plug",
    "plum",
    "plus",
    "poem",
    "poet",
    "poke",
    "pole",
    "poll",
    "pond",
    "pong",
    "pony",
    "poof",
    "pool",
    "poor",
    "pore",
    "pork",
    "port",
    "pose",
    "post",
    "prey",
    "prom",
    "prop",
    "puck",
    "puff",
    "pull",
    "pulp",
    "puma",
    "pump",
    "punk",
    "punt",
    "push",
    "putt",
    "quad",
    "quid",
    "quiz",
    "race",
    "raft",
    "rage",
    "raid",
    "rail",
    "rain",
    "rake",
    "ramp",
    "rank",
    "rant",
    "rash",
    "rate",
    "razz",
    "read",
    "real",
    "ream",
    "rear",
    "reed",
    "reef",
    "reek",
    "reel",
    "rent",
    "rest",
    "rice",
    "rich",
    "ride",
    "riff",
    "rift",
    "rind",
    "ring",
    "rink",
    "riot",
    "rise",
    "risk",
    "rite",
    "road",
    "roar",
    "robe",
    "rock",
    "role",
    "roll",
    "room",
    "root",
    "rope",
    "rose",
    "rube",
    "ruby",
    "ruin",
    "rule",
    "rune",
    "rung",
    "runt",
    "ruse",
    "rush",
    "rust",
    "safe",
    "saga",
    "sage",
    "sail",
    "sale",
    "salt",
    "same",
    "sand",
    "sang",
    "sash",
    "sass",
    "save",
    "scan",
    "scar",
    "seal",
    "seam",
    "seat",
    "sect",
    "seed",
    "seek",
    "seer",
    "self",
    "sell",
    "sham",
    "shed",
    "shim",
    "shin",
    "ship",
    "shoe",
    "shop",
    "shot",
    "show",
    "sick",
    "sigh",
    "sign",
    "silk",
    "silo",
    "sink",
    "size",
    "skid",
    "skim",
    "skin",
    "skip",
    "skit",
    "slab",
    "slag",
    "slam",
    "slap",
    "slaw",
    "sled",
    "slew",
    "slip",
    "slit",
    "slob",
    "slot",
    "slug",
    "slum",
    "slur",
    "smog",
    "snag",
    "snap",
    "snot",
    "snow",
    "snug",
    "soak",
    "soap",
    "soar",
    "sock",
    "sofa",
    "soil",
    "sole",
    "song",
    "soot",
    "sore",
    "sort",
    "soul",
    "soup",
    "sour",
    "spam",
    "span",
    "spar",
    "spat",
    "spin",
    "spit",
    "spot",
    "spud",
    "spur",
    "stab",
    "stag",
    "star",
    "stay",
    "stem",
    "step",
    "stew",
    "stir",
    "stop",
    "stub",
    "stud",
    "suds",
    "suit",
    "sung",
    "surf",
    "swab",
    "swag",
    "swan",
    "swap",
    "sway",
    "swim",
    "tack",
    "taco",
    "tact",
    "tail",
    "take",
    "tale",
    "talk",
    "tall",
    "tank",
    "tape",
    "taps",
    "tarp",
    "tart",
    "task",
    "taxi",
    "teal",
    "team",
    "tear",
    "teen",
    "tell",
    "temp",
    "tent",
    "term",
    "test",
    "text",
    "thaw",
    "then",
    "thud",
    "thug",
    "tick",
    "tide",
    "tidy",
    "tier",
    "tile",
    "till",
    "time",
    "tint",
    "tire",
    "toad",
    "toil",
    "toll",
    "tomb",
    "tome",
    "tone",
    "tons",
    "tool",
    "toon",
    "toot",
    "toss",
    "tote",
    "tour",
    "town",
    "trap",
    "tray",
    "tree",
    "trek",
    "trim",
    "trio",
    "trip",
    "trot",
    "true",
    "tuba",
    "tube",
    "tuck",
    "tuna",
    "tune",
    "turf",
    "turn",
    "tush",
    "tusk",
    "type",
    "typo",
    "unit",
    "user",
    "vase",
    "veil",
    "vein",
    "vent",
    "verb",
    "vest",
    "vial",
    "vibe",
    "vice",
    "view",
    "vine",
    "void",
    "volt",
    "vote",
    "wade",
    "wads",
    "waft",
    "wage",
    "wail",
    "wain",
    "wait",
    "wake",
    "walk",
    "wall",
    "wane",
    "want",
    "ward",
    "ware",
    "warp",
    "wart",
    "wash",
    "wasp",
    "watt",
    "wave",
    "ways",
    "wear",
    "week",
    "well",
    "west",
    "whey",
    "whim",
    "whip",
    "wick",
    "wife",
    "wild",
    "will",
    "wilt",
    "wimp",
    "wind",
    "wine",
    "wing",
    "wink",
    "wipe",
    "wire",
    "wise",
    "wish",
    "wits",
    "wolf",
    "womb",
    "wood",
    "woof",
    "wool",
    "word",
    "work",
    "worm",
    "wort",
    "wrap",
    "yard",
    "yarn",
    "yawn",
    "year",
    "yell",
    "yeti",
    "yoga",
    "yolk",
    "zinc",
    "zing",
    "zone",
    "zoom",
    "zero",
    "zany",
    "whir",
    "welt",
    "whig",
    "wand",
    "twin",
    "tilt",
    "site",
    "sent",
    ];

    /* src/App.svelte generated by Svelte v3.17.3 */
    const file$5 = "src/App.svelte";

    // (36:4) {:else}
    function create_else_block$1(ctx) {
    	let div0;
    	let p0;
    	let t1;
    	let p1;
    	let t3;
    	let p2;
    	let t5;
    	let div1;
    	let current;

    	const button = new Button({
    			props: {
    				type: "button",
    				onClick: /*func*/ ctx[5],
    				label: "Start"
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			div0 = element("div");
    			p0 = element("p");
    			p0.textContent = "You have 60 seconds and unlimited attempts to guess the password.";
    			t1 = space();
    			p1 = element("p");
    			p1.textContent = "The password is a singular noun in English.";
    			t3 = space();
    			p2 = element("p");
    			p2.textContent = "Each matching letter will be revealed.";
    			t5 = space();
    			div1 = element("div");
    			create_component(button.$$.fragment);
    			add_location(p0, file$5, 37, 12, 923);
    			add_location(p1, file$5, 41, 12, 1039);
    			add_location(p2, file$5, 45, 12, 1131);
    			set_style(div0, "max-width", "18em");
    			set_style(div0, "margin", "0 auto");
    			add_location(div0, file$5, 36, 8, 864);
    			set_style(div1, "margin-top", "2em");
    			add_location(div1, file$5, 50, 8, 1229);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div0, anchor);
    			append_dev(div0, p0);
    			append_dev(div0, t1);
    			append_dev(div0, p1);
    			append_dev(div0, t3);
    			append_dev(div0, p2);
    			insert_dev(target, t5, anchor);
    			insert_dev(target, div1, anchor);
    			mount_component(button, div1, null);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const button_changes = {};
    			if (dirty & /*isStarted*/ 2) button_changes.onClick = /*func*/ ctx[5];
    			button.$set(button_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(button.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(button.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div0);
    			if (detaching) detach_dev(t5);
    			if (detaching) detach_dev(div1);
    			destroy_component(button);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block$1.name,
    		type: "else",
    		source: "(36:4) {:else}",
    		ctx
    	});

    	return block;
    }

    // (28:4) {#if isStarted}
    function create_if_block$1(ctx) {
    	let t;
    	let if_block_anchor;
    	let current;

    	const game = new Game({
    			props: { word: /*word*/ ctx[0], duration: 60 },
    			$$inline: true
    		});

    	game.$on("finish", /*onFinish*/ ctx[3]);
    	let if_block = typeof /*lastGameStatus*/ ctx[2] !== "undefined" && create_if_block_1$1(ctx);

    	const block = {
    		c: function create() {
    			create_component(game.$$.fragment);
    			t = space();
    			if (if_block) if_block.c();
    			if_block_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			mount_component(game, target, anchor);
    			insert_dev(target, t, anchor);
    			if (if_block) if_block.m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const game_changes = {};
    			if (dirty & /*word*/ 1) game_changes.word = /*word*/ ctx[0];
    			game.$set(game_changes);

    			if (typeof /*lastGameStatus*/ ctx[2] !== "undefined") {
    				if (if_block) {
    					if_block.p(ctx, dirty);
    					transition_in(if_block, 1);
    				} else {
    					if_block = create_if_block_1$1(ctx);
    					if_block.c();
    					transition_in(if_block, 1);
    					if_block.m(if_block_anchor.parentNode, if_block_anchor);
    				}
    			} else if (if_block) {
    				group_outros();

    				transition_out(if_block, 1, 1, () => {
    					if_block = null;
    				});

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(game.$$.fragment, local);
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(game.$$.fragment, local);
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(game, detaching);
    			if (detaching) detach_dev(t);
    			if (if_block) if_block.d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$1.name,
    		type: "if",
    		source: "(28:4) {#if isStarted}",
    		ctx
    	});

    	return block;
    }

    // (31:8) {#if typeof lastGameStatus !== 'undefined'}
    function create_if_block_1$1(ctx) {
    	let div;
    	let current;

    	const button = new Button({
    			props: {
    				type: "button",
    				onClick: /*tryAgain*/ ctx[4],
    				label: "Try Again"
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			div = element("div");
    			create_component(button.$$.fragment);
    			set_style(div, "margin-top", "2em");
    			add_location(div, file$5, 31, 12, 703);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			mount_component(button, div, null);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(button.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(button.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			destroy_component(button);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1$1.name,
    		type: "if",
    		source: "(31:8) {#if typeof lastGameStatus !== 'undefined'}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$5(ctx) {
    	let main;
    	let h1;
    	let t1;
    	let current_block_type_index;
    	let if_block;
    	let current;
    	const if_block_creators = [create_if_block$1, create_else_block$1];
    	const if_blocks = [];

    	function select_block_type(ctx, dirty) {
    		if (/*isStarted*/ ctx[1]) return 0;
    		return 1;
    	}

    	current_block_type_index = select_block_type(ctx);
    	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

    	const block = {
    		c: function create() {
    			main = element("main");
    			h1 = element("h1");
    			h1.textContent = "Crack the Password!";
    			t1 = space();
    			if_block.c();
    			attr_dev(h1, "class", "svelte-4engu8");
    			add_location(h1, file$5, 25, 4, 524);
    			attr_dev(main, "class", "svelte-4engu8");
    			add_location(main, file$5, 24, 0, 513);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, main, anchor);
    			append_dev(main, h1);
    			append_dev(main, t1);
    			if_blocks[current_block_type_index].m(main, null);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			let previous_block_index = current_block_type_index;
    			current_block_type_index = select_block_type(ctx);

    			if (current_block_type_index === previous_block_index) {
    				if_blocks[current_block_type_index].p(ctx, dirty);
    			} else {
    				group_outros();

    				transition_out(if_blocks[previous_block_index], 1, 1, () => {
    					if_blocks[previous_block_index] = null;
    				});

    				check_outros();
    				if_block = if_blocks[current_block_type_index];

    				if (!if_block) {
    					if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    					if_block.c();
    				}

    				transition_in(if_block, 1);
    				if_block.m(main, null);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(main);
    			if_blocks[current_block_type_index].d();
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

    function getRandomWord(list) {
    	return list[Math.round(Math.random() * list.length)];
    }

    function instance$5($$self, $$props, $$invalidate) {
    	let word = getRandomWord(data);
    	let isStarted = false;
    	let lastGameStatus;

    	function onFinish(e) {
    		$$invalidate(2, lastGameStatus = e.detail.success);
    	}

    	function tryAgain() {
    		$$invalidate(0, word = getRandomWord(data));
    		$$invalidate(2, lastGameStatus = undefined);
    	}

    	const func = () => $$invalidate(1, isStarted = true);

    	$$self.$capture_state = () => {
    		return {};
    	};

    	$$self.$inject_state = $$props => {
    		if ("word" in $$props) $$invalidate(0, word = $$props.word);
    		if ("isStarted" in $$props) $$invalidate(1, isStarted = $$props.isStarted);
    		if ("lastGameStatus" in $$props) $$invalidate(2, lastGameStatus = $$props.lastGameStatus);
    	};

    	return [word, isStarted, lastGameStatus, onFinish, tryAgain, func];
    }

    class App extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$5, create_fragment$5, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "App",
    			options,
    			id: create_fragment$5.name
    		});
    	}
    }

    const app = new App({
      target: document.body
    });

    return app;

}());
//# sourceMappingURL=bundle.js.map
