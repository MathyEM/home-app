<template>
    <li class="todo-item" v-on:click.self="toggleCompleted" :class="{ editing: editing }">
        <p
            v-if="!editing"
            v-on:click.self="toggleCompleted"
            class="todo-summary"
            :class="{ completed: todo.completed }"
        >{{ todo.summary }}
        </p>
        <input
            v-else
            type="text"
            name="updatedTodo"
            id="updatedTodo"
            maxlength="25"
            :value="todo.summary"
            v-on:keyup.enter.self="editing = false"
            v-on:blur="updateSummary"
            v-focus
        >

        <div class="todo-btn-container">
            <button v-if="!editing" v-on:click="editing = true" class="edit-btn todo-btn" :disabled="disabled">✎</button>
            <button v-else class="edit-btn todo-btn">✎</button>
            <button v-if="!deleting" @click="deleteConfirmation" class="delete-btn todo-btn">🗑</button>
            <button v-else @click="deleteTodo(todo)" class="delete-btn confirm-del-btn todo-btn">🗑</button>
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
            disabled: false
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
            this.updateTodo(newTodo)
        },
        updateSummary(e) {
            this.disabled = true
            this.editing = false
            setTimeout(() => this.disabled = false, 300)
            let value = e.target.value
            if (value.trim() === this.todo.summary.trim() || value.trim() == "") return

            const newTodo = this.todo
            newTodo.summary = value.trim()
            this.updateTodo(newTodo)
            console.log("done");
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
    grid-template-columns: minmax(auto, 80%) auto;
    gap: 0.5em;
    align-items: center;

    .todo-summary {
        font-size: 1.5em;
    }

    &:nth-child(even) {
        background: $todo-color
    }

    &:hover {
        background: darken($todo-color, 50);
        color: $light-text-color;
    }

    input {
        font: unset;
        outline: none;
        font-size: 1.5em;
    }

    .todo-btn-container {
        display: grid;
        gap: 5px;
        grid-template-columns: 50% 50%;

        .todo-btn {
            border: 1px lightgray solid;
            padding: 2px 6px;
            font-size: 1.5em;
            width: 100%;
        }

        .edit-btn {
            color: darken(grey, 30%);
        }

        .confirm-del-btn {
            background: lighten(red, 25%);
            border-color: lighten(red, 20%);
        }
    }

    &.editing {

        .edit-btn {
            background: darken(lightgreen, 10%);
            border-color: darken(lightgreen, 20%);
        }
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