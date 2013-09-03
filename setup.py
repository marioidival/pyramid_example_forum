import os

from setuptools import setup, find_packages

here = os.path.abspath(os.path.dirname(__file__))
README = open(os.path.join(here, 'README.txt')).read()

requires = ['pyramid', 'WebError', 'pymongo']

setup(name='forum',
      version='0.0',
      description='forum',
      long_description=README,
      classifiers=[
        "Programming Language :: Python",
        "Framework :: Pylons",
        "Topic :: Internet :: WWW/HTTP",
        "Topic :: Internet :: WWW/HTTP :: WSGI :: Application",
        ],
      author="Mario Idival",
      author_email='marioidival@gmail.com',
      url='',
      keywords='web pyramid pylons mongodb',
      packages=find_packages(),
      include_package_data=True,
      zip_safe=False,
      install_requires=requires,
      tests_require=requires,
      test_suite="forum",
      entry_points = """\
      [paste.app_factory]
      main = forum:main
      """,
      paster_plugins=['pyramid'],
      )

