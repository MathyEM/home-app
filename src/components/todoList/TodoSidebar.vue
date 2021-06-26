<template>
<div class="todo-sidebar-container">
    <label class="toggle-sidebar-label" for="toggle-sidebar">
        <a class="toggle-sidebar-btn">☰</a>
    </label>
    <input type="checkbox" name="toggle-sidebar" id="toggle-sidebar" class="toggle-sidebar">
    <div class="todo-sidebar">
        <section class="todos">
            <div class="todo" v-for="(todoSource, index) in todoSources" :key="index">
                <div class="checkbox-title">
                    <label>
                        <input
                            :id="todoSource.id + index"
                            name="active-todo-source"
                            type="radio"
                            class="radio-btn"
                            :checked="todoSource.id == activeTodoSource.id"
                            v-bind:value="todoSource.id"
                            v-on:input="test"
                        >
                    </label>
                    <label :for="todoSource.id + index">
                        <p>{{ todoSource.name }}</p>
                    </label>
                </div>
                <v-swatches 
                    v-model="todoSource.color"
                    v-on:input="changeTodoSourceColor(index, todoSource.id, $event)"
                    :swatches="swatches"
                    row-length="3"
                    popover-x="right"
                ></v-swatches>
            </div>
        </section>
    </div>
</div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'

import VSwatches from 'vue-swatches'

// Import the styles too, typically in App.vue or main.js
import 'vue-swatches/dist/vue-swatches.css'

export default {
	name: "TodoSidebar",
	components: {
		VSwatches,
	},
	props: {
	},
	data() {
		return {

		}
	},
	computed: {
		...mapGetters(['defaultColorSwatches', 'todoSources', 'activeTodoSource']),
        swatches() { return this.defaultColorSwatches },
	},
	watch: {
		
	},
	methods: {
		...mapActions(['setLocalStorageEventSourceColors', 'getTodos']),
        ...mapMutations(['CHANGE_TODO_SOURCE']),
        changeTodoSourceColor(index, id, event) {
            return console.log("changeTodoSourceColor", index, id, event);
        },
        test(e) {
            const id = e.target.value
            console.log(id)
            this.CHANGE_TODO_SOURCE(id)
            this.getTodos()
        }
	},
	mounted() {
		this.$nextTick().then(() => {
			// let html = `<label class="toggle-sidebar-label" for="toggle-sidebar">
			// 			<a class="toggle-sidebar-btn">☰</a>
			// 		</label>`
			// const template = document.createElement('template');
			// html = html.trim(); // Never return a text node of whitespace as the result
			// template.innerHTML = html;

			// const title = document.querySelector('.fc-toolbar-chunk .fc-toolbar-title')
			// title.parentNode.appendChild(template.content.firstChild)
			
		})
        document.addEventListener("click", function (event) {
            let checkbox = document.querySelector('#toggle-sidebar')
            if (!event.target.closest('.todo-sidebar') && !event.target.matches('.toggle-sidebar-btn') && checkbox.checked) {
                document.querySelector('.toggle-sidebar-btn').click()
            }
        })
	}
}
</script>

<style lang="scss">
.toggle-sidebar-btn {
	padding: 5px;
	text-decoration: none;
	cursor: pointer;
	font-size: 2rem;
	display: inline;
	user-select: none;
}
.fc .fc-toolbar-chunk .fc-toolbar-title {
	display: inline;
}
</style>
<style lang="scss" scoped>
.todo-sidebar-container {
	position: absolute;
	margin-top: 3rem;
}

section.todos {
	.todo {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 1em;
	}
}

.toggle-sidebar {
	visibility: hidden;
	height: 0;
	width: 0;

	&:checked {
		& ~ .todo-sidebar {
			display: block;
		}
	}
}

.todo-sidebar {
	position: absolute;
	z-index: 10;
	width: 300px;
	line-height: 1.5;
	background: #eaf9ff6b;
	border: 1px solid #d3e2e8;
	text-align: left;
	display: none;
    transform: translateX(-89%);

	.checkbox-title {
		display: grid;
		grid-template-columns: min-content auto;
		align-items: center;
		width: 100%;
		height: 100%;
		text-align: left;

		.checkbox, p {
			display: inline;
		}

		.checkbox {
			height: 1.5em;
			width: 1.5em;
			vertical-align: middle;
		}

		label {
			width: 100%;
			padding-right: 10px;
		}
	}

	section {
		padding: 2rem;
	}
}
</style>