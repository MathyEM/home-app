<template>
    <li class="todo-item" v-on:click.self="toggleCompleted" :class="{ editing: editing }">
        <div v-if="!editing" class="todo-info">
            <p
                v-on:click.self="toggleCompleted"
                class="todo-summary"
                :class="{ completed: todo.completed }"
            >{{ todo.summary }}
            </p>
            <ul class="categories-list" v-on:click="toggleCompleted">
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
                v-on:keyup.enter.self="setUpdatedTodoSummary($event); editTodo()"
                v-on:blur="setUpdatedTodoSummary"
                v-focus
            >
            <CustomInputTag :value="categories" v-on:input="setUpdatedTodoCategories" />
        </div>
        <div class="todo-btn-container">
            <button
                v-if="!editing"
                v-on:click="editing = true"
                class="edit-btn todo-btn"
                :disabled="disabled"
            >✎</button>
            <button
                v-else
                class="edit-btn todo-btn editing"
                v-on:click="editTodo"
            >✎</button>

            <button
                v-if="!deleting"
                @click="deleteConfirmation"
                class="delete-btn todo-btn"
            >🗑</button>
            <button
                v-else
                @click="doDelete"
                class="delete-btn confirm-del-btn todo-btn"
            >🗑</button>
        </div>
    </li>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import CustomInputTag from './CustomInputTag.vue';


export default {
    name: 'TodoSingle',
    components: {
        CustomInputTag,
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
            disabled: false,
            updatedTodoSummary: '',
            updatedTodoCategories: this.todo.categories ? this.todo.categories.split(',') : []
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
        },
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
        setUpdatedTodoCategories(e) {
			this.updatedTodoCategories = e
		},
        setUpdatedTodoSummary(e) {
            this.updatedTodoSummary = e.target.value.trim().replace(/\s+/g, ' ')
        },
        editTodo() {
            this.disabled = true
            this.editing = false
            setTimeout(() => this.disabled = false, 300)

            const oldSummary = this.todo.summary
            const oldCategories = this.todo.categories
            const summary = this.updatedTodoSummary
            const categories = this.updatedTodoCategories.join(",")
            if (summary == '' || (oldSummary == summary && oldCategories == categories)) return

            const newTodo = this.todo
            newTodo.summary = summary
            newTodo.categories = categories
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

<style lang="scss">
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

    &.editing .inputs {
        width: calc(100% - 8px);
    }

    .todo-info {
        align-self: baseline;
    }

    .todo-summary {
        font-size: 1.5em;
        margin-bottom: 0.3rem;
    }

    &:nth-child(odd) {
        background: $todo-color
    }

    input {
        font: unset;
        outline: none;
        font-size: 1.5em;
        color: darken($base-font-color, 4%);
        width: 100%;
        border: none;
        padding: 0.3rem;
    }

    .todo-btn-container {
        display: grid;
        gap: 5px;
        grid-template-columns: 1fr 1fr;
        align-self: flex-start;

        .todo-btn {
            border: 1px lightgray solid;
            padding: 2px 6px;
            font-size: 1.5em;
            width: 1.75em;
            height: 1.75em;
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

    .new-todo-category {
		$font-size: 1.3rem;
		.input-tag {
			font-size: $font-size;
            padding-right: 1.2em;

            a.remove {
                font-size: $font-size*1.2;
            }
		}
		.new-tag {
			font-size: $font-size;
		}
        input {
            width: 100%;
        }
	}
}
</style>