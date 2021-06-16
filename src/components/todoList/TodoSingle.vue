<template>
    <li class="todo-item" v-on:click.self="completeTodo(todo)" :class="{ edit: edit }">
        <div v-if="!edit" v-on:click.self="completeTodo(todo)">
            <p class="todo-summary" :class="{ completed: todo.completed }">
                {{ todo.summary }}
            </p>
            <button v-on:click="edit = true">Edit</button>
        </div>
        <div v-else>
            <input
                type="text"
                name="updatedTodo"
                id="updatedTodo"
                :value="todo.summary"
                v-on:keyup.enter.self="edit = false; "
                v-on:blur.self="edit = false;"
                v-focus
            >
            <button>Edit</button>
        </div>
    </li>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
    name: 'TodoSingle',
    components: {

    },
    props: {
        todo: {
            type: Object,
            required: true,
        }
    },
    data() {
        return {
            edit: false,
        }
    },
    computed: {
        ...mapGetters(['activeTodoSource']),
    },
    methods: {
        ...mapActions(['toggleCompleteTodo']),
        completeTodo(todo) {
            todo.sourceIndex = this.activeTodoSource.index
            this.toggleCompleteTodo(todo)
            console.log("toggled complete");
        },
        toggleEdit() {
            this.edit = !this.edit
        }
    },
    directives: {
        focus: {
            inserted (el) {
                el.focus()
            }
        }
    }
}
</script>

<style lang="scss" scoped>
$todo-color: whitesmoke;
$light-text-color: #d2d2d2;

p.completed {
    text-decoration: line-through;
}
.todo-item {
    padding: 5px 1em;
    cursor: pointer;

    &.edit {
        padding: 3.5px 1em;
    }

    &:nth-child(even) {
        background: $todo-color
    }

    &:hover {
        background: darken($todo-color, 50);
        color: $light-text-color;
    }

    div {
        display: flex;
        justify-content: space-between;
    }

    input {
        font-size: 1em;
        outline: none;
    }
}
</style>