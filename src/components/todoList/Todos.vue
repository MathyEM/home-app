<template>
    <div class="todos-container">
        <h3>Todos component</h3>
        <ul class="todo-list">
            <TodoSingle v-for="todo in activeTodos" :key="todo.id" :todo="todo"></TodoSingle>
        </ul>
        <template v-if="showCompleted">
            <h4>Completed Todos</h4>
            <ul class="todo-list todo-list-completed">
                <TodoSingle v-for="todo in completedTodos" :key="todo.id" :todo="todo"></TodoSingle>
            </ul>
        </template>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import TodoSingle from './TodoSingle.vue'

export default {
    name: "Todos",
    components: {
        TodoSingle
    },
    props: {
        showCompleted: {
            required: false,
            type: Boolean,
            default: true,
        }
    },
    data() {
        return {
        }
    },
    computed: {
        ...mapGetters(['todoSources', 'todos', 'activeTodos', 'completedTodos']),
    },
    methods: {
        ...mapActions(['getTodos', 'syncCalendars'])
    },
    created() {
        this.getTodos()
		this.syncCalendars()
    },
}
</script>

<style lang="scss" scoped>
.todo-list {
    padding: 0 0 0.5em;
    text-align: left;
    list-style: none;
    display: grid;
    grid-auto-rows: 1fr;
}

h4, h3 {
    margin: 0.5em 0 0.25em;
    text-align: left;
}
</style>