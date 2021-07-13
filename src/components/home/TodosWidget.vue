<template>
    <div class="todos-widget-container widget">
        <Todos :showCompleted="false" />
    </div>
</template>

<script>
import Todos from "@/components/todoList/Todos"

export default {
    name: 'TodosWidget',
    components: {
		Todos,
	},
}
</script>

<style>

</style>