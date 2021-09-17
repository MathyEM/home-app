<template>
	<div class="todo-list-container">
		<AddTodo />
		<Todos :showCompleted="true" />
		<TodoStatus />
	</div>
</template>
<script>
import AddTodo from "@/components/todoList/AddTodo"
import Todos from "@/components/todoList/Todos"
import TodoStatus from "@/components/todoList/TodoStatus"

export default {
	name: "TodoList",
	components: {
		AddTodo,
		Todos,
		TodoStatus,
	},
	computed: {

	},
	data() {
		return {
		}
	},
	methods: {
		
	},
	async created() {

	},
	mounted() {
		
	},
}
</script>

<style lang="scss">
	.todo-list-container {
		margin: 0 auto;
		font-size: 24px;
		width: 80%;
	}
</style>