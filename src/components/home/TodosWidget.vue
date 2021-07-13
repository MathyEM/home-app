<template>
    <div class="todos-widget-container widget">
        <h3>Huskeseddel</h3>
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