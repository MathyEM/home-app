
module.exports = {
    css: {
        loaderOptions: {
            sass: {
                prependData: `
                @import "@/assets/scss/_variables.scss";
                `
            }
        }
    },
    pwa: {
        manifestCrossorigin: 'use-credentials',
    },
};