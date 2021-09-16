<template>
    <div class="todos-container">
        <ul class="todo-list">
            <TodoSingle v-for="todo in activeTodos" :key="todo.id" :todo="todo"></TodoSingle>
        </ul>

        <template v-if="showCompleted">
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
    text-align: left;
    list-style: none;
    display: grid;
    grid-auto-rows: auto;

    &:not(:last-child) {
        margin-bottom: 1em;
        border-bottom: 1px solid gray;
    }
    &:not(:first-child) {
        border-top: 1px solid gray;
    }
}

h4, h3 {
    margin: 0.5em 0 0.25em;
    text-align: left;
}
</style>