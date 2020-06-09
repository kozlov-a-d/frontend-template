<template>
    <div class="modal">
        <div class="modal__wrapper">
            <div class="modal__bg js-modal-close"></div>
            <div class="modal__container">
                <button class="modal__btn-close js-modal-close">Close</button>
                <div class="modal__scroll">

                </div>
            </div>
            <div class="modal__loader"></div>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['details'],
        data() {
            return {
            };
        }
    };
</script>

<style lang="scss" scoped>
.modal {
    $bg-overlay: rgba(#000, 0.3);
    $bg-content: #fff;
    $close-btn: #000000;
    $close-btn-hover: #868b95;
    $time-open: 0.4s;
    $time-close: 0.6s;


    position: fixed;
    left: 0;
    top: 0;
    display: block;
    width: 100%;
    height: 100vh;
    z-index: 1000;

    &__wrapper {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100vh;
    }

    &__bg {
        position: absolute;
        left: 0;
        top: 0;
        display: block;
        width: 100%;
        height: 100%;
        background: $bg-overlay;
    }

    &__btn-close {
        display: block;
        position: absolute;
        right: 22px;
        top: 22px;
        font-size: 0;
        border: none;
        background: none;
        cursor: pointer;
        z-index: 20;

    }


    &__container {
        position: relative;
        width: 90%;
        max-width: 1024px;
        max-height: 100vh;
        overflow-y: auto;
        overflow-x: hidden;
        background: $bg-content;
        padding: 40px 20px;
        animation: overlay__container-show $time-open*2 ease-in-out;
        border-radius: 6px;
    }

    &__title {
        display: block;
        width: 100%;
        font-size: 30px;
        line-height: 40px;
        color: #000000;
        text-align: center;
        margin-bottom: 30px;
        margin-top: 0;

    }

    //  utilities
    &__scroll {
    }

    &__loader {
        position: absolute;
        left: 0;
        top: 0;
        display: block;
        width: 100%;
        height: 100%;
        // background: rgba($bg-overlay, 0.7) url('~images/loader.svg') center center no-repeat;
        background-size: 40px 40px;
    }

    animation: overlay-show $time-open ease-in-out;
    &.closing {
        animation: overlay-closing $time-close ease-in-out;
        .modal__container {
            animation: overlay__container-closing $time-close ease-in-out;
        }
    }
}

@keyframes overlay-show {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}

@keyframes overlay-closing {
    from{
        opacity: 1;
    }
    to {
        opacity: 0;
    }
}

@keyframes overlay__container-show {
    from{
        opacity: 0;
        transform: translate3d(0, 15px, 0);
    }
    to {
        opacity: 1;
        transform: none;
    }
}

@keyframes overlay__container-closing {
    from {
        opacity: 1;
        transform: none;
    }
    to {
        opacity: 0;
        transform: translate3d(0, 15px, 0);
    }
}

</style>