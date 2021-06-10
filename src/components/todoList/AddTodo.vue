<template>
	<div class="new-todo">
        <input 
            type="text"
            name="new-todo"
            id="new-todo"
            placeholder="Tilføj en ting"
			v-model="newTodo"
        >
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
		...mapMutations(['addTodo']),
		newTodo: {
			get () {
				return this.newTodoInput
			},
			set () {
				this.addTodo(newTodoInput)
				return this.newTodoInput = ""
			}
		}
	}
}
</script>

<style lang="scss" scoped>

</style>