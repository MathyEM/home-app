<template>
	<div class="new-todo">
        <div class="add-todo-inputs">
			<input
				type="text"
				name="new-todo"
				id="new-todo"
				placeholder="Tilføj en ting"
						v-model="newTodoInput"
						v-on:keydown.enter="createTodo(newTodoInput)"
			>
			<InputTag :add-tag-on-blur="true" class="new-todo-category" placeholder="Tilføj kategori" />
		</div>
		<button class="add-todo-btn" @click="createTodo(newTodoInput)">+</button>
    </div>
</template>

<script>
import { mapActions } from 'vuex';
import InputTag from 'vue-input-tag'

export default {
	name: "AddTodo",
	components: {
		InputTag,
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

<style lang="scss">
	div.new-todo {
		display: grid;
		grid-template-columns: minmax(auto, 80%) auto;
	}
	#new-todo {
		width: 100%;
		font-size: 2rem;
		padding: 2px;
		margin: 0;
		outline: none;
	}
	.new-todo-category {
		.input-tag {
			font-size: 1.5rem;
			position: relative;
			padding-right: 1em;

			.remove {
				position: absolute;
				right: 0;
				top: 0;
				display: flex;
				width: 100%;
				height: 100%;

				&::before {
					padding: 3px;
					width: 100%;
					height: 100%;
					display: flex;
					flex-direction: row-reverse;
				}
			}
		}
	
		.new-tag {
			font-size: 1.5rem;
		}
	}
	.add-todo-btn {
		// font-weight: bold;
		font-size: 2rem;
		padding: 0 0.5em;
	}
</style>