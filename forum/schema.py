"""
schema.py

Content all Schemas of Entity of test

TOPICS
MESSAGES
RESPONSES
"""
from formencode import Schema, validators


class TopicSchema(Schema):
    name = validators.String(not_empty=True, max=100)

class MessageSchema(Schema):
    title = validators.String(not_empty=True, max=1)
    author = validators.String(not_empty=True)
    content = validators.String(not_empty=True)

class ResponseSchema(Schema):
    author = validators.String(not_empty=True)
    content = validators.String(not_empty=True)
