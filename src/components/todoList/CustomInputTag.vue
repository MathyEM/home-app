<template>
    <VueTagger
        :value="value"
        @change="emitCategories"
        pattern="^(?!\s*$).+"
        class="category-input"
        ref="vuetagger"
    />
</template>

<script>
import VueTagger from 'vuetagger'

export default {
    name: "CustomInputTag",
    props: {
        value: {
            type: Array,
            required: true,
        },
        editing: {
            type: Boolean,
        }
    },
    data() {
        return {
            placerholder: "Netto, Rema 1000, Føtex..."
        }
    },
    components: {
        VueTagger,
    },
    methods: {
		emitCategories(e) {
            var tags = [];
            for (const i in e) {
                if (Object.hasOwnProperty.call(e, i)) {
                    const tag = e[i];
                    const newTag = tag.charAt(0).toUpperCase() + tag.slice(1);
                    tags.push(newTag)
                }
            }
            this.$emit('input', tags)
            // this.$refs.vuetagger
		},
        setPlaceholder() {
            this.$refs.vuetagger.$el.querySelector('.vuetagger-input').setAttribute('placeholder', this.placerholder)
        }
    },
    mounted() {
        this.setPlaceholder();
    }
}
</script>

<style lang="scss">
.category-input .vuetagger {
    padding: 0;
    $new-padding: 0.4em;
    $new-font-size: 1.6em;

    .vuetagger-list {
        text-align: left;
        padding: $new-padding;
        font-size: $new-font-size*1.2;
        background: white;
        display: flex;
        flex-wrap: wrap;
        gap: 0.2em;

        .vuetagger-tag {
            position: relative;
            padding-right: 1em;

            &::first-letter {
                text-transform: uppercase;
            }

            .vuetagger-tag-remover {
                position: absolute;
                top: 0;
                right: 0;
                width: 100%;
                text-align: right;

                &:hover {
                    background: transparent;
                    color: gray;
                }
            }
        }
    }
    .vuetagger-input {
        padding: $new-padding;
        padding-left: $new-padding*1.4;
        font-size: $new-font-size;
        color: $base-font-color;
        border: none;
        border-top: 1px solid $border-color;
    }
}
.todo-item.editing {
    .vuetagger {
        border: none;
        border-top: 1px solid $border-color;
    }
}
</style>