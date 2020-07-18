<template>
<div class="l-container">
    <div class="builder">
        <div class="builder__list">

            <div class="builder__block" v-for="block in blocks" :key="block.id" v-bind:class="{ isEditor: block.mode === 'editor'  }">
                <div class="builder__block--panel block-panel">
                    <label class="block-panel__btn-collapse">
                        <input type="checkbox" v-model="block.collapse">
                        <span>{{ block.collapse ? 'Show' : 'Collapse'}}</span>
                    </label>
                    <button class="block-panel__btn-toggle-mode" v-on:click="toggleModeBlock(block.id)">{{ block.mode === 'editor' ? 'Preview' : 'Editor'}}</button>
                    <button class="block-panel__btn-remove" v-on:click="removeBlock(block.id)">Remove</button>
                </div>

                <template v-if="block.type == 'block-custom'">
                    <div v-if="block.mode == 'preview'" class="block">
                        <blockCustom v-bind:details="block.data" />
                    </div>

                    <div v-if="block.mode == 'editor'" class="block-editor">
                        <p class="block-editor__title">Block "{{block.name}}"</p>
                        <template v-if="!block.collapse">
                        <div class="builder-form">

                            <div class="builder-form-item">
                                <label class="builder-form-item__label">Name</label>
                                <div class="builder-form-item__field">
                                    <input v-model="block.name" type="text">
                                </div>
                                <div class="builder-form-item__description"></div>
                            </div>

                            <div class="builder-form__br"></div>

                            <p class="builder-form-elements__item-title">Block Header:</p>
                            <div class="builder-form__item">
                                <div class="builder-form-item">
                                    <label class="builder-form-item__label">Enable Header</label>
                                    <div class="builder-form-item__field">
                                        <label class="builder-form-item-checkbox">
                                            <input v-model="block.data.header.enable" type="checkbox">
                                            <span></span>
                                        </label>
                                    </div>
                                    <div class="builder-form-item__description"></div>
                                </div>
                            </div>
                            <div class="builder-form__item" v-if="block.data.header.enable">
                                <div class="builder-form-item">
                                    <label class="builder-form-item__label">Block Heading H2</label>
                                    <div class="builder-form-item__field">
                                        <input v-model="block.data.header.heading" type="text">
                                    </div>
                                    <div class="builder-form-item__description"></div>
                                </div>
                            </div> 

                            <div class="builder-form__br"></div>

                            <p class="builder-form-elements__item-title">Content:</p>
                            <!-- <div class="builder-form-item">
                                <label class="builder-form-item__label">Enable block content</label>
                                <div class="builder-form-item__field">
                                    <label class="builder-form-item-checkbox">
                                        <input v-model="block.data.content.enable" type="checkbox">
                                        <span></span>
                                    </label>
                                </div>
                                <div class="builder-form-item__description"></div>
                            </div> -->

                            <div class="builder-form__elements">
                                <div class="builder-form-elements">
                                    
                                    <div class="builder-form-elements__item" v-for="element in block.data.content.elements" :key="element.id" v-bind:class="{ disabled: !element.enable }">
                                        <div class="builder-form__item">

                                            <div class="builder-form-elements__panel block-panel">
                                                <label class="block-panel__btn-collapse">
                                                    <input type="checkbox" v-model="element.enable">
                                                    <span>{{ element.enable ? 'Is Enabled' : 'Is Disabled'}}</span>
                                                </label>
                                                <button class="block-panel__btn-edit" v-on:click="editElement(block.id, element.id)">Edit</button>
                                                <button class="block-panel__btn-remove" v-on:click="removeElement(block.id, element.id)">Remove</button>
                                            </div>

                                            <p class="builder-form-elements__item-title">{{element.name}}</p>
                                            
                                            <template v-if="!element.collapse">
                                                <div class="builder-form__item">
                                                    <div class="builder-form-item">
                                                        <label class="builder-form-item__label">Enable</label>
                                                        <div class="builder-form-item__field">
                                                            <label class="builder-form-item-checkbox">
                                                                <input v-model="element.enable" type="checkbox">
                                                                <span></span>
                                                            </label>
                                                        </div>
                                                        <div class="builder-form-item__description"></div>
                                                    </div>
                                                </div>
                                                <div class="builder-form__item">
                                                    <div class="builder-form-item">
                                                        <label class="builder-form-item__label">Name</label>
                                                        <div class="builder-form-item__field">
                                                            <input v-model="element.name" type="text">
                                                        </div>
                                                        <div class="builder-form-item__description"></div>
                                                    </div>
                                                </div>
                                                <div class="builder-form__item" v-for="(item, index) in element.data" v-bind:key="item.id">
                                                    <div class="builder-form-item">
                                                        <label class="builder-form-item__label">{{index}}</label>
                                                        <div class="builder-form-item__field">
                                                            <textarea v-model="element.data[index]"></textarea>
                                                        </div>
                                                        <div class="builder-form-item__description"></div>
                                                    </div>
                                                </div>
                                            </template>
                                        </div> 
                                    </div>
                                </div>
                                <div class="add-elements">
                                    <div class="add-elements__text">Add Elements</div>
                                    <div class="add-elements__btns">
                                        <button class="add-elements__btn" v-on:click="addElement(block.id, 'element-text')">Add Text</button>
                                        <button class="add-elements__btn" v-on:click="addElement(block.id, 'element-gallery')">Add Gallery</button>
                                    </div>
                                </div>
                                
                            </div>
                        </div>
                        </template>
                    </div>
                </template>
            </div>

        </div>

        <button class="builder__btn-add-block" v-on:click="addblock">Add block</button>
    </div>
    <!-- <builderModalEditElement /> -->
