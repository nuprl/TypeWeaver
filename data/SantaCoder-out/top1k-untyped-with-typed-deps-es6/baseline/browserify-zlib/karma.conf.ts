export default function (karma: karma.Config) {
  karma.set({
    frameworks: ['mocha'],
    files: ['test/tmp/browserified.js'],
    reporters: ['mocha-own'],
    mochaOwnReporter: {
      reporter: 'spec'
    },
    browsers: process.env.TRAVIS ? ['Firefox', 'PhantomJS'] : ['Chrome', 'PhantomJS']
  })
};