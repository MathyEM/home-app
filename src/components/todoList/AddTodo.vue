<template>
	<div class="new-todo">
        <input 
            type="text"
            name="new-todo"
            id="new-todo"
            placeholder="Tilføj en ting"
			v-model="newTodoInput"
        >
		<button class="add-todo-btn" @click="addTodo">+</button>
    </div>
</template>

<script>
import { mapMutations } from 'vuex';

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
		...mapMutations(['addTodo']),

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