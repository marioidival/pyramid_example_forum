class Root(object):
    __name__ = ''
    __parent__ = None
    def __init__(self, request):
        self.request = request
        self.db = request.db
