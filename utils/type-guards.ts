export const isNullish = <T>(value: T | undefined | null): value is undefined | null => value == null;

export const isNonNullish = <T>(value: T): value is NonNullable<T> => value != null;

export const isTruthy = <T>(value: T | false | null | undefined): value is T => !!value;

export const hasKey = <Key extends string | number | symbol>(
	object: unknown,
	key: Key,
): object is Record<Key, unknown> => isRecord(object) && key in object;

export const isKeyOf = <InputObject extends Readonly<Record<string | number | symbol, unknown>>>(
	key: string | number | symbol,
	object: InputObject,
): key is keyof typeof object => key in object;

export const hasKeyWithStringValue = <Key extends string | number | symbol>(
	object: unknown,
	key: Key,
): object is Record<Key, string> => hasKey(object, key) && typeof object[key] === "string";

export const isRecord = (value: unknown): value is Record<string | number | symbol, unknown> => (
	value !== null
	&& (
		typeof value === "object"
		|| typeof value === "function"
	)
	&& !Array.isArray(value)
);

export const isArrayOfStrings = (object: unknown): object is string[] => Array.isArray(object) && object.every((item => typeof item === "string"));
