<template>
<InputTag
    :value="value"
    :before-adding="beforeAddingTag"
    v-on:input="emitCategories"
    :validate="/^(?!\s*$).+/"
    :add-tag-on-blur="true"
    class="new-todo-category"
    placeholder="Tilføj kategori" />
</template>

<script>
import InputTag from 'vue-input-tag'

export default {
    name: "CustomInputTag",
    props: {
        value: {
            type: Array,
            required: true,
        },
    },
    data() {
        return {
        }
    },
    components: {
        InputTag,
    },
    methods: {
        beforeAddingTag(tag) {
			return tag.trim().replace(/\s+/g, ' ')
		},
		emitCategories(e) {
            this.$emit('input', e)
		}
    }
}
</script>

<style lang="scss">
.vue-input-tag-wrapper.new-todo-category {
    padding: 0.5rem;
    gap: 4px;

    .input-tag {
        display: flex;
        align-items: center;
        position: relative;
        padding: 0 3px;
        padding-right: 0.875em;
        margin: 0;
        height: fit-content;

        .remove {
            position: absolute;
            display: inline-flex;
            right: 0;
            width: 100%;

            &::before {
                padding: 0 4px;
                width: 100%;
                display: flex;
                flex-direction: row-reverse;
            }
        }
    }

    .new-tag {
        margin: 0;
        padding: 0;
        padding-right: 4px;
        flex-grow: 0;
    }
}
</style>