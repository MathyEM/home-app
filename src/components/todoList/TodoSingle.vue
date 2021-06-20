<template>
    <li class="todo-item" v-on:click.self="toggleCompleted" :class="{ editing: editing, syncing: syncing }">
        <p
            v-if="!editing"
            v-on:click.self="toggleCompleted"
            class="todo-summary"
            :class="{ completed: todo.completed }"
        ><span class="sync-msg">{{ syncing ? "Syncing...  ": "" }}</span>{{ todo.summary }}
        </p>
        <input
            v-else
            type="text"
            name="updatedTodo"
            id="updatedTodo"
            maxlength="30"
            :value="todo.summary"
            v-on:keyup.enter.self="editing = false"
            v-on:blur.self="updateSummary"
            v-focus
        >

        <div class="todo-btn-container">
            <button v-if="!editing" v-on:click="editing = true" class="" :disabled="syncing">Edit</button>
            <button v-else :disabled="syncing">Edit</button>
            <button v-if="!deleting" @click="deleteConfirmation" :disabled="syncing">Delete1</button>
            <button v-else @click="deleteTodo(todo)" :disabled="syncing">Delete2</button>
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
            editing: false,
            deleting: false,
        }
    },
    computed: {
        ...mapGetters(['activeTodoSource', 'syncList']),
        syncing() {
            return (this.syncList.includes(this.todo.id))
        }
    },
    methods: {
        ...mapActions(['updateTodo', 'deleteTodo']),
        toggleEdit() {
            this.editing = !this.editing
        },
        async toggleCompleted() {
            const newTodo = this.todo
            newTodo.completed = !newTodo.completed
            await this.updateTodo(newTodo)
        },
        updateSummary(e) {
            this.editing = false

            let value = e.target.value
            if (value.trim() === this.todo.summary.trim() || value.trim() == "") return

            const newTodo = this.todo
            newTodo.summary = value.trim()
            return this.updateTodo(newTodo)
        },
        deleteConfirmation() {
            this.deleting = true
            setTimeout(() => this.deleting = false, 5000)
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
    display: grid;
    grid-template-columns: auto min-content;
    gap: 0.5em;

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

    input {
        font-size: 1em;
        outline: none;
        font: unset;
    }

    .todo-btn-container {
        display: flex;
        gap: 5px
    }

    &.syncing {
        pointer-events: none !important;
        background: lightgrey !important;
        color: darkgrey !important;

        .sync-msg {
            font-size: 0.65em;
            vertical-align: middle;
        }
    }
}
</style>