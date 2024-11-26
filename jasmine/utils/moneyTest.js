import { formatCurrency } from "../../scripts/utils/money.js";


describe('test suite: formatCurrenct', () => {
    it('converts cents to dollars', () => {
        expect(formatCurrency(2095)).toEqual('20.95');
    });

    it('works with zero', () => {
        expect(formatCurrency(0)).toEqual('0.00');
    });

    it('works with decimal', () => {
        expect(formatCurrency(2000.4)).toEqual('20.00');
    });

    it('works with negative', () => {
        expect(formatCurrency(-2999)).toEqual('-29.99');
    });
});