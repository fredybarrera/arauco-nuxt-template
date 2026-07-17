// @ts-check
import prettier from 'eslint-config-prettier'
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(
  // Prettier es la única autoridad de formato: desactiva reglas estilísticas en conflicto.
  prettier
)
