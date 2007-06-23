/**
 * This code implements the Simile jQuery plugin, which in turns simply
 * provides several convenient and useful functions for manipulating the
 * DOM, etc.
 * @overview Simile jQuery plugin
 */

jQuery.fn.extend({
    /**
     * The attrs method extends jQuery to allow for aggregating attributes of 
     * all matched elements in a $('..') expression into a nice hash.  It also
     * supports only returning attributes within a certain namespace, e.g. 
     * ex:role, when provided with the namespace prefix as an argument.
     */
    attrs: function(ns) {
        // Caching the compiled regex speeds this up a bit
        if (!this.__namespaceRegexps) {
            this.__namespaceRegexps = {};
        }
        var regexp = this.__namespaceRegexps[ns];
        if (!regexp) {
            this.__namespaceRegexps[ns] = regexp = 
            ns ? eval("/^" + ns + ":(.+)/") : /^([^:]*)$/;
        }
        var result = {};
        this.each(function() {
            // Within this loop, 'this' refers to each matched DOM element
            var atts = this.attributes;
            var l = atts.length;
            for (var i = 0; i < l; i++) {
                var m = atts[i].name.match(regexp);
                if (m) { result[m[1]] = atts[i].value; }
            }
        });
        return result;
    }
});