<template>
    <div class="todos-widget-container widget">
        <h2>Huskeseddel</h2>
        <div class="widget-content-container">
            <Todos :showCompleted="false" />
        </div>
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

<style lang="scss">
    .widget-content-container {
        .todo-list {
            .todo-item:not(:first-child) {
                border-top: 1px solid $border-color;
            }
        }
    }
</style>