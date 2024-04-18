/**
 * @format
 * @link https://github.com/justinfagnani/mixwith.js/blob/master/mixwith.js
 * @link https://justinfagnani.com/2016/01/07/enhancing-mixins-with-decorator-functions/
 */

const _originalMixin = Symbol("_originalMixin");
const _mixinRef = Symbol("_mixinRef");
const _cachedApplicationRef = "__mixwith_cachedApplications";

const wrap = (mixin, wrapper) => {
	Object.setPrototypeOf(wrapper, mixin);
	if (!mixin[_originalMixin]) {
		mixin[_originalMixin] = mixin;
	}
	return wrapper;
};

const Cached = (mixin) =>
	wrap(mixin, (superclass) => {
		// Create a symbol used to reference a cached application from a superclass
		let applicationRef = mixin[_cachedApplicationRef];
		if (!applicationRef) {
			applicationRef = mixin[_cachedApplicationRef] = Symbol(mixin.name);
		}

		// Look up an cached application of `mixin` to `superclass`
		/* eslint-disable-next-line */
		if (superclass.hasOwnProperty(applicationRef)) {
			return superclass[applicationRef];
		}

		// Apply the mixin
		let application = mixin(superclass);

		// Cache the mixin application on the superclass
		superclass[applicationRef] = application;

		return application;
	});

/* eslint-disable-next-line */
const HasInstance = (mixin) => {
	if (!Symbol.hasInstance) {
		return mixin;
	}
	mixin[Symbol.hasInstance] = function (o) {
		const originalMixin = this[_originalMixin];
		while (o != null) {
			/* eslint-disable-next-line */
			if (o.hasOwnProperty(_mixinRef) && o[_mixinRef] === originalMixin) {
				return true;
			}
			o = Object.getPrototypeOf(o);
		}
		return false;
	};
	return mixin;
};

const BaseMixin = (mixin) =>
	wrap(mixin, (superclass) => {
		let application = mixin(superclass);
		application.prototype[_mixinRef] = mixin[_originalMixin];
		return application;
	});

/**
 * @example
 *
 * ```html
 * const MyMixin = Mixin((superclass) => class extends superclass {})
 * ```
);
*/
export const Mixin = (mixin) => Cached(BaseMixin(mixin));

class MixinBuilder {
	constructor(superclass) {
		this.superclass = superclass;
	}

	with(...mixins) {
		return mixins.reduce((c, mixin) => mixin(c), this.superclass);
	}
}

/**
 * @example
 *
 * ```html
 * class MyClass extends mix(MyBaseClass).with(Mixin1, Mixin2) {}
 * ```
 */
export const mix = (superclass) => new MixinBuilder(superclass);
