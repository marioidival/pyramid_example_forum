def my_view(request):
    return {}

from schema import TopicSchema, MessageSchema, ResponseSchema

from pyramid.view import view_config
from pyramid.httpexceptions import HTTPNotFound, HTTPFound
from pyramid_simpleform import Form
from pyramid_simpleform.renderers import FormRenderer

@view_config(route_name='home', renderer='list.html')
def index_page(request):
    """
    Return All Topics for Chosen
    """
    topics = request.db['Topic'].find()
    return { 'topics' : topics }

@view_config(route_name='add_topic', renderer='topic/add_topic.html')
def add_topic(request):
    form = Form(request,
            schema=TopicSchema
            )
    if form.validate():
        topic = form.data['name']
        d = {'name' : topic }
        request.db['Topic'].insert(d)
        return HTTPFound(location='/')

    return {'form' : FormRenderer(form)}

@view_config(route_name='message_topic',
        renderer='messages/list_messages.html')
def index_messages(request, topic_id):
    """
    Return All Messages by Topic chosen
    """
    topic = topic_id.matchdict['name']
    messages = request.db['Message'].find({'topic': topic})
    return { 'messages' : messages, 'topic' : topic }

@view_config(route_name='add_message', renderer='messages/add_messages.html')
def add_message(topic_id, request):
    form = Form(request,
            schema=MessageSchema
            )
    topic = request.matchdict['name']

    if form.validate():
        title = form.data['title']
        author = form.data['author']
        content = form.data['content']
        topic_oid = topic
        d = {
            'title' : title,
            'author' : author,
            'content':content,
            'topic' : topic_oid
        }
        request.db['Message'].insert(d)
        return HTTPFound(location='/topic/'+topic)
    else:
        print 'bigou'

    return { 'form' : FormRenderer(form), 'topic' : topic }
