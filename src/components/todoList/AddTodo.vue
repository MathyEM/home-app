<template>
	<div class="new-todo">
		<input
			type="text"
			name="new-todo"
			id="new-todo"
			placeholder="Tilføj en ting"
					v-model="newTodoSummary"
					v-on:keydown.enter="createTodo"
		>
		<button class="add-todo-btn" @click="createTodo">+</button>
		<CustomInputTag :value="newTodoCategories" v-on:input="setNewTodoCategories" ref="customInput" />
		<TodoSidebar id="todo-sidebar" />
    </div>
</template>

<script>
import { mapActions } from 'vuex'
import CustomInputTag from './CustomInputTag.vue'
import TodoSidebar from "./TodoSidebar"

export default {
	name: "AddTodo",
	components: {
		CustomInputTag,
		TodoSidebar,
	},
	data() {
		return {
			newTodoSummary: "",
			newTodoCategories: [],
		}
	},
	computed: {

	},
	methods: {
		...mapActions(['addTodo']),
		setNewTodoCategories(e) {
			this.newTodoCategories = e
			console.log();
		},
		createTodo() {
			const summary = this.newTodoSummary.trim()
			const categories = this.newTodoCategories.join(",")
			if (summary == "") {
				return
			}
			let payload = {}
			payload.summary = summary
			payload.categories = categories
			this.addTodo(payload)

			// Reset inputs
			this.newTodoSummary = ""
			this.newTodoCategories = []
			this.$refs.customInput.$refs.vuetagger.tags = []
		}
	}
}
</script>

<style lang="scss">
div.new-todo {
	display: grid;
	grid-template-columns: auto max-content;
	grid-template-areas:
		'summary add_btn'
		'categories sidebar';

	#new-todo {
		width: 100%;
		font-size: 3.4em;
		padding: 0.05em;
		padding-left: 0.2em;
		margin: 0;
		outline: none;
		grid-area: summary;
		color: $base-font-color;
	}
	.new-todo-category {
		grid-area: categories;
		$font-size: 1.5em;

		.input-tag {
			font-size: $font-size;
		}
		.new-tag {
			font-size: $font-size;
		}
	}
	.add-todo-btn {
		grid-area: add_btn;
		font-size: 4rem;
		width: 2em;
		aspect-ratio: 1;
	}
	#todo-sidebar {
		grid-area: sidebar;
		font-size: 2rem;
		width: 4em;
		aspect-ratio: 1;
	}

	.vuetagger-list {
		height: 4rem;
	}
}
</style>