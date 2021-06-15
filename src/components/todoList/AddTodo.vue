<template>
	<div class="new-todo">
        <input 
            type="text"
            name="new-todo"
            id="new-todo"
            placeholder="Tilføj en ting"
			v-model="newTodoInput"
			v-on:keydown.enter="createTodo(newTodoInput)"
        >
		<button class="add-todo-btn" @click="createTodo(newTodoInput)">+</button>
    </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
	name: "AddTodo",
	components: {

	},
	data() {
		return {
			newTodoInput: "",
		}
	},
	computed: {

	},
	methods: {
		...mapActions(['addTodo']),
		createTodo(todoInput) {
			if (todoInput.trim() == "") {
				return
			}
			this.addTodo(todoInput.trim())
			this.newTodoInput = ""
		}
	}
}
</script>

<style lang="scss" scoped>
	#new-todo {
		font-size: 2rem;
	}
	.add-todo-btn {
		// font-weight: bold;
		font-size: 2rem;
		padding: 0 0.5em;
	}
</style>