from __future__ import annotations

from dataclasses import asdict, is_dataclass
from json import JSONDecoder, JSONEncoder
from typing import Type, TypeVar

T = TypeVar("T")


class VJSONEncoder(JSONEncoder):
    def default(self, o):
        if is_dataclass(o):
            return asdict(o)
        return super().default(o)


class VJSONDecoder(JSONDecoder):
    def __init__(self, schemas: list[Type[T]], *args, **kwargs):
        super().__init__(object_hook=self.object_hook, *args, **kwargs)
        for schema in schemas:
            if not is_dataclass(schema):
                raise TypeError(f"{schema} is not a dataclass")

        self.schemas = schemas

    def object_hook(self, o):
        # check if the object's is dictionary form one of the schemas
        for schema in self.schemas:
            if all(annotation in o for annotation in schema.__annotations__) and all(
                key in schema.__annotations__ for key in o
            ):
                return schema(**o)
        return o


def dumps(obj, *args, **kwargs):
    return VJSONEncoder(*args, **kwargs).encode(obj)


def loads(s, *args, **kwargs):
    return VJSONDecoder(*args, **kwargs).decode(s)
