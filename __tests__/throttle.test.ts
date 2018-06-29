import { throttle } from '../src';

class throttleTest {
    run() {}

    @throttle(100)
    work(a:number, b: number) {
        let c = a + b;
        this.run();
    }

    @throttle(100)
    second() {
        this.run();
    }
}

test('throttle a method', () => {
    const spy = jest.spyOn(throttleTest.prototype, 'run');
    const nowSpy = jest.spyOn(Date, 'now');

    let t = new throttleTest();
    
    nowSpy.mockImplementation(() => 1000);
    t.work(1, 2);
    nowSpy.mockImplementation(() => 1050);
    t.work(3, 4);
    nowSpy.mockImplementation(() => 1100);
    t.work(5, 6);

    expect(spy).toHaveBeenCalledTimes(2);
})

test('throttle two methods', () => {
    const spy = jest.spyOn(throttleTest.prototype, 'run');
    const nowSpy = jest.spyOn(Date, 'now');

    let t = new throttleTest();
    
    nowSpy.mockImplementation(() => 1000);
    t.work(1, 2);
    nowSpy.mockImplementation(() => 1010);
    t.second();

    nowSpy.mockImplementation(() => 1050);
    t.work(3, 4);
    nowSpy.mockImplementation(() => 1060);
    t.second();

    nowSpy.mockImplementation(() => 1100);
    t.work(5, 6);
    nowSpy.mockImplementation(() => 1110);
    t.second();

    expect(spy).toHaveBeenCalledTimes(4);
})