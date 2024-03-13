from dataclasses import dataclass
from typing import Literal

from bavisitter.utils import vjson


@dataclass
class MessageModel:
    role: Literal["system", "user", "assistant"]
    content: str


# test_vjson.dumps
def test_vjson_dumps():
    message = MessageModel("system", "hello")
    s = vjson.dumps(message)
    assert s == '{"role": "system", "content": "hello"}'

    # list of schemas
    messages = [message, message]
    s = vjson.dumps(messages)
    assert (
        s
        == '[{"role": "system", "content": "hello"}, {"role": "system", "content": "hello"}]'
    )

    # nested schema
    messages = {"message": message}
    s = vjson.dumps(messages)
    assert s == '{"message": {"role": "system", "content": "hello"}}'


# test_vjson.loads
def test_vjson_loads():
    message = MessageModel("system", "hello")
    s = '{"role": "system", "content": "hello"}'
    m = vjson.loads(s, schemas=[MessageModel])
    assert m == message
    assert isinstance(m, MessageModel)
    assert m.role == "system"
    assert m.content == "hello"

    s = '{"role": "system", "content": "hello", "extra": "extra"}'
    m = vjson.loads(s, schemas=[MessageModel])
    assert m == {"role": "system", "content": "hello", "extra": "extra"}
