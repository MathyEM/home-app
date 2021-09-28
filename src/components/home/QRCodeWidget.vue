<template>
    <div class="qr-codes-container">
        <h2>QR Koder</h2>
        <div class="qr-codes-wrapper">
            <QRCode :title="wifi_1.title" :src="wifi_1.src" />
            <QRCode :title="wifi_2.title" :src="wifi_2.src" />
        </div>
    </div>
</template>

<script>
import QRCode from '@/components/qr_code/QRCode.vue'

export default {
    name: 'QRCodeWidget',
    components: {
        QRCode,
    },
    data() {
        return {
            wifi_1: {
                title: '2.4Ghz',
                src: require('@/assets/img/qr_lasso37mezzo89chrom_2.4.png'),
            },
            wifi_2: {
                title: '5Ghz',
                src: require('@/assets/img/qr_lasso37mezzo89chrom_5.png'),
            },
        }
    }
}
</script>

<style lang="scss">
    .qr-codes-container {
        grid-column: span 2;

        h2 {
            margin-bottom: 1rem;
        }
    }

    .qr-codes-wrapper {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-evenly;
        gap: 2rem;
    }
</style>