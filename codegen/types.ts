import {
  AliasedType,
  BitFlagsType,
  CustomStructType,
  CustomType,
  EnumType,
  ListType,
  LiteralType,
  MapType,
  MergeStructsType,
  NativeType,
  OptionalType,
  PackedType,
  SerializableType,
  StructType,
  TaggedUnionType,
  Type,
  TypeContext,
  Variable,
} from "./type.ts";

export const Byte = new NativeType("Byte", "number");
export const UnsignedByte = new NativeType("UnsignedByte", "number");
export const Short = new NativeType("Short", "number");
export const UnsignedShort = new NativeType("UnsignedShort", "number");
export const Int = new NativeType("Int", "number");
export const UnsignedInt = new NativeType("UnsignedInt", "number");
export const Long = new NativeType("Long", "bigint");
export const UnsignedLong = new NativeType("UnsignedLong", "bigint");
export const Float = new NativeType("Float", "number");
export const Double = new NativeType("Double", "number");
export const VarInt = new NativeType("VarInt", "number");
export const VarLong = new NativeType("VarLong", "bigint");
export const Boolean = new NativeType("Boolean", "boolean");
export const Uuid = new NativeType("Uuid", "string");
export const Nbt = new NativeType("CompoundTag", "CompoundTag | null");
export const Json = new NativeType("Json", "unknown");
export const Component = new AliasedType("Component", Json);

export const String = (
  maxLength?: number,
) => new NativeType("String", "string", args(maxLength));

export const Data = (
  length: Type | number,
) => new NativeType("", "Uint8Array", args(length));

export const ByteArray = (
  maxLength?: number,
) => new NativeType("ByteArray", "Uint8Array", args(maxLength));

export const IntArray = (
  maxLength?: number,
) => new NativeType("IntArray", "Int32Array", args(maxLength));

export const LongArray = (
  maxLength?: number,
) => new NativeType("LongArray", "BigInt64Array", args(maxLength));

export const Optional = (value: Type) => new OptionalType(value, Boolean);

export const List = (item: Type, length?: number | Type) => {
  return new ListType(
    item,
    length instanceof Type ? length : length != null ? new LiteralType(length) : VarInt,
  );
};

export const Struct = (fields: Record<string, Type>) => new StructType(fields);
export const Merge = (...structs: StructType[]) => new MergeStructsType(...structs);
export const Map = (key: Type, value: Type) => new MapType(key, value, VarInt);
export const Enum = (variants: string[], value?: Type) => new EnumType(value ?? VarInt, variants);

export const TaggedUnion = (
  tag: string,
  tagType: Type,
  variants: Record<string, StructType | null>,
  tagMapping?: Record<string, unknown>,
) => new TaggedUnionType(tag, tagType, variants, tagMapping);

export const Packed = (
  integer: Type,
  bits: number[],
  typeGetter: (...args: Type[]) => Record<string, Type>,
) => new PackedType(integer, bits, typeGetter);

export const BitFlags = (
  integer: Type,
  fieldMasks: Record<string, number>,
) => new BitFlagsType(integer, fieldMasks);

export const Custom = (
  definition: string | Type,
  readFn: (context: TypeContext) => string,
  writeFn: (context: TypeContext, value: string) => void,
) => new CustomType(definition, readFn, writeFn);

export const Serializable = (
  name: string,
  value: Type,
  deserializer: (value: string) => string,
  serializer: (value: string) => string,
) => new SerializableType(name, value, deserializer, serializer);

export const CustomStruct = (
  fieldDefinitions: Record<string, Type | string>,
  readFn: (context: TypeContext) => Record<string, Variable>,
  writeFn: (context: TypeContext, value: string) => void,
) => new CustomStructType(fieldDefinitions, readFn, writeFn);

export const Date = Serializable(
  "Date",
  Long,
  (ts) => `new Date(Number(${ts}))`,
  (date) => `BigInt(${date}.getTime())`,
);

export const REMAINING_BYTES = new CustomType(
  "number",
  (context) => `${context.reader}.unreadBytes`,
  () => {},
);

function args(...args: (string | number | Type | undefined)[]) {
  return args
    .filter(<T>(arg: T): arg is Exclude<T, undefined> => arg != null)
    .map((arg) => arg instanceof Type ? arg : new LiteralType(arg));
}