</div>
</template>

<script>
    import blockCustom from './components/block-custom';
    import builderModalEditElement from './components/builder-modal-edit-element';

    export default {
        data() {
            return {
                modeEditor: true, 
                blocks: []
            };
        },
        components: {
            blockCustom,
            builderModalEditElement
        },
        methods: {
            addblock:  function() {
                this.blocks.push({
                    id: Date.now(),
                    type: 'block-custom',
                    mode: 'editor',
                    name: 'Custom Block',
                    collapse : false,
                    data: {
                        header: {
                            enable: true,
                            heading: 'Heading H2'
                        },
                        content: {
                            enable: true,
                            elements: []
                        }
                    }
                }); 
            },
            removeBlock: function(blockId) {
                this.blocks.forEach((block, index) => {
                    if (block.id === blockId) this.blocks.splice(index, 1);
                });
            },
            toggleModeBlock: function(blockId) {
                this.blocks.forEach((block, index) => {
                    if (block.id === blockId) {
                        if (block.mode === 'editor') block.mode = 'preview'
                        else block.mode = 'editor'
                        console.log(block.mode);
                    };
                });
            },
            addElement: function(blockId, type) {
                let element = {};
                if (type === 'element-text') {
                    element = {
                        id: Date.now(),
                        type: 'element-text',
                        name: 'Element type "element-text"',
                        enable: true,
                        collapse : true,
                        data: {
                            value: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Augue interdum velit euismod in pellentesque massa placerat duis ultricies. Urna id volutpat lacus laoreet non curabitur gravida arcu. Nulla malesuada pellentesque elit eget gravida cum sociis natoque. Mi sit amet mauris commodo. In metus vulputate eu scelerisque felis imperdiet. Laoreet suspendisse interdum consectetur libero id. Amet tellus cras adipiscing enim. Pharetra diam sit amet nisl. Pharetra pharetra massa massa ultricies mi quis hendrerit dolor magna. Eleifend quam adipiscing vitae proin sagittis.'
                        }
                    }
                }
                if (type === 'element-gallery') {
                    element = {
                        id: Date.now(),
                        type: 'element-gallery',
                        name: 'Element type "element-gallery"',
                        enable: true,
                        collapse : true,
                        data: {
                            value: "Sorry, it's demo"
                        }
                    }
                }
                this.blocks.forEach((block, index) => {
                    if (block.id === blockId) {
                        block.data.content.elements.push(element);
                    };
                });
            },
            editElement(blockId, elementId) {
                // this.blocks.forEach((block, index) => {
                //     if (block.id === blockId) {
                //         block.data.content.elements.forEach((element, index) => {
                //             if (element.id === elementId) block.data.content.elements.splice(index, 1);
                //         });
                //     };
                // });
                console.log('edit element')
            },
            removeElement(blockId, elementId) {
                this.blocks.forEach((block, index) => {
                    if (block.id === blockId) {
                        block.data.content.elements.forEach((element, index) => {
                            if (element.id === elementId) block.data.content.elements.splice(index, 1);
                        });
                    };
                });
            }
        }
    };
