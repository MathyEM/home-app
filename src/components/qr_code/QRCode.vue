<template>
    <div class="qr-code-container">
        <img class="qr-code-img" :src="src" :alt="'qr code for' + title">
        <h3 class="qr-code-title">{{ title }}</h3>
    </div>
</template>

<script>
export default {
    name: 'QRCode',
    props: {
        src: {
            type: String,
            required: true
        },
        title: {
            type: String,
            required: false
        }
    }
}
</script>

<style lang="scss">
    .qr-code-img {
        padding: 0.6rem;
    }

    .qr-code-title {
        font-size: 2rem;
    }
</style>