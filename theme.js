'use strict';

/**
 * Available palettes:
 *
 * red, pink, purple, deep-purple, indigo, blue, light-blue, cyan, teal, green,
 * light-green, lime, yellow, amber, orange, deep-orange, brown, grey, blue-grey
 *
 * Palette can be an object like:
 *
 * ```
 * {
 *   name: 'AnyPaletteNameExceptDefault' // i.e., BrandPrimary
 *   palette: {
 *     '50': 'ffebee',
 *     '100': 'ffcdd2',
 *     '200': 'ef9a9a',
 *     '300': 'e57373',
 *     '400': 'ef5350',
 *     '500': 'f44336',
 *     '600': 'e53935',
 *     '700': 'd32f2f',
 *     '800': 'c62828',
 *     '900': 'b71c1c',
 *     'A100': 'ff8a80',
 *     'A200': 'ff5252',
 *     'A400': 'ff1744',
 *     'A700': 'd50000',
 *     'contrastDefaultColor': 'light',
 *     'contrastDarkColors': ['50', '100', '200', '300', '400', 'A100'],
 *   }
 * }
 * ```
 *
 */

module.exports = {
  primaryPalette: 'green',
  warnPalette: 'red',
  accentPalette: 'deep-orange',
  backgroundPalette: 'grey'
};
