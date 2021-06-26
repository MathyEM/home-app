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
		<CustomInputTag :value="newTodoCategories" v-on:input="setNewTodoCategories" />
    </div>
</template>

<script>
import { mapActions } from 'vuex';
import CustomInputTag from './CustomInputTag.vue';

export default {
	name: "AddTodo",
	components: {
		CustomInputTag,
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
		}
	}
}
</script>

<style lang="scss">
div.new-todo {
	display: grid;
	grid-template-columns: 9fr 1fr;
	grid-template-areas:
		'summary add_btn'
		'categories categories';

	#new-todo {
		width: 100%;
		font-size: 2rem;
		padding: 2px;
		margin: 0;
		outline: none;
		grid-area: summary;
	}
	.new-todo-category {
		grid-area: categories;
		$font-size: 1.5rem;

		.input-tag {
			font-size: $font-size;
		}
		.new-tag {
			font-size: $font-size;
		}
	}
	.add-todo-btn {
		grid-area: add_btn;
		// font-weight: bold;
		font-size: 2rem;
		padding: 0 0.5em;
	}
}
</style>