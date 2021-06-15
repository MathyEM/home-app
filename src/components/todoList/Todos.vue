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
        <template v-if="showCompleted">
            <h4>Completed Todos</h4>
            <ul class="todo-list todo-list-completed">
                <li class="todo-item" v-for="todo in completedTodos" :key="todo.id">
                    <p
                        class="todo-summary"
                        :class="{ completed: todo.completed }"
                        @click="completeTodo(todo)"
                    >{{ todo.summary }}</p>
                </li>
            </ul>
        </template>
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
            showCompleted: true,
        }
    },
    computed: {
        ...mapGetters(['todoSources', 'activeTodoSource']),
        todos() {
            let index = this.activeTodoSource.index
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
            todo.sourceIndex = this.activeTodoSource.index
            this.toggleCompleteTodo(todo)
        }
    },
    mounted() {
    }
}
</script>

<style lang="scss" scoped>
    $todo-color: whitesmoke;
    $light-text-color: #d2d2d2;

    p.completed {
        text-decoration: line-through;
    }

    .todo-list {
        padding: 0 0 0.5em;
        text-align: left;
        list-style: none;

        .todo-item {
            padding: 5px 1em;
            cursor: pointer;

            &:nth-child(even) {
                background: $todo-color
            }

            &:hover {
                background: darken($todo-color, 50);
                color: $light-text-color;
            }
        }
    }

    h4, h3 {
        margin-top: 0.5em;
        text-align: left;
    }
</style>