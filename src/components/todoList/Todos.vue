<template>
    <div class="todos-container">
        <h3>Todos component</h3>
        <ul class="todo-list">
            <li class="todo-item" v-for="todo in activeTodos" :key="todo.id">
                <p
                    class="todo-summary"
                    :class="{ completed: todo.completed }"
                    @click="completeTodo(todo)"
                >{{ todo.summary }}</p>
            </li>
        </ul>
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
            activeTodoSource: {
                id: 'indkbsliste',
                index: () => this.todoSources.findIndex((element) => element.id === this.activeTodoSource.id),
            },
        }
    },
    computed: {
        ...mapGetters(['todoSources']),
        todos() {
            let index = this.activeTodoSource.index()
            return this.$store.getters.todos[index]
        },
        activeTodos() {
            if (this.todos) return this.todos.filter(todo => !todo.completed)
            return undefined
        },
        completedTodos() {
            if (this.todos) return this.todos.filter(todo => todo.completed)
            return undefined
        },
    },
    methods: {
        ...mapActions(['toggleCompleteTodo']),
        completeTodo(todo) {
            todo.sourceIndex = this.activeTodoSource.index()
            this.toggleCompleteTodo(todo)
        }
    },
    mounted() {
    }
}
</script>

<style lang="scss" scoped>
    p.completed {
        text-decoration: line-through;
    }
</style>