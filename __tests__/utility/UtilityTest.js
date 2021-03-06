/* eslint-disable no-undef */
const {
	typeSchemaMerger,
	isAlphabet,
	isDigit,
	serviceMerge,
	getStartChromeCommand,
	platforms
} = require('../../server/graphql/util');

describe('utilty test', () => {
	it('should only be digit', () => {
		expect(isDigit('1234567')).toBe(true);
		expect(isDigit(123)).toBe(true);
		expect(isDigit('12345X67')).toBe(false);

	});

	it('should only be Alphabet', () => {
		expect(isAlphabet('abcd')).toBe(true);
		expect(isAlphabet('12ade')).toBe(false);
	});

	it('should merge GraphQL types', () => {
		const type1 = `{ type Country{ name : String } }`;
		const type2 = '{ type Country{ name : String } }';
		expect(typeSchemaMerger(type1, type2)).toBe(type1.concat(type2));
	});

	it('should merge GraphQL services', () => {
		const service1 = () => { };
		const service2 = () => { };
		const servicesMerge = serviceMerge(service1, service2);
		expect(service1.name in servicesMerge).toBe(true);
		expect(service2.name in servicesMerge).toBe(true);
		expect(servicesMerge[service1.name]).toBe(service1);
		expect(servicesMerge[service2.name]).toBe(service2);
	});

	it('should return appropriate command to start chrome', () => {
		expect(getStartChromeCommand(platforms.LINUX)).not.toBe(null);
		expect(getStartChromeCommand(platforms.WINDOW)).not.toBe(null);
		expect(getStartChromeCommand(platforms.MAC)).not.toBe(null);
		expect(getStartChromeCommand(process.platform)).not.toBe(null);
	});

});
