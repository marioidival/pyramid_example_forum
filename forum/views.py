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
    Return All Topics for Change
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