</script>

<style lang="scss" scoped>

.builder{

    &__block{
        margin: 20px 0;
        position: relative;
        border: 2px solid transparent;
        overflow: hidden;
        transition: all 0.3s ease;

        &.isEditor,
        &:hover {
            border: 2px solid #3f8fff;
            border-radius: 6px;
        }

        &--panel{
            position: absolute;
            right: 0;
            top: 0;
            background: #3f8fff29;
            border-bottom: 2px solid #3f8fff;
            border-left: 2px solid #3f8fff;
            border-radius: 0 0 0 6px;
            opacity: 0;
            pointer-events: none;
            transition: all 0.3s ease;
        }

        &.isEditor &,
        &:hover &{

            &--panel{
                opacity: 1;
                pointer-events: auto;
            }
        }
    }

    &__btn-add-block{
        display: block;
        margin: 20px 0;
        width: 100%;
        height: 60px;
        text-align: center;
        background: #fff;
        border: 2px dashed #3f8fff;
        border-radius: 6px;
        color: #3f8fff;
        font-size: 18px;
        font-weight: bold;
        transition: all 0.3s ease;
        cursor: pointer;

        &:hover{
            background: #3f8fff;
            border: 2px solid #3f8fff;
            color: #fff;
        }
    }
}

.block-panel{
    display: flex;
    padding: 10px 10px;

    &__btn-toggle-mode{
        display: block;
        margin: 0 10px;
        width: 100%;
        height: 24px;
        text-align: center;
        background: #fff;
        border: 2px solid #3f8fff;
        border-radius: 3px;
        color: #3f8fff;
        font-size: 12px;
        font-weight: bold;
        transition: all 0.3s ease;
        cursor: pointer;
        white-space: nowrap;

        &:hover{
            background: #3f8fff;
            border: 2px solid #3f8fff;
            color: #fff;
        }
    }

    &__btn-edit{
        display: block;
        margin: 0 10px;
        width: 100%;
        height: 24px;
        text-align: center;
        background: #fff;
        border: 2px solid #3f8fff;
        border-radius: 3px;
        color: #3f8fff;
        font-size: 12px;
        font-weight: bold;
        transition: all 0.3s ease;
        cursor: pointer;
        white-space: nowrap;

        &:hover{
            background: #3f8fff;
            border: 2px solid #3f8fff;
            color: #fff;
        }
    }

    &__btn-remove{
        display: block;
        margin: 0 10px;
        width: 100%;
        height: 24px;
        text-align: center;
        background: #fff;
        border: 2px solid #ff3f3f;
        border-radius: 3px;
        color: #ff3f3f;
        font-size: 12px;
        font-weight: bold;
        transition: all 0.3s ease;
        cursor: pointer;

        &:hover{
            background: #ff3f3f;
            border: 2px solid #ff3f3f;
            color: #fff;
        }
    } 
    
    &__btn-collapse{
        display: block;
        margin: 0 10px;
        padding: 0 10px;
        width: 100%;
        height: 24px;
        text-align: center;
        background: #fff;
        border: 2px solid #3f8fff;
        border-radius: 3px;
        color: #3f8fff;
        font-size: 12px;
        font-weight: bold;
        transition: all 0.3s ease;
        white-space: nowrap;
        cursor: pointer;

        &:hover{
            background: #3f8fff;
            border: 2px solid #3f8fff;
            color: #fff;
        }

        input[type="checkbox"] {
            display: none;
        }
    }
}

.block-editor{
    padding: 20px;

    &__title{
        font-size: 22px;
    }   
}

.builder-form{
    padding: 1px 0;

    &__item{
        margin: 10px 0;
    }

    &__br{
        margin: 30px 0;
        border: 1px solid #3f8fff29;
    }
}

