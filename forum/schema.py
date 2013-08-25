"""
schema.py

Content all Schemas of Entity of test

TOPICS
MESSAGES
RESPONSES
"""
from formencode import Schema, validators


class TopicSchema(Schema):
    '''
    Represent Topic Document - MongoDB
    '''
    name = validators.String(not_empty=True, max=100)

class MessageSchema(Schema):
    '''
    Represent Message Document - MongoDB
    '''
    title = validators.String(not_empty=True, max=100)
    author = validators.String(not_empty=True)
    content = validators.String(not_empty=True)

class ResponseSchema(Schema):
    '''
    Represent Response Docuent - MongoDB
    '''
    author = validators.String(not_empty=True)
    content = validators.String(not_empty=True)
