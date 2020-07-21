export default class LazyLoadImagesModule {
    private static instance: LazyLoadImagesModule;
    images: NodeListOf<HTMLImageElement> | [];
    isActive: boolean;
    observer: IntersectionObserver | null;

    private constructor() {
        this.isActive = false;
        if ('IntersectionObserver' in window) {
            this.isActive = true;
            this.observer = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const image = entry.target as HTMLImageElement;
                        image.src = image.dataset.src;
                        image.onerror = () => {
                            console.error(`[Error] LazyLoadImagesModule not found image ${image.src},`, image);
                        };
                        image.classList.add('is-show');
                        this.observer.unobserve(image);
                    }
                });
            });
        }
    }

    public use(selector: string): void {
        this.images = document.querySelectorAll(selector);
        if (this.isActive) {
            this.images.forEach((image) => {
                this.observer.observe(image);
            });
        } else {
            console.warn(`[Warn] IntersectionObserver not found, LazyLoadImagesModule is disabled`);
            this.images.forEach((image) => {
                image.classList.add('is-show');
                image.src = image.dataset.src;
            });
            this.images = [];
            return;
        }
    }

    public static getInstance(): LazyLoadImagesModule {
        if (!LazyLoadImagesModule.instance) LazyLoadImagesModule.instance = new LazyLoadImagesModule();
        return LazyLoadImagesModule.instance;
    }
}