.builder-form-item{
    display: flex;
    align-items: top;

    &__label{
        width: 200px;
        text-align: right;
        padding: 8px 20px 8px 0;
        line-height: 24px;
    }

    &__field{
        // width: 500px;
        width: 100%;

        input[type="text"] {
            width: 100%;
            height: 40px;
            padding: 0 10px;
            background: #fff;
            border: 1px solid #3f8fff8a;
            border-radius: 3px;
            transition: all 0.3s;

            &:hover,
            &:focus{
                background: #3f8fff29;
                border: 1px solid #3f8fff;
            }
        }

        textarea {
            width: 100%;
            height: 140px;
            padding: 10px 10px;
            background: #fff;
            border: 1px solid #3f8fff8a;
            border-radius: 3px;
            transition: all 0.3s;

            &:hover,
            &:focus{
                background: #3f8fff29;
                border: 1px solid #3f8fff;
            }
        }
    }

    &__description{
        // padding: 0 0 0 20px;
    }
}

.builder-form-elements{

    &__item{
        margin: 10px 0 10px;
        padding: 1px 20px;
        border: 2px solid #3f8fff8a;
        border-radius: 6px;
        position: relative;

        &-title{
            font-size: 19px;
        }

        &.disabled{
            filter: grayscale(100%);
            opacity: 0.4;
        }
    }

    &__panel{
        position: absolute;
        right: 0;
        top: 0;
        background: #3f8fff29;
        border-bottom: 2px solid #3f8fff8a;
        border-left: 2px solid #3f8fff8a;
        border-radius: 0 0 0 6px;
        transition: all 0.3s ease;
    }

}

.add-elements{
    display: block;
    margin: 20px 0;
    padding: 15px;
    width: 100%;
    background: #fff;
    border: 2px dashed #3f8fff;
    border-radius: 6px;
    color: #3f8fff;
    transition: all 0.3s ease;

    &:hover & {
        &__text{
             display: none;
        }
        &__btns{
            display: block;
        }
    }

    &__text{
        display: block;
        font-size: 16px;
        font-weight: 600;
        text-align: center;
        line-height: 40px;
    }

    &__btns{
        display: none;
        text-align: center;
    }

    &__btn{
        margin: 0 6px;
        padding: 0 15px;
        font-size: 16px;
        font-weight: 600;
        text-align: center;
        height: 40px;
        background: #3f8fff;
        border: 2px solid #3f8fff;
        border-radius: 3px;
        color: #fff;
        transition: all 0.3s ease;
        cursor: pointer;

        &:hover{
            color: #3f8fff;
            background: #fff;
        }
    }
  
}

.builder-form-item-checkbox{
    display: block;
    max-width: 30px;

    input[type="checkbox"] {
        display: none;
    }

    input[type="checkbox"] + span{
            display: block;
            width: 30px;
            height: 30px;
            margin: 5px 0;
            background: #fff url("data:image/svg+xml,%3Csvg version='1.1' id='Layer_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 512 512' style='enable-background:new 0 0 512 512;' xml:space='preserve'%3E%3Cpath d='M504.502,75.496c-9.997-9.998-26.205-9.998-36.204,0L161.594,382.203L43.702,264.311c-9.997-9.998-26.205-9.997-36.204,0 c-9.998,9.997-9.998,26.205,0,36.203l135.994,135.992c9.994,9.997,26.214,9.99,36.204,0L504.502,111.7 C514.5,101.703,514.499,85.494,504.502,75.496z' fill='%23ffffff'/%3E%3C/svg%3E%0A") center center no-repeat;
            background-size: 60%;
            border: 1px solid #3f8fff8a;
            border-radius: 3px;
            transition: all 0.3s;
            cursor: pointer;

            &:hover,
            &:focus{
                background-color: #3f8fff29;
                border: 1px solid #3f8fff;
            }
    }

    input[type="checkbox"]:checked + span{
        background: #fff url("data:image/svg+xml,%3Csvg version='1.1' id='Layer_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 512 512' style='enable-background:new 0 0 512 512;' xml:space='preserve'%3E%3Cpath d='M504.502,75.496c-9.997-9.998-26.205-9.998-36.204,0L161.594,382.203L43.702,264.311c-9.997-9.998-26.205-9.997-36.204,0 c-9.998,9.997-9.998,26.205,0,36.203l135.994,135.992c9.994,9.997,26.214,9.99,36.204,0L504.502,111.7 C514.5,101.703,514.499,85.494,504.502,75.496z' fill='%233f8fff'/%3E%3C/svg%3E%0A") center center no-repeat;
        background-size: 60%;
        border: 1px solid #3f8fff;
    }
}
</style>