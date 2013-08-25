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
    """
    Add topics.
    Here, exists the variable form, with receive
    an schema TopicSchema, with have the fields
    necessary for schema of Topic Document
    """
    form = Form(request,
            schema=TopicSchema
            )
    if form.validate():
        topic = form.data['name']
        slug = make_slug(topic)
        d = {'name' : topic, 'slug' : slug }
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
def add_message(request):
    """
    Add message receive an topic
    """
    form = Form(request,
            schema=MessageSchema
            )
    topic = request.matchdict['name']

    if form.validate():
        title = form.data['title']
        author = form.data['author']
        content = form.data['content']
        topic_oid = topic
        slug = make_slug(title)
        d = {
            'title' : title,
            'author' : author,
            'content':content,
            'topic' : topic_oid,
            'slug' : slug
        }
        request.db['Message'].insert(d)
        return HTTPFound(location='/topic/'+topic)

    return { 'form' : FormRenderer(form), 'topic' : topic }

@view_config(route_name='view_message', renderer='messages/view_message.html')
def view_message(request, topic_msg):
    '''
    Method to display the message chosen by the User and also answers to this message
    '''
    topic = topic_msg.matchdict['topic']
    title = topic_msg.matchdict['msg']
    msg = request.db['Message'].find({'topic': topic, 'slug':title})
    response = request.db['Response'].find({'message': title})

    return {'msg':msg, 'topic':topic, 'title':title, 'response':response}

@view_config(route_name='response_message', renderer='messages/response.html')
def response_msg(request):
    '''
    Add response for message
    Receive an title of message for relationship
    '''
    form = Form(request,
            schema=ResponseSchema
            )
    title_msg = request.matchdict['msg']
    tpc = request.matchdict['tpc']
    if form.validate():
        content = form.data['content']
        author = form.data['author']
        d = {
            'content' : content,
            'author' : author,
            'message' : title_msg
        }
        request.db['Response'].insert(d)
        return HTTPFound(location='/topic/'+tpc+'/view/'+title_msg)

    return {'form' : FormRenderer(form), 'tpc' : tpc, 'title':title_msg }

def make_slug(field):
    '''
    Method for create slug
    '''
    return field.lower().replace(' ','-')
