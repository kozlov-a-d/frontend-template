/**
 * Debouncing
 * Декоратор позволяет превратить несколько вызовов функции в течение определенного времени в один вызов,
 * причем задержка начинает заново отсчитываться с каждой новой попыткой вызова.
 * Возможно два варианта:
 * - Реальный вызов происходит только в случае, если с момента последней попытки прошло время,
 *   большее или равное задержке.
 * - Реальный вызов происходит сразу, а все остальные попытки вызова игнорируются, пока не пройдет время,
 *   большее или равное задержке, отсчитанной от времени последней попытки.
 */
export const debounce = (func: Function, ms: number) => {
    let isCooldown = false;

    return function() {
        if (isCooldown) return;
        func.apply(this, arguments);
        isCooldown = true;
        setTimeout(() => (isCooldown = false), ms);
    };
};

/**
 * Throttling
 * Данный декоратор позволяет «затормозить» функцию — функция будет выполняться не чаще одного раза в указанный период,
 * даже если она будет вызвана много раз в течение этого периода.
 * Т.е. все промежуточные вызовы будут игнорироваться.
 */
export const throttle = (func: Function, ms: number) => {
    let isThrottled = false;
    let savedArgs: any;
    let savedThis: any;

    function wrapper() {
        if (isThrottled) {
            savedArgs = arguments;
            savedThis = this;
            return;
        }

        func.apply(this, arguments);

        isThrottled = true;

        setTimeout(() => {
            isThrottled = false;
            if (savedArgs) {
                wrapper.apply(savedThis, savedArgs);
                savedArgs = savedThis = null;
            }
        }, ms);
    }

    return wrapper;
};
