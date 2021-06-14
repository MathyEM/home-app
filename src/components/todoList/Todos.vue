<template>
    <div class="todos-container">
        <h3>Todos component</h3>
        <ul class="todo-list">
            <li class="todo-item" v-for="todo in todos" :key="todo.id">
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
import { mapGetters } from 'vuex'
export default {
    name: "Todos",
    components: {

    },
    data() {
        return {
            activeTodoSource: 'indkbsliste'
        }
    },
    computed: {
        ...mapGetters(['todoSources']),
        todos() {
            let index = this.todoSources.findIndex((element) => element.id === this.activeTodoSource)
            return this.$store.getters.todos[index]
        }
    },
    methods: {
        
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