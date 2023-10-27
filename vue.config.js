const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  publicPath: process.env.NODE_ENV === 'production' ? '/todo-list-vue-3/' : '/',
  transpileDependencies: true
})
