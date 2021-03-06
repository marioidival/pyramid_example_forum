from pyramid.session import UnencryptedCookieSessionFactoryConfig
from pyramid.config import Configurator
from pyramid.events import subscriber
from pyramid.events import NewRequest
import pymongo


from forum.resources import Root

def main(global_config, **settings):
    """ This function returns a WSGI application.
    """

    my_session_factory = UnencryptedCookieSessionFactoryConfig('itsaseekreet')
    config = Configurator(settings=settings, root_factory=Root,
            session_factory=my_session_factory)
    config.include('pyramid_jinja2')
    config.add_renderer('.html', 'pyramid_jinja2.renderer_factory')
    config.add_view('forum.views.my_view',
                    context='forum:resources.Root',
                    renderer='forum:templates/index.html')
    config.add_static_view('static', 'forum:static')
    config.add_route('home', '/')
    config.add_route('add_topic', '/add_topic')
    config.add_route('message_topic', '/topic/{name}')
    config.add_route('add_message','/topic/{name}/messages')
    config.add_route('view_message', '/topic/{topic}/view/{msg}')
    config.add_route('response_message', '/response/{msg}/{tpc}')
    # MongoDB

    def add_mongo_db(event):
        settings = event.request.registry.settings
        url = settings['mongodb.url']
        db_name = settings['mongodb.db_name']
        db = settings['mongodb_conn'][db_name]
        event.request.db = db

    db_uri = settings['mongodb.url']
    MongoDB = pymongo.Connection
    if 'pyramid_debugtoolbar' in set(settings.values()):
        class MongoDB(pymongo.Connection):
            def __html__(self):
                return 'MongoDB: <b>{}></b>'.format(self)
    conn = MongoDB(db_uri)
    config.registry.settings['mongodb_conn'] = conn
    config.add_subscriber(add_mongo_db, NewRequest)
    config.scan('forum')
    return config.make_wsgi_app()
