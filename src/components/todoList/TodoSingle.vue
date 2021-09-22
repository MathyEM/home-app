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
            <CustomInputTag :value="categories" v-on:input="setUpdatedTodoCategories" :editing="editing" />
        </div>
        <div class="todo-btn-container">
            <button
                v-if="!editing"
                v-on:click="editing = true"
                class="edit-btn todo-btn"
                :disabled="disabled"
            ></button>
            <button
                v-else
                class="edit-btn todo-btn editing"
                v-on:click="editTodo"
            ></button>

            <button
                v-if="!deleting && editing"
                @click="deleteConfirmation"
                class="delete-btn todo-btn"
            ></button>
            <button
                v-else-if="deleting && editing"
                @click="doDelete"
                class="delete-btn confirm-del-btn todo-btn"
            ></button>
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
$edit-btn-color: darken(lightgreen, 10%);
$del-btn-color: lighten(red, 25%);

p.completed {
    text-decoration: line-through;
}
.todo-item {
    $font-size: 1.6em;
    font-size: $font-size;
    padding: 0.5em 1em;
    gap: 0.5em;
    cursor: pointer;
    display: grid;
    grid-template-columns: auto min-content;
    align-items: flex-start;
    justify-content: space-between;
    min-height: 5em;

    .todo-info {
        align-self: baseline;
    }

    .todo-summary, #updatedTodo {
        font: unset;
        border: none;
        outline: none;
        color: darken($base-font-color, 4%);
        width: 100%;
        font-size: $font-size;
        padding: 0.3em;
    }

    .categories-list {
        padding: 0.4em
    }

    &:nth-child(odd) {
        background: $todo-color
    }

    .todo-btn-container {
        display: flex;
        flex-direction: column;
        align-content: flex-start;
        align-items: flex-end;
        justify-content: space-between;
        justify-self: flex-end;
        gap: 0.4em;
        height: 100%;

        .todo-btn {
            border: 1px rgba(169, 169, 169, 0.8) solid;
            font-size: 1rem;
            width: 8em;
            aspect-ratio: 1;

            &::before {
                content: "";
                position: absolute;
                top: 0;
                right: 0;
                bottom: 0;
                left: 0;
                background: transparentize(darkgray, 0.8);
            }
        }

        .edit-btn {
            position: relative;
            background: url('~@/assets/img/edit-button.svg');
            fill: darken($edit-btn-color, 30%);
            background-size: 80%;
            background-repeat: no-repeat;
            background-position: center;

        }

        .delete-btn {
            position: relative;
            color: darken($del-btn-color, 30%);
            background: url('~@/assets/img/bin.svg');
            background-size: 80%;
            background-repeat: no-repeat;
            background-position: center;
        }

        .confirm-del-btn::before {
            background: transparentize($del-btn-color, 0.6);
            border-color: lighten(red, 20%);
        }
    }

    &.editing {

        .edit-btn::before {
            background: transparentize($edit-btn-color, 0.8);
            border-color: darken(lightgreen, 20%);
        }

        .vuetagger {
            .vuetagger-list {
                font-size: $font-size*0.9;
            }
            .vuetagger-input {
                font-size: $font-size*0.8;
            }
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
        padding-bottom: 0.5em;
        font-size: $font-size*0.9;

        .category-item {
            display: inline;
            padding: 0.125em 0.25em;
            border-radius: 3px;
            background: darken($todo-color, 10);
        }
    }
    
    .inputs {
        border: 1px solid lightgray;
    }
}
</style>