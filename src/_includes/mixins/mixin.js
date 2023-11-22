/** @format */

/**
 * @todo Figure out how to get TypeScript to recognize global filters on classes
 * @param {any[]} mixins Array of mixins to apply.
 * @param {any} baseClass Base class for all to extend.
 * @returns {BaseClass}
 */
const Mixin = (mixins = [], baseClass = class {}) =>
	mixins.reduce((base, mixin) => mixin(base), baseClass);

module.exports = Mixin;
