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
.new-todo-category {
    .input-tag {
        display: flex;
        align-items: center;
        position: relative;
        padding-right: 0.875em;

        .remove {
            position: absolute;
            right: 0;
            top: 0;
            display: flex;
            width: 100%;
            height: 100%;

            &::before {
                padding: 0 4px;
                width: 100%;
                height: 100%;
                display: flex;
                flex-direction: row-reverse;
                align-items: center;
            }
        }
    }
}
</style>