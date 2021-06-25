<template>
    <li class="todo-item" v-on:click.self="toggleCompleted" :class="{ editing: editing }">
        <div v-if="!editing" class="todo-info">
            <p
                v-on:click.self="toggleCompleted"
                class="todo-summary"
                :class="{ completed: todo.completed }"
            >{{ todo.summary }}
            </p>
            <ul class="categories-list">
                <li v-for="(category, index) in categories" class="category-item" :key="index">
                    <span>{{category}}</span>
                </li>
            </ul>
        </div>
        <div v-else class="inputs">
            <input
                type="text"
                name="updatedTodo"
                id="updatedTodo"
                maxlength="25"
                :value="todo.summary"
                v-on:keyup.enter.self="editing = false"
                v-on:blur="updateSummary"
                v-focus
            >
        </div>
        <div class="todo-btn-container">
            <button v-if="!editing" v-on:click="editing = true" class="edit-btn todo-btn" :disabled="disabled">✎</button>
            <button v-else class="edit-btn todo-btn">✎</button>
            <button v-if="!deleting" @click="deleteConfirmation" class="delete-btn todo-btn">🗑</button>
            <button v-else @click="doDelete" class="delete-btn confirm-del-btn todo-btn">🗑</button>
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
        },
        categories() {
            const categories = this.todo.categories
            if (categories == '') {
                return []
            }
            return categories.split(',')
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
        },
        deleteConfirmation() {
            this.deleting = true
            setTimeout(() => this.deleting = false, 5000)
        },
        async doDelete() {
            await this.deleteTodo(this.todo)
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
$light-text-color: rgb(235, 235, 235);

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

    .todo-info {
        align-self: baseline;
    }

    .todo-summary {
        font-size: 1.5em;
    }

    &:nth-child(odd) {
        background: $todo-color
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

    .categories-list {
        list-style: none;
        display: flex;
        gap: 5px;

        .category-item {
            display: inline;
            padding: 0.125em 0.25em;
            border-radius: 3px;
            background: darken($todo-color, 10);
        }
    }

    &:hover {
        $new-color: darken($todo-color, 30);
        background: $new-color;
        color: lighten($new-color, 30);

        .category-item {
            $new-color2: darken($new-color, 15);
            background: $new-color2;

            &:hover {
                background: lighten($new-color2, 2);
                color: lighten($new-color, 35);
            }
        }
    }
}
</style>