function throttle(delay: number) {
    return (target: Object, propertyKey: string, descriptor: TypedPropertyDescriptor<Function>) => {
        let func: Function = descriptor.value;

        let lastCall = 0;
        let throttled = (...args: any[]): void => {
            
            const now = Date.now();
            if( now - lastCall < delay) return;
            lastCall = now;
            func.apply(target, args);
            
        }

        descriptor.value = throttled;
    }
}

export { throttle }