<template>
    <div class="todos-container">
        <p>Todos component</p>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
    name: "Todos",
    components: {

    },
    data() {
        return {

        }
    },
    computed: {
        ...mapGetters(['todos'])
    },
    methods: {
        ...mapActions(['setTodoSources', 'getTodos'])
    },
    mounted() {
        this.getTodos()
    }
}
</script>

<style>

</style>