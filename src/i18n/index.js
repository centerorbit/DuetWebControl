'use strict'

import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)

function loadLocaleMessages () {
  const locales = require.context('@/i18n/locales', true, /[A-Za-z0-9-_,\s]+\.yaml$/i);
  const messages = {};
  locales.keys().forEach(key => {
    const matched = key.match(/([A-Za-z0-9-_]+)\./i);
    if (matched && matched.length > 1) {
      const locale = matched[1];
      messages[locale] = locales(key);
    }
  });
  return messages;
}

/* eslint-disable */
if (process.env.NODE_ENV !== 'production') {
	function reportMissing(item, path) {
		if (item instanceof Object) {
			for (let key in item) {
				reportMissing(item[key], path + '/' + key);
			}
		} else {
			console.warn(`Missing translation ${path} = ${item}`);
		}
	}

	function compareTranslations(a, b, path) {
		for (let key in a) {
			if (b[key] === undefined) {
				reportMissing(a[key], path + '/' + key);
			} else if (b[key] instanceof Object) {
				compareTranslations(a[key], b[key], path + '/' + key);
			}
		}

		for (let key in b) {
			if (a[key] === undefined) {
				console.warn(`Unused translation ${path + '/' + key}`);
			}
		}
	}

	compareTranslations(en, de, 'de');
}
/* eslint-enable */

export default new VueI18n({
	locale: 'en',
	messages: loadLocaleMessages(),
})
