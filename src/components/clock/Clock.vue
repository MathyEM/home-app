<template>
    <span class="time">{{ time }}</span>
</template>

<script>
export default {
    name: 'clock',
    data() {
        return {
            time: '00:00:00'
        }
    },
    beforeMount() {
        const clock = this;
        setInterval(updateTime, 1000);
        updateTime();

        function updateTime() {
            var date = new Date()
            clock.time = zeroPrefix(date.getHours()) + ':' + zeroPrefix(date.getMinutes()) + ':' + zeroPrefix(date.getSeconds())
        }

        function zeroPrefix(number) {
        return number < 10 ? "0" + number : number;
        }
    }
}
</script>

<style lang="scss">
    .clock.time {
        width: 100%;
        font-size: 2.6rem;
    }
</style>