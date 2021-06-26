<template>
	<div class="todo-list-container">
		<TodoSidebar />
		<AddTodo />
		<Todos />
		<TodoStatus />
	</div>
</template>
<script>
import AddTodo from "../components/todoList/AddTodo"
import Todos from "../components/todoList/Todos"
import TodoStatus from "../components/todoList/TodoStatus"
import TodoSidebar from "../components/todoList/TodoSidebar"

import { mapActions } from "vuex";

export default {
	name: "TodoList",
	components: {
		AddTodo,
		Todos,
		TodoStatus,
		TodoSidebar,
	},
	computed: {

	},
	data() {
		return {
		}
	},
	methods: {
		...mapActions(['getTodos'])
	},
	async created() {

	},
	mounted() {
		this.getTodos()
	},
}
</script>

<style lang="scss" scoped>
	.todo-list-container {
		width: 500px;
		margin: 0 auto;
	}
	.todo-sidebar-container {
		transform: translateX(-100%);
	}
</style>