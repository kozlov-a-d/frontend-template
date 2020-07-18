<template>
    <div>
        <section class="section">
            <div class="section__container">
                <div class="section__header">
                    <h2 class="section__heading">{{details.header.heading}}</h2>
                </div>
                <div class="section__content">
                    <!-- <p>{{details}}</p> -->
                    <div v-for="element in details.content.elements" :key="element.id">
                        <template v-if="element.type == 'element-text'">
                            <elementText v-if="element.enable" v-bind:details="element.data" />
                        </template>
                        <template v-if="element.type == 'element-gallery'">
                            <elementGallery v-if="element.enable" v-bind:details="element.data" />
                        </template>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
    import elementText from './element-text';
    import elementGallery from './element-gallery';
    export default {
        props: ['details'],
        components: {
            elementText,
            elementGallery
        },
        data() {
            return {
            };
        }
    };
</script>

<style>
    .center {
        text-align: center;
    }
</style>